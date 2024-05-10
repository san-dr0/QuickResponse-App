export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlMWMyZjA4Zi0xNzI2LTQ5NDAtYmE4OC1mYzgzYWQ3OGY3Y2EiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNTMzMzU2MSwiZXhwIjoxNzE1OTM4MzYxfQ.RSCBQnV6T2UGH8Cl50p87ygfb1AURLhPdGAz8Sb9vKs";
// API call to create meeting
export const createMeeting = async ({ token }: any) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};
