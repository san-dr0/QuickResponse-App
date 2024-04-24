import React, { useEffect, useState } from 'react';
import { Alert, View } from "react-native";
import { CardComponent } from '../../components/Card';
import TextLabel from '../../components/TextLabel';
import { getAllEmergency } from '../../service/emergency/Emergency.service';
import { EmergencyDto } from '../../dto/Emergency.dto';
import { useAccountContext } from '../../providers/AccountProvider';

export default function Emergency() {
    const [emergencyList, setEmergencyList] = useState<EmergencyDto[]>([]);
    const {activeUserInformation} = useAccountContext();

    const getEmergency = async () => {
        try{
            const emergencyResult = await getAllEmergency(activeUserInformation?.credentials?.loginEmail as string);
            const emergencies: EmergencyDto[] = [];

            emergencyResult.map((result) => {
                const data = result.data() as EmergencyDto;
                emergencies.push(data);
            });
            console.log(emergencies);
            
        }
        catch(error: any) {
            console.log(error?.message);
            Alert.alert('Something went wrong', error?.message);
        }
    };

    useEffect(() => {
        getEmergency();
    }, []);

    return <View style={{padding: 10}}>
        <CardComponent padding={10} borderRadius={5}>
            <TextLabel title="All of your created emergency logs." fontSize={15} textAlign="center" />
        </CardComponent>
    </View>
};
