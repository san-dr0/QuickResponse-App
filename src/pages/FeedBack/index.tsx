import { View, useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { useState } from "react";
import Feed from "./Feed";
import Rate from "./Rate";

const renderScene = SceneMap({
    feed: Feed,
    rate: Rate,
});

export default function FeedBack() {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState<number>(0);
    const [routes] = useState([
        {key: 'feed', title: 'Feed'},
        {key:' rate', title: 'Rate'}
    ]);

    return <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
         />
};
