import React from 'react';
import {CardComponent} from '../../../components/Card';
import DividerComponent from '../../../components/Divider';
import {FlatList, TouchableOpacity, View} from 'react-native';
import TextLabel from '../../../components/TextLabel';
import DivComponent from '../../../components/DivContainer';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

type FeedBackAndRatingListDTO = {
  id: number;
  title: string;
  route: string;
};

function ResponderServices(props: any) {
  const {navigation} = props;

  const responderFeedBackAndRatingList: FeedBackAndRatingListDTO[] = [
    {
      id: 1001,
      title: 'Emergency History',
      route: 'Responder-Emergency-Logs',
    },
    {
      id: 1002,
      title: 'FeedBack and Rating',
      route: 'Feedback-And-Rating',
    },
  ];

  const onNavigateToOtherService = (route: string) => {
    navigation.navigate(route);
  };

  const renderFeedBackAndRATING = ({item}: any) => {
    const {title, route} = item;

    return (
      <>
        <TouchableOpacity onPress={() => onNavigateToOtherService(route)}>
          <CardComponent padding={10} margin="10px 0 0 0">
            <DivComponent flexDirection="row">
              <TextLabel title={title} fontSize={16} />
              <FontAwesome6Icon
                name="chevron-right"
                size={20}
                style={{position: 'absolute', right: 0}}
              />
            </DivComponent>
          </CardComponent>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={{padding: 10}}>
      <FlatList
        data={responderFeedBackAndRatingList}
        renderItem={renderFeedBackAndRATING}
      />
    </View>
  );
}

export default ResponderServices;
