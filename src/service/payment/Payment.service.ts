import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { PAYMENT_TABLE, USER_TABLE } from '../../constants/dbRef';
import { Alert } from 'react-native';
import { getCurrentDateWithTime } from '../../utils/date.utils';
import dayjs from 'dayjs';

export const uploadProofOfPayment = async (uploadDocuments: any, paymentID: string) => {
    // console.log('PAYMENT >>> ID ', paymentID);
    
    try{
        const fbRef = storage().ref(`images-${Date.now().toString()}/`);
        await fbRef.putFile(uploadDocuments[0].uri);
        // console.log('URIIIII >>> ', await fbRef.getDownloadURL(), " PAYMENT ID >>> ", paymentID);
        
        await firestore().collection(PAYMENT_TABLE)
            .doc(paymentID)
            .update({document: await fbRef.getDownloadURL()});
    }
    catch(error: any) {
        Alert.alert('Oops', error?.message);
    }
};

export const saveSubscriptionRecord = async (param: {userID: string, fullName: string, cashTendered: number}) => {
    const {userID, fullName, cashTendered} = param;

    const record = await firestore().collection(PAYMENT_TABLE).add({
        userID,
        fullName,
        cashTendered,
        document: "",
        dateCreated: getCurrentDateWithTime(),
    });
    
    return record.id;
};

export const updateUserSubscription = async (userID: string, subscriptionDetails: {endDate: string, startDate: string}) => {    
    const {endDate, startDate} = subscriptionDetails;

    const qrAppInfo = dayjs();
    const addedMonth = qrAppInfo.add(1, 'month').format('MMMM DD YYYY HH:mm:s');

    await firestore().collection(USER_TABLE).doc(JSON.parse(userID)).update({
        subscriptionDetails: {
            endDate: addedMonth,
            isSubscribed: true,
            startDate,
        }
    });
}; // this update USER-TABLE subscription details
