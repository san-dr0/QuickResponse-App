import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { USER_TABLE } from '../constants/dbRef';

export const uploadImage = async (fbTableRef: string, values: any, userID?: string, ) => {
    try{
        const fbRef = storage().ref(`images-${Date.now().toString()}/`);
        await fbRef.putFile(values[0].uri);
        
        await firestore().collection(fbTableRef)
            .doc(userID)
            .set({document: await fbRef.getDownloadURL()});
    }
    catch(error: any) {
        Alert.alert('Oops', error?.message);
    }
};

export const getProfileImage = async (fbID?: string) => {
    const result = await firestore().collection(USER_TABLE)
        .doc(fbID).get();
        
    const profile = result.data()?.account?.profile;
    
    return profile;
};
