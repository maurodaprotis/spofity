import { Handler } from "@netlify/functions";
import SpotifyWebApi from "spotify-web-api-node";

const { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } = process.env;

const handler: Handler = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const { refreshToken } = parsedBody;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken,
  });

  const data = await spotifyApi
    .refreshAccessToken()
    .catch((err) => console.error(err));

  if (!data) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Something went wrong",
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in,
    }),
  };
};

export { handler };
