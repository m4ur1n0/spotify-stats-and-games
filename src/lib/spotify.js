import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    'user-read-email',
    'user-read-private',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-top-read',

].join(" ");

// const params = {
//     scope : scopes
// };

const params = new URLSearchParams({
    client_id : process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    response_type : "code",
    redirect_uri : process.env.NEXT_PUBLIC_REDIRECT_URI,
    scope : scopes,
    show_dialog: true
}).toString();

// const queryParamString = new URLSearchParams(params).toString();

// create the login url with custom query parameters listing the scope we wish to use
// const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`; 

const LOGIN_URL = `https://accounts.spotify.com/authorize?${params}`;

// api  w  credentials
const spotifyApi =  new SpotifyWebApi(
    { 
        clientId : process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        clientSecret : process.env.SPOTIFY_CLIENT_SECRET,
    }
);

export default spotifyApi;
export { LOGIN_URL };