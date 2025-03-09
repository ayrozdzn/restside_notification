import { Request, Response, NextFunction } from 'express';
import { createHmac } from 'node:crypto';
import { ConnexionService } from '../services/connexion.service';

class ValidationMiddleware {

    private connexionService: ConnexionService;

    constructor(connexionService: ConnexionService) {
        this.connexionService = connexionService;
    }

    verifyWebhookSignature = (req: Request, res: Response, next: NextFunction) => {

        // Récupération du secret, de la data et de la signature reçue
        const secret: string = this.connexionService.getSecret(req.body.simulationId);
        const data: string = JSON.stringify(req.body);
        const receivedHmac: string = req.headers['x-webhook-signature'] as string;

        // Si la signature n'est pas présente, on renvoie une erreur 401
        if (!receivedHmac) {
            res.status(401).send('Signature invalide');
            return;
        }

        // Calcul de la signature
        const calculatedHmac = createHmac('sha256', secret)
            .update(data)
            .digest('base64');

        // Si la signature calculée est égale à la signature reçue, on passe au middleware suivant
        if (calculatedHmac === receivedHmac) {
            next();
        } else {
            res.status(401).send('Signature invalide');
        }
    }

}

export { ValidationMiddleware };