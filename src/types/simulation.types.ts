import { WebhookParameters } from "./webhook.types";
import { Socket } from "socket.io";
export interface Simulation {
    id: string;
    socket: Socket;
    secret: string;
    parameters: WebhookParameters;
    startDateTime: Date;
    lastPauseDateTime: Date;
    isPlaying: boolean; // true si la simulation est en cours, false si elle est en pause
    ordersQueue: Order[];
    orderTimeout: NodeJS.Timeout[];
}

export interface Order {
    id: string;
    type: number;
    realDateTime: Date;
    simulatedDateTime: Date;
    menuItems: {
        "MenuOne"?: number;
        "MenuTwo"?: number;
        "MenuThree"?: number;
        "MenuFour"?: number;
    };
    drinkItems: {
        "DrinkOne"?: number;
        "DrinkTwo"?: number;
        "DrinkThree"?: number;
        "DrinkFour"?: number;
    };
    dessertItems: {
        "DessertOne"?: number;
        "DessertTwo"?: number;
        "DessertThree"?: number;
        "DessertFour"?: number;
    };
    address: {
        city: string;
        postCode: string;
        street: string;
        number: number;
        coordinates: {
            longitude: number;
            latitude: number;
        };
    } | null;
    timestamp: Date;
}