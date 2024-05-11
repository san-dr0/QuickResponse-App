import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
} from "@videosdk.live/react-native-sdk";
import { createMeeting, token } from "../../service/video/Video.service";
import { MeetingView } from "./Meeting";
import { JoinScreen } from "./JoinScreen";
import TextLabel from "../../components/TextLabel";

const VideoApp = () => {
    const [meetingId, setMeetingId] = useState('');

  const getMeetingId = async (id?: string) => {
    try{
      const meetingId = id == null ? await createMeeting({ token }) : id;
      console.log(`meetingID --> `, meetingId);
      
      setMeetingId(meetingId);
    }
    catch(error: any) {
      console.log("ERROR -> getting meetingID ");
      console.log("Mess: ", error?.message);
    }
  };

  return meetingId ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6FF" }}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: false,
          webcamEnabled: true,
          name: "Test User",
        }}
        token={token}
      >
        <MeetingView />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <>
      <TextLabel title="empty" />
      <JoinScreen getMeetingId={getMeetingId} meetingVal={meetingId ?? ""} setMeetingID={setMeetingId} />
    </>
  );
};

export default VideoApp;
