export type InboxDTO = {
    coordinate: {
        latitude: number,
        longitude: number,
    },
    date: string,
    emergencyStatus: string,
    responder: any,
    sender: {
        email: string,
        firstname: string,
        lastname: string,
        middlename: string,
        profile: string,
        userID: string,
    },
    type: string,
};
