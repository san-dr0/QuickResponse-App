import { generateDeviceToken, getDevicePhoneNumber } from "../service/token/DeviceInfo.service"

export const useUserToken = () => {
    const sendGenerateToken = async () => {
        const result = await generateDeviceToken();

        return result;
    }

    const sendGetDevicePhoneNumber = async () => {
        const result = await getDevicePhoneNumber();
        
        return result;
    }

    return {
        sendGenerateToken,
        sendGetDevicePhoneNumber
    }
}