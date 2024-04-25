import { Alert, FlatList, RefreshControl, View } from "react-native";
import TextLabel from "../../components/TextLabel";
import { useEffect, useState } from "react";
import { useAccountContext } from "../../providers/AccountProvider";
import { sendGetAllResponderThatRespondToMyEmergency } from "../../service/inbox/Inbox.service";
import { InboxDTO } from "../../types/Inbox.type";
import { CardComponent } from "../../components/Card";
import { COLOR_LISTS } from "../../constants/colors";
import DivComponent from "../../components/DivContainer";
import DividerComponent from "../../components/Divider";


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
        return <CardComponent key={item?.date} margin="5px 0 0 0" padding={10} borderRadius={5}>
            {
                item?.item?.responder.map((record: any) => {
                    return <View key={record?.id}>
                        <CardComponent backgroundColor={COLOR_LISTS.GREY_300} margin="5px 0 0 0" padding={10}>
                            <TextLabel title={`${record?.lastname}, ${record?.firstname}`} />
                            <TextLabel title={record?.email} />
                            <TextLabel title={record?.responderType} />
                        </CardComponent>
                    </View>
                })
            }
            <DividerComponent margin="5px 0 0 0" />
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
            {
                inboxList.length > 0 ? <FlatList data={inboxList} renderItem={renderItemList} refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={onRefreshInbox} />
                } />
                :
                <TextLabel title="No records right now." textAlign="center" fontSize={18} />
            }
        </View>
    </View>
};
