import { Alert, FlatList, RefreshControl, View } from "react-native";
import TextLabel from "../../components/TextLabel";
import { useEffect, useState } from "react";
import { useAccountContext } from "../../providers/AccountProvider";
import { sendGetAllResponderThatRespondToMyEmergency } from "../../service/inbox/Inbox.service";
import { InboxDTO } from "../../types/Inbox.type";
import { CardComponent } from "../../components/Card";


export default function Inbox () {
    const {activeUserInformation} = useAccountContext();
    const [inboxList, setInboxList] = useState<InboxDTO[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);

    async function getAllRespondedEmergency(activeUserID: string) {
        try{
           const records = await sendGetAllResponderThatRespondToMyEmergency(activeUserID);
           const inboxTempRecords: InboxDTO[] = [];

           records.docs.map((record) => {
            const data = record.data() as InboxDTO;
            inboxTempRecords.push(data);
           });

           setInboxList(inboxTempRecords);
        }
        catch(error: any) {
            Alert.alert('Oops', error?.message);
        }
    };

    useEffect(() => {
        getAllRespondedEmergency(activeUserInformation?.account?.fbID as string);
    }, [refresh]);

    const renderItemList = (item: any) => {
        console.log(item);
        
        return <CardComponent margin="5px 0 0 0" padding={10} borderRadius={5}>
            <TextLabel title="tests" />
            <TextLabel title={item?.item?.type} />
        </CardComponent>
    };

    const onRefreshInbox = () => {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false);
        }, 1000);
    };

    return <View>
        <View style={{padding: 10}}>
            <FlatList data={inboxList} renderItem={renderItemList} refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={onRefreshInbox} />
            } />
        </View>
    </View>
};
