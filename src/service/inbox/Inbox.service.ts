import firestore from "@react-native-firebase/firestore";
import { EMERGENCY_TABLE } from "../../constants/dbRef";

export const sendGetAllResponderThatRespondToMyEmergency = async (activeUserID: string) => {
    const result = await firestore().collection(EMERGENCY_TABLE).where('sender.userID', '==', JSON.parse(activeUserID)).get();
    
    return result;
};
