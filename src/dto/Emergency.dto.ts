import { EmergencyStatus } from '../enums/EmergencyStatus.enum';
import { EmergencyType } from '../enums/EmergencyType.enum';
import { Name } from '../enums/Name.type';
import { CoordinateDto } from './Coordinate.dto';
import { ResponsderDTO } from './Responder.dto';

export interface EmergencyDto {
  emergencyId?: string;
  type: EmergencyType;
  sender: Name;
  responder: ResponsderDTO[];
  emergencyStatus: EmergencyStatus;
  coordinate: CoordinateDto;
  date: string;
}
