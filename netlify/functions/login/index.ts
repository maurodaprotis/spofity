import { Handler } from "@netlify/functions";
import SpotifyWebApi from "spotify-web-api-node";

const { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } = process.env;

/*
 * Helper for getting 400 errors reponses
 */
const badRequest = (message: string) => {
  return {
    statusCode: 400,
    body: JSON.stringify({
      error: message,
    }),
  };
};

const handler: Handler = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const { code } = parsedBody;

  if (!code) {
    return badRequest('"code" is required');
  }

  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  const data = await spotifyApi
    .authorizationCodeGrant(code)
    .catch((err) => console.error(err));

  if (!data) {
    return badRequest("Something went wrong");
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    }),
  };
};

export { handler };
