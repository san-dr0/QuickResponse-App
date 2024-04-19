import { Name } from "../enums/Name.type";

export type ActiveAlertsEmergencyDTO = {
    coordinate: {
        latitude: number;
        longitude: number;
    },
    date: string;
    emergencyStatus: string;
    notification: {
        body: string;
        date: string;
        title: string;
    },
    responder?: unknown;
    sender: Name;
    type: string;
};
