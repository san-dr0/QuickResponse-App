import { Text, View } from "react-native";
import ControlsContainer from "../Controls";
import { useMeeting } from "@videosdk.live/react-native-sdk";

function ParticipantList() {
    return null;
  }
  export function MeetingView() {
    const { join, leave, toggleWebcam, toggleMic, meetingId } = useMeeting({});
  
    return (
      <View style={{ flex: 1 }}>
        {meetingId ? (
          <Text style={{ fontSize: 18, padding: 12 }}>
            Meeting Id :{meetingId}
          </Text>
        ) : null}
        <ParticipantList />
        <ControlsContainer
          join={join}
          leave={leave}
          toggleWebcam={toggleWebcam}
          toggleMic={toggleMic}
        />
      </View>
    );
  }