# restside_notification

Socket command:

## Register

Enregistre un nouveau webhook pour recevoir les notifications.

**Émission :** `register`
**Paramètres :** 
```typescript
{
    ordersCount: number[];
    simulatedStartDateTime: Date;
    simulatedDurationMinutes: number;
    realDurationSeconds: number;
    seed: string | null;
}
```
**Réponse :** `registerResponse`

## Disconnect

Déconnexion automatique du socket et suppression du webhook associé.

**Événement :** `disconnect`
**Paramètres :** Aucun

## PlayPause

Contrôle la lecture/pause d'une simulation.

**Émission :** `playPause`
**Paramètres :** 
```typescript
{
    simulationId: string,
    isPlaying: boolean
}
```

## Réponses du serveur

### RegisterResponse

**Événement :** `registerResponse`
**Données :** 
```typescript
{
    "id": string,
    "secret": string,
    "parameters":{
        "ordersCount": number[],
        "simulatedStartDateTime": string,
        "simulatedDurationMinutes": number,
        "realDurationSeconds": number,
        "seed": string | null
    }
}
```

### Notification
**Événement :** `notification`
**Données :** 
```typescript
{
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
```