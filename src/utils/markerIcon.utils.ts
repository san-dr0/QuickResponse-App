import { MARKER } from '../constants/image';
import { EmergencyType } from '../enums/EmergencyType.enum';

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


export const emergencyIcon = (type: EmergencyType) => {
  let icons = null;
  switch (type) {
    case EmergencyType.FIRE:
      icons = require('../assets/icons/FireIcon.png');
      break;
    case EmergencyType.CAR_ACCIDENT:
      icons = require('../assets/icons/AccidentIcon.png');
      break;
    case EmergencyType.EARTHQUAKE:
      icons = require('../assets/icons/EarthquakeIcon.png');
      break;
    case EmergencyType.FLOOD:
      icons = require('../assets/icons/FloodIcon.png');
    case EmergencyType.MEDICAL:
      icons = require('../assets/icons/MedicalIcon.png');
      break;
    case EmergencyType.TYPHOON:
      icons = require('../assets/icons/TyphoonIcon.png');;
      break;
    default:
      icons = null;
      break;
  }
  return icons;
}