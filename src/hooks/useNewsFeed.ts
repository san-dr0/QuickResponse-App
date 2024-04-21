import firebase from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {NEWS_FEED_TABLE} from '../constants/dbRef';
import {NewsFeedDTO} from '../dto/NewsFeed.dto';
import {getCertainNewsFeed} from '../service/newsfeed/NewsFeed.service';

export const useNewsFeed = () => {
  const [newsFeedData, setNewsData] = useState<NewsFeedDTO[]>([]);

  const getNewsFeed = () => {
    let newsFeed = firebase()
      .collection(NEWS_FEED_TABLE)
      .orderBy('date', 'desc');

    newsFeed.onSnapshot(snapshot => {
      const records = snapshot.docs;
      const newsFeedList: NewsFeedDTO[] = [];

      records.map(record => {
        const feedID = record.id;
        const newsFeedRecord = record?.data() as NewsFeedDTO;
        if (newsFeedRecord?.isActive) {
          newsFeedRecord.feedID = feedID;
          newsFeedList.push(newsFeedRecord);
        }
      });
      setNewsData(newsFeedList);
    });
  };

  const sendGetCertainNewsFeed = async (feedID: string) => {
    return getCertainNewsFeed(feedID);
  };

  const sendThumbsUp = async (feedID: string, userID: string) => {
    const checkIfUserAlreadyLiked = await firebase()
      .collection(NEWS_FEED_TABLE)
      .doc(feedID)
      .get();
    const hasRecord = checkIfUserAlreadyLiked
      ?.data()
      ?.userLikeInteracted.filter((record: string) => record === userID);

    if (hasRecord.length === 0) {
      const result = await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({likes: firebase.FieldValue.increment(1)});
      await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({
          userLikeInteracted: firebase.FieldValue.arrayUnion(userID),
        });
      return result;
    } else {
      await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({
          userLikeInteracted: firebase.FieldValue.arrayRemove(userID),
        });
      const result = await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({likes: firebase.FieldValue.increment(-1)});
      return result;
    }
  };

  const sendDisLike = async (feedID: string, userID: string) => {
    const checkIfUserAlreadyLiked = await firebase()
      .collection(NEWS_FEED_TABLE)
      .doc(feedID)
      .get();
    const hasRecord = checkIfUserAlreadyLiked
      ?.data()
      ?.userDisLikeInteracted.filter((record: string) => record === userID);

    if (hasRecord.length === 0) {
      const result = await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({disLikes: firebase.FieldValue.increment(1)});
      await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({
          userDisLikeInteracted: firebase.FieldValue.arrayUnion(userID),
        });
      return result;
    } else {
      await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({
          userDisLikeInteracted: firebase.FieldValue.arrayRemove(userID),
        });
      const result = await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({disLikes: firebase.FieldValue.increment(-1)});
      return result;
    }
  };

  const sendReports = async (feedID: string, userID: string) => {
    const checkIfUserAlreadyLiked = await firebase()
      .collection(NEWS_FEED_TABLE)
      .doc(feedID)
      .get();
    const hasRecord = checkIfUserAlreadyLiked
      ?.data()
      ?.userReportInteracted.filter((record: string) => record === userID);

    if (hasRecord.length === 0) {
      const result = await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({reports: firebase.FieldValue.increment(1)});
      await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({
          userReportInteracted: firebase.FieldValue.arrayUnion(userID),
        });
      return result;
    } else {
      await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({
          userReportInteracted: firebase.FieldValue.arrayRemove(userID),
        });
      const result = await firebase()
        .collection(NEWS_FEED_TABLE)
        .doc(feedID)
        .update({reports: firebase.FieldValue.increment(-1)});
      return result;
    }
  };

  const sendRemoveNewsFeed = async (feedID: string) => {
    const result = await firebase()
      .collection(NEWS_FEED_TABLE)
      .doc(feedID)
      .update({
        isActive: false,
      });

    return result;
  };

  const searchFromNewsFeed = async (
    firstname?: string,
    lastname?: string,
    date?: string,
  ) => {
    console.log(firstname, lastname, date);

    const queryFirstname = await firebase()
      .collection(NEWS_FEED_TABLE)
      .where('firstname', '==', firstname)
      .get();

    const queryLastname = await firebase()
      .collection(NEWS_FEED_TABLE)
      .where('firstname', '==', lastname)
      .get();

    const queryDate = await firebase()
      .collection(NEWS_FEED_TABLE)
      .where('date', '==', date)
      .get();

    const joinQuery = await Promise.all([
      queryFirstname,
      queryLastname,
      queryDate,
    ]);

    const newsFeedRecord: NewsFeedDTO[] = [];

    joinQuery.map(records => {
      if (records?.docs.length > 0) {
        records?.docs?.map(record => {
          const data = record?.data() as NewsFeedDTO;
          if (
            newsFeedRecord.filter(record => record.userID === data?.userID)
              .length > 0
          ) {
            return;
          }
          newsFeedRecord.push(data);
        });
      }
    });

    return newsFeedRecord;
  };

  useEffect(() => {
    getNewsFeed();
  }, []);

  return {
    newsFeedData,
    setNewsData,
    sendGetCertainNewsFeed,
    sendThumbsUp,
    sendDisLike,
    sendReports,
    sendRemoveNewsFeed,
    searchFromNewsFeed,
  };
};
