import { COLOR_LISTS } from '../constants/colors';
import { EmergencyStatus } from '../enums/EmergencyStatus.enum';
import {EmergencyType} from '../enums/EmergencyType.enum';
import {AccountDTO} from '../types/User.type';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const formatPasswordDisplay = (password?: string) => {
  let firstFiveCharacters = password?.substring(0, 5);
  const otherEndCharacters = password?.substring(5, password?.length - 40);
  let characterLength = otherEndCharacters?.length ?? 0;

  while (characterLength > 0) {
    firstFiveCharacters += '*';
    characterLength--;
  }

  return firstFiveCharacters;
};

export const convertFirstCharacterOfWordToUpperCase = (param: string) => {
  const splittedWord: string[] = param.split(' ');
  const wordLen = splittedWord.length;
  let newWord: string = '';

  for (let i = 0; i < wordLen; i++) {
    const firstCharacter = splittedWord[i].substring(0, 1).toUpperCase();
    const secondToLastCharacter = splittedWord[i].substring(
      1,
      splittedWord[i].length,
    );

    newWord += firstCharacter + secondToLastCharacter + ' ';
  }

  return newWord;
};

export const formatActiveUserDisplayInformationToRenderOnMap = (
  param?: AccountDTO,
) => {
  return `${param?.lastname}, ${param?.firstname}`;
};

export const checkEmergencyType = (type: string) => {
  let emergencyType: EmergencyType = EmergencyType.FIRE;

  switch (type) {
    case EmergencyType.FIRE:
      emergencyType = EmergencyType.FIRE;
    case EmergencyType.TYPHOON:
      emergencyType = EmergencyType.TYPHOON;
    case 'FLOOD':
      emergencyType = EmergencyType.FLOOD;
    case 'CAR_ACCIDENT':
      emergencyType = EmergencyType.CAR_ACCIDENT;
    case 'EARTHQUAKE':
      emergencyType = EmergencyType.EARTHQUAKE;
    default:
      emergencyType = EmergencyType.FIRE;
  }

  return emergencyType;
};

export const changeNotificationActiveColor = (status?: string) => {
  return status === EmergencyStatus.ACTIVE ? COLOR_LISTS.GREEN_400 : COLOR_LISTS.GREY_400;
};

export const displayIconBasedOnEmergencyType = (emergencyType?: string) => {  
  switch(emergencyType) {
    case EmergencyType.FIRE:
      return <FontAwesome6 name='fire' size={30} color={COLOR_LISTS.AMBER_400} />
    case EmergencyType.MEDICAL:
      return <FontAwesome6 name='suitcase-medical' size={30} color={COLOR_LISTS.GREEN} />
    case EmergencyType.EARTHQUAKE:
      return <FontAwesome6 name='house-crack' size={30} color={COLOR_LISTS.BROWN_400} />
    case EmergencyType.TYPHOON:
      return <FontAwesome6 name='hurricane' size={30} color={COLOR_LISTS.GREY_300} />
    case EmergencyType.FLOOD:
      return <FontAwesome6 name='house-flood-water' size={30} color={COLOR_LISTS.BLUE_400} />
    case EmergencyType.CAR_ACCIDENT:
      return <FontAwesome6 name='car-burst' size={30} color={COLOR_LISTS.ORANGE_900} />
    default:
      return <FontAwesome6 name='circle-xmark' size={30} color={COLOR_LISTS.RED} />
  }

};
