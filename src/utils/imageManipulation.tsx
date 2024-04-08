import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

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
}
