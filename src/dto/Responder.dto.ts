import {ResponderType} from '../enums/ResponderType.enum';
import {RegistrationDTO} from '../types/Registration.type';

export interface ResponsderDTO extends RegistrationDTO {
  responderId?: string;
  responderType: ResponderType;
}
