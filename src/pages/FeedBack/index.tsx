import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {Feed} from './Feed';
import {Rate} from './Rate';

const renderScene = SceneMap({
  feedback: Feed,
  rating: Rate,
});

export default function FeedBackAndRating() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'feedback', title: 'Feedback'},
    {key: 'rating', title: 'Rating'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
