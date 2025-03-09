import { Connexion } from '../types/connexion.types';

export class ConnexionService {
    private connexions: Connexion[] = [];

    addConnexion = (connexion: Connexion): void => {
        this.connexions.push(connexion);
    }

    removeConnexion = (id: string): void => {
        this.connexions = this.connexions.filter(conn => conn.id !== id);
    }

    getConnexion = (id: string): Connexion | undefined => {
        return this.connexions.find(conn => conn.id === id);
    }

    getConnexionBySocketId = (socketId: string): Connexion | undefined => {
        return this.connexions.find(conn => conn.socket.id === socketId);
    }

    getSecret = (id: string): string | undefined => {
        return this.getConnexion(id)?.secret;
    }
}