import { Server } from 'socket.io';
import { ConnexionService } from '../services/connexion.service';
import axios from 'axios';
import { Connexion } from '../types/connexion.types';
import { Simulation } from '../types/simulation.types';
import { WebhookParameters } from '../types/webhook.types';
import { SimulationService } from '../services/simulation.service';
import { config } from '../config/config';

export class WebSocketServer {

    private io: Server;
    private connexionService: ConnexionService;
    private simulationService: SimulationService;
    
    constructor(
        io: Server,
        connexionService: ConnexionService,
        simulationService: SimulationService
    ) {
        this.io = io;
        this.connexionService = connexionService;
        this.simulationService = simulationService;
        this.initialize();
    }

    private initialize = (): void => {
        this.io.on('connection', (socket) => {
            socket.on('register', async (data: WebhookParameters) => {

                const response = await axios.post(`${config.webhook.host}:${config.webhook.port}/api/webhook/subscribe`, data);

                const connexion: Connexion = {
                    id: response.data.id,
                    secret: response.data.secret,
                    socket: socket,
                    timestamp: new Date()
                };

                const simulation: Simulation = {
                    id: response.data.id,
                    socket: socket,
                    secret: response.data.secret,
                    parameters: data,
                    startDateTime: new Date(),
                    lastPauseDateTime: null,
                    isPlaying: true,
                    ordersQueue: [],
                    orderTimeout: []
                };

                this.connexionService.addConnexion(connexion);
                this.simulationService.addSimulation(simulation);
                socket.emit('registerResponse', response.data);
            });

            socket.on('disconnect', async () => {
                const connexion = this.connexionService.getConnexionBySocketId(socket.id);

                if (connexion) {
                    const response = await axios.delete(`${config.webhook.host}:${config.webhook.port}/api/webhook/${connexion.id}`);
                }
            });

            socket.on('playPause', (data: { simulationId: string, isPlaying: boolean }) => {
                console.log('playPause', data);
                this.simulationService.toggleSimulation(data.simulationId, data.isPlaying);
            });
        });
    }
}