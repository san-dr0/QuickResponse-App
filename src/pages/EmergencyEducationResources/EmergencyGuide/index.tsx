import { FlatList, View } from "react-native";
import TextLabel from "../../../components/TextLabel";
import { CardComponent } from "../../../components/Card";
import { COLOR_LISTS } from "../../../constants/colors";

export default function EmergencyGuide(props: any) {
    const {route} = props;
    const {title, record} = route.params;
    const recordList = JSON.parse(record);
    
    function renderGuide({item}: any) {
        return <View style={{marginBottom: 10}}>
            <CardComponent padding={5}>
                <TextLabel title={item.subTitle} fontWeight="bold" fontSize={17} />
                <TextLabel title={item.subContent} fontSize={15} />
            </CardComponent>
        </View>
    }
    
    return <View style={{height: "100%", backgroundColor: COLOR_LISTS.GREY_300, padding: 10}}>
        <CardComponent margin="0 0 10px 0" padding={5} borderRadius={5} backgroundColor={COLOR_LISTS.GREEN}>
            <TextLabel title={title} textAlign="center" fontSize={20} fontWeight="bold" textColor={COLOR_LISTS.WHITE} />
        </CardComponent>
        <FlatList data={recordList} renderItem={renderGuide} />
    </View>
};
