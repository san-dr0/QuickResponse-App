import { useEffect, useState } from 'react';
import {
  addNewAllergies,
  addNewBloodType,
  addNewConditions,
  getAllAllergies,
  getAllConditions,
  getBloodType,
  setUserMedicalAidsInformation,
  getUserMedicalAidsInformation,
  addNewContacts,
  getAllContactsFromDB,
  editContactInformation,
  removeContactInformation,
} from '../service/profile/Profile.service';
import {
  AllergyDTO,
  BloodTypeDTO,
  ContactDTO,
  MedicalConditionDTO,
} from '../types/User.type';

export const useUserProfile = () => {
  const [activeUserContacts, setActiveUserContacts] = useState<ContactDTO[]>([]);
  const sendAddNewAllergies = async (
    activeUserID: string,
    allergy: AllergyDTO,
  ) => {
    const result = await addNewAllergies(activeUserID, allergy);

    return result;
  };

  const sendGetAllAllergies = async (activeUserID: string) => {
    const result = await getAllAllergies(activeUserID);

    return result;
  };

  const sendAddNewCondition = async (
    activeUserID: string,
    condition: MedicalConditionDTO,
  ) => {
    const result = await addNewConditions(activeUserID, condition);

    return result;
  };

  const sendGetAllConditions = async (activeUserID: string) => {
    const result = await getAllConditions(activeUserID);

    return result;
  };

  const sendAddNewBloodType = async (
    activeUserID: string,
    bloodType: BloodTypeDTO,
  ) => {
    const result = await addNewBloodType(activeUserID, bloodType);

    return result;
  };

  const sendGetBloodType = async (activeUserID: string) => {
    const result = await getBloodType(activeUserID);

    return result;
  };

  const setActiveUserMedicalAid = async (
    activeUserID: string,
    medicalAid: boolean,
  ) => {
    const result = await setUserMedicalAidsInformation(
      activeUserID,
      medicalAid,
    );

    return result;
  };

  const getActiveUserMedicalAidsInformation = async (activeUserID: string) => {
    const result = await getUserMedicalAidsInformation(activeUserID);

    return result;
  };

  const sendAddNewContacts = async (
    activeUserID: string,
    contactInfo: ContactDTO,
  ) => {
    const result = await addNewContacts(activeUserID, contactInfo);

    return result;
  };

  const sendGetAllContacts = async (activeUserID: string) => {
    const result = await getAllContactsFromDB(activeUserID);

    return result;
  };

  const sendEditContacts = async (
    activeUserID: string,
    editedContactInfoID: number,
    editedContactInfo: ContactDTO,
    originalContactInfo: ContactDTO[],
  ) => {
    const result = editContactInformation(
      activeUserID,
      editedContactInfoID,
      editedContactInfo,
      originalContactInfo,
    );

    return result;
  };

  const deleteContactInformation = async (
    activeUserID: string,
    recordInformation: ContactDTO,
    contactRecords: ContactDTO[],
  ) => {
    const newContactRecord = contactRecords.filter(
      record =>
        record.name !== recordInformation.name &&
        record.contactno !== recordInformation.contactno,
    );

    const result = await removeContactInformation(
      activeUserID,
      newContactRecord,
    );

    return newContactRecord;
  };

  return {
    sendAddNewAllergies,
    sendGetAllAllergies,
    sendAddNewCondition,
    sendGetAllConditions,
    sendAddNewBloodType,
    sendGetBloodType,
    setActiveUserMedicalAid,
    getUserMedicalAidsInformation,
    getActiveUserMedicalAidsInformation,
    sendAddNewContacts,
    sendGetAllContacts,
    sendEditContacts,
    deleteContactInformation,
  };
};
