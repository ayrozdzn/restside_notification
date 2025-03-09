import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';

export class NotificationController {

    private notificationService: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notificationService = notificationService;
    }

    sendNotification = async (req: Request, res: Response) => {
        try {
            const notification = await this.notificationService.send(req.body);
            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de l\'envoi de la notification' });
        }
    }

    getStatus = async (req: Request, res: Response) => {
        res.status(200).json({
            type: 'Notification',
            message: 'Service opérationnel',
            version: '1.0.0',
            timestamp: new Date().toISOString()
        });
    }
}