import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { config } from './config/config';
import { ConnexionService } from './services/connexion.service';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './controllers/notification.controller';
import { ValidationMiddleware } from './middlewares/validation.middleware';
import { WebSocketServer } from './websocket/socket';
import { apiRoutes } from './routes/api.routes';
import { SimulationService } from './services/simulation.service';

console.log(config);

// Création des instances
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: config.cors
});

// Services
const connexionService = new ConnexionService();
const simulationService = new SimulationService();
const notificationService = new NotificationService(connexionService, simulationService);

// Middleware
const validationMiddleware = new ValidationMiddleware(connexionService);

// Controllers
const notificationController = new NotificationController(notificationService);

// WebSocket
const wsServer = new WebSocketServer(io, connexionService, simulationService);

// Middleware Express
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes(notificationController, validationMiddleware));

// Démarrage du serveur
server.listen(config.port, config.host, () => {
    console.log(`Serveur démarré sur http://${config.host}:${config.port}`);
});