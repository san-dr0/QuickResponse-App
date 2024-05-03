import { FlatList, TouchableOpacity, View } from "react-native";
import TextLabel from "../../components/TextLabel";
import { useEffect, useState } from "react";
import { CardComponent } from "../../components/Card";
import DivComponent from "../../components/DivContainer";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { Badge } from "react-native-paper";
import { COLOR_LISTS } from "../../constants/colors";
import { getTheTotalOfAllResponderWhoRespondedToMyEmergency } from "../../service/emergency/Emergency.service";
import { useAccountContext } from "../../providers/AccountProvider";

type ServiceProps = {
    name: string;
    route: string
};

export default function QRAppServices(props: any) {
    const {navigation} = props;
    const {activeUserInformation} = useAccountContext();
    const serviceList: ServiceProps[] = [
        {name: 'Feedback and Rating', route: 'Feedback-And-Rating'},
        {name: 'Emergency Logs', route: 'Emergency-Logs'},
        {name: 'First Aid', route: 'First-Aid'}
    ];
    const [totalRespondedOfMyEmergency, setTotalRespondedOfMyEmergency] = useState<number>(0);

    async function getAllTotalOfAllRespondedToMyEmergency() {
        const total = await getTheTotalOfAllResponderWhoRespondedToMyEmergency(activeUserInformation?.account?.fbID as string);
        setTotalRespondedOfMyEmergency(total as number)
    };

    useEffect(() => {
        getAllTotalOfAllRespondedToMyEmergency();
    }, []);

    const renderQRAppService = ({item}: any) => {
        const {name, route} = item;
        
        const onSelectCertainService = (route: string) => {
            navigation.navigate(route)
        };

        return <TouchableOpacity onPress={() => onSelectCertainService(route)}>
            <CardComponent padding={10} margin="10px 0 0 0">
                <DivComponent flexDirection="row">
                    <TextLabel title={name} fontSize={18} />
                    <FontAwesome6Icon name="chevron-right" size={20} style={{position: 'absolute', right: 0}} />
                    {(route === "Emergency-Logs" && totalRespondedOfMyEmergency > 0)  && 
                        <Badge style={{position: 'absolute', right: 0, marginRight: 20, alignSelf: "center", backgroundColor: COLOR_LISTS.RED}}>{totalRespondedOfMyEmergency}
                        </Badge>
                    }
                </DivComponent>
            </CardComponent>
        </TouchableOpacity>
    };

    return <View>
        <View style={{padding: 10}}>
            <FlatList data={serviceList} renderItem={renderQRAppService} />
        </View>
    </View>
};
