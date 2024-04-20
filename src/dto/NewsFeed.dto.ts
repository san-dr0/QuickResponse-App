export type NewsFeedDTO = {
    date: {
        nanoseconds: number,
        seconds: number
    },
    feedID: string;
    feed: string,
    firstname: string,
    lastname: string,
    image: string,
    userID: string,
    like: number,
    disLike: number,
    isActive: boolean;
};
