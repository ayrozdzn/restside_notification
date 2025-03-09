import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: parseInt(process.env.PORT || '5173'),
    host: process.env.HOST || '0.0.0.0',
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST']
    },
    webhook: {
        host: process.env.WEBHOOK_HOST || 'http://host.docker.internal',
        port: parseInt(process.env.WEBHOOK_PORT || '5353')
    },
    callbackUrl: process.env.CALLBACK_URL || 'http://host.docker.internal:5173/api/notifications',
};