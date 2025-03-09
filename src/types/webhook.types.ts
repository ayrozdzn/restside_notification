export interface WebhookParameters {
    ordersCount: number[];
    simulatedStartDateTime: Date;
    simulatedDurationMinutes: number;
    realDurationSeconds: number;
    seed: number | null;
}

export interface WebhookRegistration {
    callbackUrl: string;
    parameters: WebhookParameters;
}

export interface WebhookResponse {
    id: string;
    secret: string;
    parameters: WebhookParameters;
}