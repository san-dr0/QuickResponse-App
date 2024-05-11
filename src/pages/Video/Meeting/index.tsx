import { FlatList, Text, View } from "react-native";
import ControlsContainer from "../Controls";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { ParticipantView } from "../JoinScreen";

function ParticipantList({ participants }: any) {
  return participants.length > 0 ? (
    <FlatList
      data={participants}
      renderItem={({ item }) => {
        return <ParticipantView participantId={item} />;
      }}
    />
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F6F6FF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20 }}>Press Join button to enter meeting.</Text>
    </View>
  );
  }
  export function MeetingView() {
    const { join, leave, toggleWebcam, toggleMic, meetingId, participants } = useMeeting({});
    const participantsArrId = [...participants.keys()];

    return (
      <View style={{ flex: 1 }}>
        {meetingId ? (
          <Text style={{ fontSize: 18, padding: 12 }}>
            Meeting Id :{meetingId}
          </Text>
        ) : null}
        <ParticipantList participants={participantsArrId} />
        <ControlsContainer
          join={join}
          leave={leave}
          toggleWebcam={toggleWebcam}
          toggleMic={toggleMic}
        />
      </View>
    );
  }