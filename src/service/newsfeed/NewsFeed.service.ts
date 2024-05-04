import firstore from "@react-native-firebase/firestore"
import { EMERGENCY_TABLE, FEEDACK_TABLE, NEWS_FEED_TABLE, RATING_TABLE } from "../../constants/dbRef"
import storage from "@react-native-firebase/storage"
import { AccountDTO } from "../../types/User.type"
import { getCurrentDateWithTime } from "../../utils/date.utils"

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
            date: getCurrentDateWithTime(),
            isActive: true,
            likes: 0,
            disLikes: 0,
            reports: 0,
            userLikeInteracted: [],
            userDisLikeInteracted: [],
            userReportInteracted: [],
        });
    } else {
        await firstore().collection(NEWS_FEED_TABLE).add({
            feed: thoughts,
            userID: fbID,
            firstname,
            lastname,
            image: 'N/A',
            date: getCurrentDateWithTime(),
            isActive: true,
            likes: 0,
            disLikes: 0,
            reports: 0,
            userLikeInteracted: [],
            userDisLikeInteracted: [],
            userReportInteracted: [],
        });
    }
}

export const updateNewsFeed = async (feedID: string, feedThoughts: string) => {
    const record = await firstore().collection(NEWS_FEED_TABLE).doc(feedID).update({feed: feedThoughts});

    return record;
}

export const getCertainNewsFeed = async (feedID: string) => {
    const record = await firstore().collection(NEWS_FEED_TABLE).doc(feedID).get();

    return record;
}

// CREATE FEEDBACK and RATING MODULE
export const createFeedBack = async (userID: string, userFullName: string, comment: string) => {
    const result = await firstore().collection(FEEDACK_TABLE).add({
        userID,
        fullName: userFullName,
        comment,
        date: getCurrentDateWithTime(),
    });

    result;
};

export const createRating = async (ratingCount: number, ratingMakerUserID: string, ratingMakerFullName: string, responderRatedID: string, responderRatedFullName: string) => {
    const hasRecord = await firstore().collection(RATING_TABLE).where('ratingMakerUserID', '==', ratingMakerUserID).get();    

    if (hasRecord.docs.length > 0) {
        return false;
    }
    
    await firstore().collection(RATING_TABLE).add({
        ratingCount,
        ratingMakerUserID,
        ratingMakerFullName,
        responderRatedFullName,
        responderRatedID,
        date: getCurrentDateWithTime()
    });

    return true;
};

export const getAllRatingFeedBack = async () => {
    const result = await firstore().collection(RATING_TABLE).get();

    return result;
};

export const getAllRespondedToMyEmergency = async (userID: string) => {
    const result = await firstore().collection(EMERGENCY_TABLE).where("sender.userID", "==", userID).get();

    return result;
};

export const getCertainRatingCount = async (ratingMakerUserID: string) => {
    const result = await firstore().collection(RATING_TABLE).where("responderRatedID", "==", ratingMakerUserID).get();

    return result.docs;
};
