import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type JoinScreenProps = {
    meetingVal: null;
    setMeetingVal: (param: null) => void;
    getMeetingId: (param?: string) => void;
};

export function JoinScreen(props: JoinScreenProps) {
    
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
          value={props.meetingVal}
          onChangeText={props.setMeetingVal}
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
            props.getMeetingId(props.meetingVal);
          }}
        >
          <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
            Join Meeting
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}