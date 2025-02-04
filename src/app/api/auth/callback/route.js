import { NextResponse } from "next/server";
import axios from "axios";
import querystring from 'querystring';
// import {spotifyApi} from '../../../../lib/spotify';
import spotifyApi from "@/lib/spotify";

export async function GET(request) {


    const {searchParams} = new URL(request.url);
    const code = searchParams.get('code');

    console.log('Query params : ', {code});

    if (!code) {
        return NextResponse.json({error : "No authorization code returned"}, {status : 400});
    }

    // assuming we got an authorization code, we need to use it to get an access token
    try {

        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            querystring.stringify(
                {
                    grant_type : 'authorization_code',
                    code,
                    redirect_uri : process.env.NEXT_PUBLIC_REDIRECT_URI,
                    client_id : process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
                    client_secret : process.env.SPOTIFY_CLIENT_SECRET
                }
            ),
            {
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                }
            }
        );

        // console.log("RESPONSE CODE : " , response.code);

        // now we have posted the request

        const {access_token, refresh_token} = response.data;

        // our spotify api token can now be used to get this user's data -- this route is run server-side -- can't set here
        // spotifyApi.setAccessToken(access_token);
        // spotifyApi.setRefreshToken(refresh_token);

        // console.log(`ACCESS TOKEN : ${spotifyApi.getAccessToken()}`);


        // user info
        // const user = await spotifyApi.getMe();

        // actually we wanna get user info with the NEW user
        const userResp = await axios.get('https://api.spotify.com/v1/me', {
            headers : {
                Authorization : `Bearer ${access_token}`
            }
        });
        const user = userResp.data;

        // go to user page with their info ? might not need later
        // have to adjust this -- need to send the tokens back to the frontend
        // return NextResponse.redirect(
        //     new URL(`/profile?user=${encodeURIComponent(JSON.stringify(user.body))}`, request.url)
        // );

        return NextResponse.json(
            {
                access_token,
                refresh_token,
                user
            }
        );

    } catch (err) {
        console.log(`an error ocurred during auth : `, err);
        return NextResponse.json({error : "Error occurred during auth"}, {status : 500});
    }
}