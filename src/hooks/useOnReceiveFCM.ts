import messaging from '@react-native-firebase/messaging';

export function useOnReceiveFirebaseCloudMessaging () {
    const onReceive = () => {
        const message = messaging().onMessage(async remoteMessage => {
            console.log('REMOTE MESS::: >>> ');
            console.log(remoteMessage);
        });

        return message;
    }

    return {onReceive};
}