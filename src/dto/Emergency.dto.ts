import {EmergencyStatus} from '../enums/EmergencyStatus.enum';
import {EmergencyType} from '../enums/EmergencyType.enum';
import {Name} from '../enums/Name.type';
import {CoordinateDto} from './Coordinate.dto';

export interface EmergencyDto {
  emergencyId?: string;
  type: EmergencyType;
  sender: Name;
  responder: EmergencyResponder[];
  emergencyStatus: EmergencyStatus;
  coordinate: CoordinateDto;
  date: string;
  isActive: boolean;
}

export interface EmergencyResponder {
  id: string;
  responderType: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
}
