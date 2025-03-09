import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { ValidationMiddleware } from '../middlewares/validation.middleware';

export const apiRoutes = (
    notificationController: NotificationController,
    validationMiddleware: ValidationMiddleware
): Router => {
    const router = Router();

    router.get('/', notificationController.getStatus);
    router.post(
        '/notifications',
        validationMiddleware.verifyWebhookSignature,
        notificationController.sendNotification
    );

    return router;
}