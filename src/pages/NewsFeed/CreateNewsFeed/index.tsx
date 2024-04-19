import { Alert, TextInput, View } from "react-native";
import TextLabel from "../../../components/TextLabel";
import { CardComponent } from "../../../components/Card";
import { DivContainer } from "../../../components/DivContainer/style";
import { COLOR_LISTS } from "../../../constants/colors";
import DividerComponent from "../../../components/Divider";
import { APP_WIDTH } from "../../../constants/dimensions";
import { ButtonComponent } from "../../../components/Buttons";
import DivComponent from "../../../components/DivContainer";
import { TouchableCardComponent } from "../../../components/TouchableCard";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import DocumentPicker from 'react-native-document-picker';
import { useState } from "react";
import { emptyFields } from "../../../constants/string";
import { createNewsFeed } from "../../../service/newsfeed/NewsFeed.service";
import { useAccountContext } from "../../../providers/AccountProvider";

export function CreateNewsFeed(props: any) {
    const {navigation} = props;
    const [imageTemp, setImageTemp] = useState<any>();
    const [feedThoughts, setFeedThoughts] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const {activeUserInformation} = useAccountContext();

    const onCancelNewsFeed = () => {
        navigation.navigate('NewsFeed')
    };

    const onOpenGallery = async () => {
        try{
            const image = await DocumentPicker.pick({type: DocumentPicker.types.images, allowMultiSelection: false});
            setImageTemp(image);
        }
        catch(error: any) {
            console.log(error);
        }
    };

    const onSaveFeedThoughts = () => {
        try{
            if (!feedThoughts) {
                setErrorMessage(emptyFields);
                setTimeout(() => {
                    setErrorMessage('');
                }, 1000);
                return;
            }

            createNewsFeed(feedThoughts, activeUserInformation?.account, imageTemp);
            setFeedThoughts('');
            // this saved the news feed.
        }
        catch(error: any) {
            Alert.alert('Error', error?.message);
        }
    };
    
    return <View>
        <DividerComponent margin="10px 0 0 0" />
        <DivContainer alignItems="center">
            <CardComponent backgroundColor={COLOR_LISTS.BLUE_800} padding={10} borderRadius={5}>
                <TextLabel title="Whats on your mind" fontSize={20} textColor={COLOR_LISTS.WHITE} />
            </CardComponent>
            <DividerComponent margin="5px 0 0 0" />
        <TextInput multiline style={{borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderRadius: 5, width: APP_WIDTH - 50, padding: 10, height: 200, textAlignVertical: 'top'}} inputMode="text" placeholder="...." value={feedThoughts} onChangeText={setFeedThoughts} />
        <DividerComponent margin="5px 0 0 0" />

        <TextLabel title={errorMessage} textColor={COLOR_LISTS.RED} />

        <TouchableCardComponent onPressFirstAidInformation={onOpenGallery}>
            <FontAwesome6 name="photo-film" size={30} />
        </TouchableCardComponent>

        </DivContainer>
        <DivComponent justifyContent="center" display="flex" flexDirection="row" padding="5">
            <ButtonComponent title="Save" backgroundColor={COLOR_LISTS.GREEN_400} borderRadius="5" textAlign="center" padding="4" fontSize={20} onPress={onSaveFeedThoughts} />
            <DivComponent width="1" />
            <ButtonComponent title="Back" backgroundColor={COLOR_LISTS.RED} borderRadius="5" textAlign="center" padding="4" fontSize={20} onPress={onCancelNewsFeed} />
        </DivComponent>
    </View>
}