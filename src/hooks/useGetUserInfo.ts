import { useCallback, useEffect, useState } from 'react';
import { getUserById } from '../service/registration/User.service';

type Props = {
    id: string;
}


export default function useGetUserInfo(props: Props) {
    const [data, setData] = useState<any>(null)
    const { id } = props;

    const sendRequest = useCallback(async () => {
        try {
            const resp = await getUserById(id);
            setData(resp)
        } catch (error) {
            console.log("GG")
        }
    }, []);

    useEffect(() => {
        sendRequest();
    }, [id]);

    return {
        data,
    }
}
