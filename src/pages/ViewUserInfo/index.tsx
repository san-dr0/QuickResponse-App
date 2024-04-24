import {useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import DivComponent from '../../components/DivContainer';
import DividerComponent from '../../components/Divider';
import ImageComponent from '../../components/ImageContainer';
import TextInputComponent from '../../components/TextInput';
import TextLabel from '../../components/TextLabel';
import {COLOR_LISTS} from '../../constants/colors';
import TextInputEnum from '../../enums/TextInput.enum';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import * as S from './style';
const IMAGE = require('../../assets/QRApp-img1.jpeg');
export default function ViewUserInfo(props: any) {
  const {route, navigation} = props;

  const id = route.params.id;
  const {data} = useGetUserInfo({id});

  const displayImageComponent = useMemo(() => {
    return !data?.account?.profile ? (
      <ImageComponent
        imageSrc={IMAGE}
        isRemoteFile={false}
        width={80}
        height={80}
        borderRadius={100}
      />
    ) : (
      <ImageComponent
        imageSrc={data.account.profile}
        isRemoteFile={true}
        width={80}
        height={80}
        borderRadius={100}
      />
    );
  }, [data]);
  console.log('IID', id);
  console.log('DAT', data);
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View>
          <DividerComponent margin="10px 0 0 0" />
          <S.ProfileBadgeContainer
            backgroundColor={COLOR_LISTS.RED_400}
            width="50">
            <TextLabel
              title={`Profile Information`}
              textColor={COLOR_LISTS.WHITE}
              fontSize={15}
              textAlign="center"
            />
          </S.ProfileBadgeContainer>
          <DivComponent
            display="flex"
            justifyContent="center"
            flexDirection="row">
            {displayImageComponent}
          </DivComponent>
          <DividerComponent margin="10px 0 0 0" />
          <S.ProfileBadgeContainer borderColor={COLOR_LISTS.RED_500} width="90">
            <TextLabel title="Firstname" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={data?.account?.firstname}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Middlename" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={data?.account?.middlename}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Lastname" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={data?.account?.lastname}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Email" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={data?.email}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Cellphone Number" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={data?.account?.mobilenumber}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
          </S.ProfileBadgeContainer>
          <DividerComponent margin="10px 0 0 0" />
        </View>
      </View>
    </ScrollView>
  );
}
