import firebase from '@react-native-firebase/firestore';
import {useEffect, useId, useState} from 'react';
import {FEEDACK_TABLE, NEWS_FEED_TABLE} from '../constants/dbRef';
import {FeedBackDTO, NewsFeedDTO} from '../dto/NewsFeed.dto';
import {createFeedBack, createRating, getAllRatingFeedBack, getCertainNewsFeed} from '../service/newsfeed/NewsFeed.service';
import { RatingDTO } from '../types/FeedAndRating.type';

export const useNewsFeed = () => {
  const [newsFeedData, setNewsData] = useState<NewsFeedDTO[]>([]);
  const [requestMessage, setRequestMessage] = useState<string>('No records to show.');

  const getNewsFeed = () => {
    setRequestMessage('Please wait...');

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
      
      if (newsFeedList.length === 0) {
        setRequestMessage('No records to show...');
      }
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
    setRequestMessage('Please wait...');

    const queryFirstname = await firebase()
      .collection(NEWS_FEED_TABLE)
      .orderBy('date', 'desc')
      .where('firstname', '>=', firstname)
      .where('firstname', '<=', firstname)
      .get();

    const queryLastname = await firebase()
      .collection(NEWS_FEED_TABLE)
      .orderBy('date', 'desc')
      .where('lastname', '>=', lastname)
      .where('lastname', '<=', lastname)
      .get();

    const queryDate = await firebase()
      .collection(NEWS_FEED_TABLE)
      .orderBy('date', 'desc')
      .where('date', '>=', date)
      .where('date', '<=', date)
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
          newsFeedRecord.push(data);
        });
      }
    });

    if (newsFeedRecord.length === 0) {
      setRequestMessage('No records found...');
    }

    return newsFeedRecord;
  };

  // CREATE FEEDBACK and RATING MODULE
  const sendCreateFeedBack = async (userID: string, userFullName: string, comment: string) => {    
    return createFeedBack(userID, userFullName, comment);
  };

  const sendGetAllCreatedFeedBack = async () => {
    const feedBacks = await firebase().collection(FEEDACK_TABLE).orderBy('date', 'asc').get();
    
    const feedBackList: FeedBackDTO[] = [];
    
    feedBacks.docs.map((feedback) => {
      const data = feedback.data() as FeedBackDTO;
      feedBackList.push(data);
    });

    return feedBackList;
  };

  const sendRatingFeedBack = async (ratingCount: number, userID: string, fullName: string) => {
    const result = await createRating(ratingCount, userID, fullName);

    return result;
  };

  const sendGetAllRatingFeedBack = async () => {
    const records = await getAllRatingFeedBack();

    const ratingRecords: RatingDTO[] = [];

    records.docs.map((record) => {      
      const data = record?.data() as RatingDTO;
      ratingRecords.push(data);
    });
    
    return ratingRecords;
  };

  useEffect(() => {
    getNewsFeed();
  }, []);

  return {
    newsFeedData,
    setNewsData,
    requestMessage,
    setRequestMessage,
    getNewsFeed,
    sendGetCertainNewsFeed,
    sendThumbsUp,
    sendDisLike,
    sendReports,
    sendRemoveNewsFeed,
    searchFromNewsFeed,
    
    // CREATE FEEDBACK and RATING MODULE
    sendCreateFeedBack,
    sendGetAllCreatedFeedBack,
    sendRatingFeedBack,
    sendGetAllRatingFeedBack
  };
};
