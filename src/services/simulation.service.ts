import { Order, Simulation } from '../types/simulation.types';

export class SimulationService {
    private simulations: Simulation[] = [];

    addSimulation = (simulation: Simulation): void => {
        simulation.lastPauseDateTime = simulation.startDateTime;
        this.simulations.push(simulation);
    }

    removeSimulation = (id: string): void => {
        this.simulations = this.simulations.filter(simulation => simulation.id !== id);
    }

    getSimulation = (id: string): Simulation | undefined => {
        return this.simulations.find(simulation => simulation.id === id);
    }

    addOrderToSimulation = (id: string, order: Order): void => {
        const simulation = this.getSimulation(id);
        if (simulation) {
            if (simulation.isPlaying === false) {
                simulation.ordersQueue.push(order);
            } else {
                simulation.ordersQueue.push(order);

                const delay = new Date(order.timestamp).getTime() - new Date(simulation.lastPauseDateTime).getTime();

                const timeout = setTimeout(() => {
                    simulation.socket.emit('notification', order);
                    simulation.ordersQueue.splice(simulation.ordersQueue.indexOf(order), 1);
                }, delay);
                simulation.orderTimeout.push(timeout);
            }
        }
    }

    toggleSimulation = (id: string, isPlaying?: boolean): void => {
        const simulation = this.getSimulation(id);
        if (simulation) {
            simulation.isPlaying = isPlaying ?? !simulation.isPlaying;

            if (simulation.isPlaying === false) {
                // On récupère la date et l'heure de mise en pause
                simulation.lastPauseDateTime = new Date();
                // On arrête tous les timeouts
                simulation.orderTimeout.forEach((timeout) => {
                    clearTimeout(timeout);
                    simulation.ordersQueue.splice(simulation.orderTimeout.indexOf(timeout), 1);
                });
            } else {
                // On exécute toutes les commandes
                simulation.ordersQueue.forEach((order) => {

                    const delay = new Date(order.timestamp).getTime() - new Date(simulation.lastPauseDateTime).getTime();

                    const timeout = setTimeout(() => {
                        simulation.socket.emit('notification', order);
                        simulation.ordersQueue.splice(simulation.ordersQueue.indexOf(order), 1);
                    }, delay);
                    simulation.orderTimeout.push(timeout);
                });
            }
        }
    }

    getSecret = (id: string): string | undefined => {
        const simulation = this.getSimulation(id);

        if (simulation) {
            return simulation.secret;
        }

        return undefined;
    }
}