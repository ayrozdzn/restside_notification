import { Socket } from "socket.io";
import { Order } from "./simulation.types";

export interface Connexion {
    id: string;
    secret: string;
    socket: Socket;
    timestamp: Date;
}

export interface NotificationPayload {
    simulationId: string;
    type: string;
    timestamp: Date;
}

export interface NotificationOrderPayload extends NotificationPayload {
    order: Order;
}