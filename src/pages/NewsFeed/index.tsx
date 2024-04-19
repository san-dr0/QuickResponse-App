import {FlatList} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {CardComponent} from '../../components/Card';
import DivComponent from '../../components/DivContainer';
import ImageComponent from '../../components/ImageContainer';
import TextLabel from '../../components/TextLabel';
import {COLOR_LISTS} from '../../constants/colors';
import {APP_WIDTH} from '../../constants/dimensions';
import {useNewsFeed} from '../../hooks/useNewsFeed';
import {formatDateFromFirebase} from '../../utils/date.utils';
import * as S from './style';

export default function NewsFeedDashBoard(props: any) {
  const {navigation} = props;
  const {newsFeedData} = useNewsFeed();

  const onCreateNewsFeed = () => {
    navigation.navigate('CreateNewsFeed');
  };

  const renderNewsFeed = ({item}: any) => {
    return (
      <CardComponent
        width={`${APP_WIDTH}`}
        padding={10}
        backgroundColor={COLOR_LISTS.WHITE}
        margin="5px 0 0 0">
        <DivComponent alignItems="flex-end" width="125">
          <Menu>
            <MenuTrigger style={{width: 100}}>
              <S.DottedUI />
              <S.DottedUI />
              <S.DottedUI />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption text="View"></MenuOption>
              <MenuOption text="Update"></MenuOption>
              <MenuOption text="Report"></MenuOption>
            </MenuOptions>
          </Menu>
        </DivComponent>
        {item?.image !== 'N/A' && (
          <DivComponent alignItems="center">
            <ImageComponent
              imageSrc={item?.image}
              width={200}
              height={200}
              isRemoteFile
            />
          </DivComponent>
        )}
        <TextLabel title={item?.feed} />
        <TextLabel title={`${item?.lastname}, ${item?.firstname}`} />
        <TextLabel
          title={`Date: ${formatDateFromFirebase(
            item?.date?.nanoseconds,
            item?.date?.seconds,
          )}`}
        />
      </CardComponent>
    );
  };

  return (
    <S.NewsFeedParentContainer>
      <FlatList data={newsFeedData} renderItem={renderNewsFeed} />
      <S.NewsFeedActionButton
        buttonColor={COLOR_LISTS.RED}
        onPress={onCreateNewsFeed}></S.NewsFeedActionButton>
    </S.NewsFeedParentContainer>
  );
}
