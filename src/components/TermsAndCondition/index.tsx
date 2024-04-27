import { View } from "react-native";
import TextLabel from "../TextLabel";
import { TEMRS_AND_CONDITION } from "../../constants/string";
import { COLOR_LISTS } from "../../constants/colors";
import { APP_HEIGHT } from "../../constants/dimensions";
import Button from "../Button";

type TermsAndConditionProps = {
    onAcceptButton: () => void;
    onCloseButton: () => void;
};

export const TermsAndCondition = (props: TermsAndConditionProps) => {
    const {onAcceptButton, onCloseButton} = props;

    return <View style={{backgroundColor: COLOR_LISTS.WHITE, height: APP_HEIGHT - 150, borderRadius: 10, padding: 10}}>
        <TextLabel title={TEMRS_AND_CONDITION} fontSize={18} />
        <View style={{flexDirection: "row",gap:8}}>
            <View style={{flex:1}}>
                <Button title="Accept" type="OUTLINE" onPress={onAcceptButton} />
            </View>
            <View style={{flex:1}}>
                <Button title="Cancel" type="OUTLINE" onPress={onCloseButton}  />
            </View>
        </View>
    </View>
};
