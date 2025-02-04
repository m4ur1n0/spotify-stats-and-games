"use client";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import spotifyApi from "@/lib/spotify";
import { getTopTracksMonth } from "@/lib/spotifyGetters";
import { getNextInternalQuery } from "next/dist/server/request-meta";
import { handleAuthRedirect } from "../handle_auth_redirect";
import TrackList from "@/components/TrackList";

export default function Profile({  }) {
    // called on the querystring appended to the url when /api/auth/callback redirects to profile
    // /api/auth/callback attaches a querystring with user data, this func knows to grab it and populate the user fields
    const searchParams = useSearchParams();
    const [userData, setUserData] = useState(null);

    // works (with warnings)
    // const userData = searchParams.user ? JSON.parse(decodeURIComponent(searchParams.user)) : null;

    useEffect(() => {
        handleAuthRedirect();

        const accessToken = localStorage.getItem('spotify_access_token');
        const refreshToken = localStorage.getItem('spotify_refresh_token');
        
        if (accessToken) {
            spotifyApi.setAccessToken(accessToken);
        }
        // fuck it separate if statements
        if (refreshToken) {
            spotifyApi.setRefreshToken(refreshToken);
        }

        const searchParamUserData = searchParams.get('user') ? JSON.parse(decodeURIComponent(searchParams.get('user'))) : null;
        setUserData(searchParamUserData);

    }, [searchParams]);

    

    // if we receive a nothing user or if this is called before data loads
    if (!userData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen">
                <h1>Loading...</h1>
            </div>    
        )
    }


    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-32  text-white">

            <h1 className="tex-3xl font-bold mb-4 ">Welcome, {userData.display_name}</h1>
            <p className="text-lg ">Email : {userData.email}</p>
            <img src={userData.images[0]?.url} alt="Profile" className="w-24 h-24 rounded-full mt-4"/>

            <h1 className="font-bold text-2xl my-10">Tracks</h1>

            {/* <div className="flex flex-col justify-begin items-center w-[80%] max-h-[40vh] overflow-scroll border border-white "> */}
                <TrackList time_period="long_term" limit={10} />
            {/* </div> */}
        </div>
    )
}


// export async function getServerSideProps({ query }) {
//     const user = query.user ? JSON.parse(decodeURIComponent(query.user)) : null; // if we have a real user decode the querystring, else return null
//     return (
//         {
//             props : { user }
//         }
//     )
// }