import { ConnexionService } from './connexion.service';
import { NotificationOrderPayload, NotificationPayload } from '../types/connexion.types';
import { SimulationService } from './simulation.service';
import { Order } from '../types/simulation.types';

export class NotificationService {
    private connexionService: ConnexionService;
    private simulationService: SimulationService;

    constructor(connexionService: ConnexionService, simulationService: SimulationService) {
        this.connexionService = connexionService;
        this.simulationService = simulationService;
    }

    send = async (payload: NotificationPayload): Promise<boolean> => {
        const connexion = this.connexionService.getConnexion(payload.simulationId);
        
        if (!connexion) {
            throw new Error(`Connexion non trouvée pour l'ID: ${payload.simulationId}`);
        }
        const simulation = this.simulationService.getSimulation(payload.simulationId);

        if (!simulation) {
            throw new Error(`Simulation non trouvée pour l'ID: ${payload.simulationId}`);
        }

        if (payload.type === 'completed') return;
        
        const order = (payload as NotificationOrderPayload).order as Order;
        order.timestamp = payload.timestamp;
        this.simulationService.addOrderToSimulation(payload.simulationId, order);

        return true;
    }
}