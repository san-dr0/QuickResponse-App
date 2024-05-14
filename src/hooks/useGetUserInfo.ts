import { useCallback, useEffect, useState } from 'react';
import { getUserAllergiesById, getUserBloodTypeById, getUserById, getUserConiditionsById, getUserMedicalAidById } from '../service/registration/User.service';

type Props = {
    id: string;
}


export default function useGetUserInfo(props: Props) {
    const [data, setData] = useState<any>(null);
    const [condition, setCondition] = useState<string[]>([]);
    const [bloodType, setBloodType] = useState<string>('');
    const [allergies, setAllergies] = useState<string[]>([]);
    const [medicalAid, setMedicalAid] = useState<boolean>(false);

    const { id } = props;

    const sendRequest = useCallback(async () => {
        try {
            const resp = await getUserById(id);
            setData(resp)
        } catch (error) {
            console.log("GG")
        }
    }, []);

    const sendConditionRequest = useCallback(async() => {
        try{
            const resp = await getUserConiditionsById(id);
            
            setCondition(resp as any);
        }
        catch(error: any) {
            console.log('sendConditionRequest');
            console.log(error?.message);
        }
    }, []);

    const sendAllergiesRequest = useCallback(async () => {
        try{
            const resp = await getUserAllergiesById(id);
            // console.log('ALL >>>');
            // console.log(resp);
            
            setAllergies(resp as any);
        }
        catch(error: any) {
            console.log('sendAllergiesRequest');
            console.log(error?.message);
        }
    }, []);

    const sendBloodTypeRequest = useCallback(async () => {
        const resp = await getUserBloodTypeById(id);
        setBloodType(resp as any);
    }, []);

    const sendMedicalAidRequest = useCallback(async () => {
        const resp = await getUserMedicalAidById(id);
        setMedicalAid(resp as any);
        // console.log('MED >>> ');
        // console.log(resp);
        
    }, []);

    useEffect(() => {
        sendRequest();
        sendConditionRequest();
        sendAllergiesRequest();
        sendBloodTypeRequest();
        sendMedicalAidRequest();
    }, [id]);

    return {
        data,
        condition,
        allergies,
        bloodType,
        medicalAid,
    }
}
