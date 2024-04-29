import React, {useEffect, useId, useMemo, useState} from 'react';
import {FlatList, ScrollView, ToastAndroid, TouchableOpacity, View} from 'react-native';
import TextLabel from '../../../../components/TextLabel';
import {COLOR_LISTS} from '../../../../constants/colors';
import {APP_HEIGHT, APP_WIDTH} from '../../../../constants/dimensions';
import {useUserProfile} from '../../../../hooks/profileUserHooks';
import {useAccountContext} from '../../../../providers/AccountProvider';
import {ContactDTO} from '../../../../types/User.type';
import {CardComponent} from '../../../../components/Card';
import DivComponent from '../../../../components/DivContainer';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import DividerComponent from '../../../../components/Divider';
import EditContacts from '../Edit';
import {APP_FONT_SIZE} from '../../../../constants/number';

export default function ViewContacts() {
  const {activeUserInformation} = useAccountContext();
  const {sendGetAllContacts , deleteContactInformation} = useUserProfile();
  const [contactRecord, setContactRecord] = useState<ContactDTO[]>([]);
  const [editCertainContact, setEditCertainContact] =
    useState<ContactDTO | null>(null);
  const [isEditAction, setIsEditAction] = useState<boolean>(false);
  const [editCertainContactID, setEditCertainContactID] = useState<number>(0);

  const onEditContact = (record: ContactDTO, index: number) => {
    setIsEditAction(true);
    setEditCertainContact(record);
    setEditCertainContactID(index);
  };

  const onCancelEdit = () => {
    setIsEditAction(false);
  };

  const onRemoveCertainContact = async (record: ContactDTO) => {
    const newRecord = await deleteContactInformation(
      activeUserInformation?.account?.fbID ?? '',
      record,
      contactRecord,
    );
    
    setContactRecord(newRecord);
    ToastAndroid.show('Contact was removed.', ToastAndroid.SHORT);
  };

  const renderContactList = ({item}: any) => {
    
    return (
      <>
        <CardComponent>
          <DivComponent
            flexDirection="row"
            justifyContent="space-evenly"
            width="100"
            backgroundColor={COLOR_LISTS.BLUE_500}
            padding='10'  
          >
            <DivComponent backgroundColor={COLOR_LISTS.BLUE_500} width="80">
              <TextLabel title={`Name: ${item.name}`} fontSize={18} textColor={COLOR_LISTS.WHITE} />
              <TextLabel
                title={`Contactno: ${item.contactno}`} textColor={COLOR_LISTS.WHITE}
                fontSize={18}
              />
            </DivComponent>
            <DivComponent
              backgroundColor={COLOR_LISTS.BLUE_500}
              width="22"
              flexDirection="row"
              justifyContent="center"
              alignItems="center">
              <TouchableOpacity onPress={() => onEditContact(item, 0)}>
                <FontAwesome6Icon
                  name={'pen'}
                  size={20}
                  color={COLOR_LISTS.WHITE}
                />
              </TouchableOpacity>
              <DividerComponent margin="0 10px 0 0" />
              <TouchableOpacity
                onPress={() => onRemoveCertainContact(item)}>
                <FontAwesome6Icon
                  name={'trash'}
                  size={20}
                  color={COLOR_LISTS.WHITE}
                />
              </TouchableOpacity>
            </DivComponent>
          </DivComponent>
        </CardComponent>
        <DividerComponent margin="5px 0 0 0" />
      </>
    );
  };

  const getAllContacts = async (userID: string) => {
    const resp = await sendGetAllContacts(userID);
    const data = resp?.data()?.contacts as ContactDTO[];
    setContactRecord(data);
  };

  useEffect(() => {
    getAllContacts(activeUserInformation?.account?.fbID as string);
  }, [activeUserInformation?.account?.fbID]);

  return (
      <View
        style={{
          backgroundColor: COLOR_LISTS.WHITE,
          width: APP_WIDTH,
          height: (APP_HEIGHT / 2) - 50,
          padding: 10,
        }}>
        <TextLabel
          title={!isEditAction ? 'List of all contacts' : 'Edit contacts'}
          fontSize={APP_FONT_SIZE.TWENTY_FIVE}
          textAlign="center"
        />
        {!isEditAction && <FlatList data={contactRecord} renderItem={renderContactList} />}
        {isEditAction && (
          <EditContacts
            contactRecords={editCertainContact}
            originalContactInfo={contactRecord}
            index={editCertainContactID}
            onCancelEdit={onCancelEdit}
          />
        )}
      </View>
  );
}
