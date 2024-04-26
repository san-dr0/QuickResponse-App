import {MARKER} from '../constants/image';
import {EmergencyType} from '../enums/EmergencyType.enum';

export function getMarkerIcon(type: EmergencyType) {
  let icons = null;
  switch (type) {
    case EmergencyType.FIRE:
      icons = MARKER.FIRE;
      break;
    case EmergencyType.CAR_ACCIDENT:
      icons = MARKER.ACCIDENT;
      break;
    case EmergencyType.EARTHQUAKE:
      icons = MARKER.EARTHQUAKE;
      break;
    case EmergencyType.FLOOD:
      icons = MARKER.FLOOD;
    case EmergencyType.MEDICAL:
      icons = MARKER.MEDICAL;
      break;
    case EmergencyType.TYPHOON:
      icons = MARKER.TYPHOON;
      break;
    default:
      icons = null;
      break;
  }
  return icons;
}
