import {Text, View} from 'react-native';
import useGetConversationById from '../../../../hooks/useGetConversationById';
import {useAccountContext} from '../../../../providers/AccountProvider';

export default function Inbox() {
  const {activeUserInformation: user} = useAccountContext();
  const {conversation} = useGetConversationById({
    id: user?.account?.fbID as string,
  });

  console.log(conversation);

  return (
    <View style={{flex: 1, backgroundColor: 'green'}}>
      <Text>Text</Text>
    </View>
  );
}
