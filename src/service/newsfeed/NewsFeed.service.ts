import firstore from "@react-native-firebase/firestore"
import { NEWS_FEED_TABLE } from "../../constants/dbRef"
import storage from "@react-native-firebase/storage"
import { AccountDTO } from "../../types/User.type"

export const createNewsFeed = async (thoughts: string, newsFeedMaker?: AccountDTO, imagePayload?: any) => {
    const {firstname, lastname, fbID} = newsFeedMaker as AccountDTO;

    if (imagePayload) {
        const imageResp = storage().ref(`images-${Date.now().toString()}/`)
        await imageResp.putFile(await imagePayload[0]?.uri);
    
        await firstore().collection(NEWS_FEED_TABLE).add({
            feed: thoughts,
            userID: fbID,
            firstname,
            lastname,
            image: await imageResp.getDownloadURL(),
            date: new Date(),
        });
    } else {
        await firstore().collection(NEWS_FEED_TABLE).add({
            feed: thoughts,
            userID: fbID,
            firstname,
            lastname,
            image: 'N/A',
            date: new Date(),
        });
    }

}
