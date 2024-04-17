import messaging from '@react-native-firebase/messaging';

export function useOnReceiveFirebaseCloudMessaging () {
    const onReceive = () => {
        const message = messaging().onMessage(async remoteMessage => {
            console.log('REMOTE MESS::: >>> ');
            console.log(remoteMessage);
        });

        return message;
    }

    const onReceiveBackgroundMessage = () => {
        const backgroundMessage = messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('REMOTE >> backgroundMessage');
            console.log(remoteMessage);
        });

        return backgroundMessage;
    }

    return {onReceive, onReceiveBackgroundMessage};
};
