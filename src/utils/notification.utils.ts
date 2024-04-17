import { NotificationDto } from "../dto/Notification.dto";
import { EmergencyType } from "../enums/EmergencyType.enum";
import { getCurrentDate } from "./date.utils";

export const getNotificationByEmergency = (emergency: EmergencyType) => {
    let notif: NotificationDto | null = null;

    switch (emergency) {
        case EmergencyType.FIRE:
            notif = {
                title: 'Fire Emergency',
                body: 'There is fire emergency gg',
                date: getCurrentDate()
            }
            break;
        case EmergencyType.FLOOD:
            notif = {
                title: 'Flood Emergency',
                body: 'There is flood emergency gg',
                date: getCurrentDate()
            }
            break;
        case EmergencyType.CAR_ACCIDENT:
            notif = {
                title: 'Car Accident Emergency',
                body: 'There is car accident emergency gg',
                date: getCurrentDate()
            }
            break;
        case EmergencyType.EARTHQUAKE:
            notif = {
                title: 'Earthquake Emergency',
                body: 'There is earthquake emergency gg',
                date: getCurrentDate()
            }
            break;
        case EmergencyType.MEDICAL:
            notif = {
                title: 'Medical Emergency',
                body: 'There is medical emergency gg',
                date: getCurrentDate()
            }
            break;
        case EmergencyType.TYPHOON:
            notif = {
                title: 'Typhoon alert',
                body: 'There is typhoon alert gg',
                date: getCurrentDate()
            }
            break;
        default:
            notif = null
            break;
    }
    return notif;
}