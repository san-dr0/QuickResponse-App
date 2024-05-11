import { MediaStream, RTCView, useMeeting, useParticipant } from "@videosdk.live/react-native-sdk";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ControlsContainer from "../Controls";
import { useState } from "react";

type JoinScreenProps = {
    meetingVal: string;
    setMeetingID: (param: string) => void;
    getMeetingId: (param?: string) => void;
};

export function ParticipantView({participantId}: any) {
  const { webcamStream, webcamOn } = useParticipant(participantId);
  console.log("WEB-CAM");
  console.log(webcamOn);
  console.log(webcamStream);
  
  return webcamOn && webcamStream ? (
    <RTCView
      streamURL={new MediaStream([webcamStream.track]).toURL()}
      objectFit={"cover"}
      style={{
        height: 300,
        marginVertical: 8,
        marginHorizontal: 8,
      }}
    />
  ) : (
    <View
      style={{
        backgroundColor: "grey",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 16 }}>NO MEDIA</Text>
    </View>
  );
}

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

export function JoinScreen(props: JoinScreenProps) {
    const [localState, setLocalState] = useState<string>("");

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#F6F6FF",
          justifyContent: "center",
          paddingHorizontal: 6 * 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.getMeetingId();
          }}
          style={{ backgroundColor: "#1178F8", padding: 12, borderRadius: 6 }}
        >
          <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
            Create Meeting
          </Text>
        </TouchableOpacity>
  
        <Text
          style={{
            alignSelf: "center",
            fontSize: 22,
            marginVertical: 16,
            fontStyle: "italic",
            color: "grey",
          }}
        >
          ---------- OR ----------
        </Text>
        <TextInput
          value={localState}
          onChangeText={setLocalState}
          placeholder={"XXXX-XXXX-XXXX"}
          style={{
            padding: 12,
            borderWidth: 1,
            borderRadius: 6,
            fontStyle: "italic",
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#1178F8",
            padding: 12,
            marginTop: 14,
            borderRadius: 6,
          }}
          onPress={() => {            
            props.getMeetingId(localState);
          }}
        >
          <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
            Join Meeting
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}

export function MeetingView() {
  const { join, leave, toggleWebcam, toggleMic, meetingId, participants  } = useMeeting({});
  const participantsArrId = [...participants.keys()];

  return (
    <View style={{ flex: 1 }}>
      {meetingId ? (
        <Text style={{ fontSize: 18, padding: 12 }}>
          Meeting Id :{meetingId}
        </Text>
      ) : null}
      {/* <ParticipantList participants={participantsArrId} /> */}
      {/* <ControlsContainer
        join={join}
        leave={leave}
        toggleWebcam={toggleWebcam}
        toggleMic={toggleMic}
      /> */}
    </View>
  );
}
