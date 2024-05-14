import { FlatList, TouchableOpacity, View } from "react-native";
import TextLabel from "../../components/TextLabel";
import { EMERGENCY_EDUCATIONAL_RESOURCES } from "../../constants/string";
import { CardComponent } from "../../components/Card";
import { COLOR_LISTS } from "../../constants/colors";
import { APP_MARGIN } from "../../constants/number";
import { EmergencyEducationalResourcesSubsDTO } from "../../types/EmergencyEducationRes.type";

export default function EmergencyEducationalResources(props: any) {
    const {navigation} = props;

    function renderEmergencyEducationalResources({item}: any) {
        const onGoToGuide = (title: string, record: EmergencyEducationalResourcesSubsDTO[]) => {
            navigation.navigate("Emergency-Guide", {
                title,
                record: JSON.stringify(record),
            })
        };

        return <TouchableOpacity style={{backgroundColor: COLOR_LISTS.GREY_300, marginBottom: APP_MARGIN.FIVE}} onPress={() => onGoToGuide(item.title, item.content)}>
            <CardComponent width="100%" height="50px" padding={10} borderRadius={5}>
                <TextLabel title={item.title} fontSize={15} />
            </CardComponent>
        </TouchableOpacity>
    };

    return <View style={{padding: 10, backgroundColor: COLOR_LISTS.GREY_300, height: "100%"}}>
        <FlatList data={EMERGENCY_EDUCATIONAL_RESOURCES} renderItem={renderEmergencyEducationalResources} />
    </View>
}