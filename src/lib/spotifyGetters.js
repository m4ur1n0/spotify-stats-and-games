"use client"

import axios from "axios";
import spotifyApi from "./spotify";
import querystring from 'querystring';

function handleError(error, message = "Error occurred during request") {
    console.error(message, error);
    return { status: 504, message, data: {} };
}

async function refreshAccessToken() {
    try {

        const refresh = spotifyApi.getRefreshToken();
        
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            querystring.stringify(
                {
                    grant_type : "refresh_token",
                    refresh_token : refresh,
                    client_id : process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
                    client_secret: process.env.SPOTIFY_CLIENT_SECRET
                }
            ),
            {
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded",
                },
            }
        );

        const {access_token, expires_in} = response.data;

        localStorage.setItem('spotify_access_token', access_token);

        const expirationTime = Date.now() + (expires_in * 1000);

        localStorage.setItem('spotify_token_expiration', expirationTime);

    } catch (err) {
        return handleError(err, "Error ocurred during token refresh");
    }
}

export async function getTopTracks(time_range, limit) { // data returned as a promise if successful

    try {

        if (!spotifyApi.getAccessToken()) {
            // console.log("no token");
            // return {status : 500, message : "Failed due to no client or no token", data : {}};
            throw new Error("ACCESS TOKEN NOT SET");
        }

        const resp = await spotifyApi.getMyTopTracks({time_range, limit});

        // console.log(resp.body.items);
        return {
            status : 200, 
            message : "Success", 
            data : resp.body.items
        };

    } catch (err) {
        try {
            await refreshAccessToken();
            return getTopTracks(time_range, limit);

        } catch (err) {
            return handleError(err, "Failed [error] getTopTracks()");
        }
    }

}