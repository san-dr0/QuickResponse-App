export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlMWMyZjA4Zi0xNzI2LTQ5NDAtYmE4OC1mYzgzYWQ3OGY3Y2EiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNTM5MDY3MCwiZXhwIjoxNzE1OTk1NDcwfQ.4UYEzKtPnZ6Apa53pODujAYVu8LDsNgDDOa0IxROnFk";
// API call to create meeting
export const createMeeting = async ({ token }: any) => {  
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // "customRoomId" : "aaa-bbb-ccc",
      // "webhook" : "see example",
      // "autoCloseConfig" : "see example",
      // "autoStartConfig" : "see example",
      // "multiComposition" : "multiCompositionObj"
    }),
  });

  const { roomId } = await res.json();
  console.log("ROMM-ID: ", roomId);
    
  return roomId;
};
