import firebase from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { NEWS_FEED_TABLE } from "../constants/dbRef";
import { NewsFeedDTO } from "../dto/NewsFeed.dto";

export const useNewsFeed = () => {
    const [newsFeedData, setNewsData] = useState<NewsFeedDTO[]>([]);

    const getNewsFeed = () => {
        const newsFeed = firebase().collection(NEWS_FEED_TABLE);
        newsFeed.onSnapshot((snapshot) => {
            const records = snapshot.docs;
            const newsFeedList: NewsFeedDTO[] = [];

            records.map(record => {
                newsFeedList.push(record?.data() as NewsFeedDTO);
            });
            setNewsData(newsFeedList);
            console.log(' >>> ', newsFeedList);
        });
    }

    useEffect(() => {
        getNewsFeed();
    }, []);

    return {newsFeedData};
}
