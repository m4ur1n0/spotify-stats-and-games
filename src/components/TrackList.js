
import React, { useState, useEffect } from 'react'
import TrackInfoCard from './TrackInfoCard';
import { getTopTracks } from '@/lib/spotifyGetters';

const TrackList = ({time_period="medium_term", limit=10}) => {
    // this function assumes a functional spotifyApi

    const [topTracksData, setTopTracksData] = useState([]);

    useEffect(() => {

        const getTracks = async () => {
            try {
                const resp = await getTopTracks(time_period, limit);
                // console.log(JSON.stringify(getTopTracksMonth));
                if (resp.status !== 200) {
                    console.log("Failed to get top tracks.");
                    setTopTracksData([]);
                } else {
                    console.log("Tracks received!", resp);
                    setTopTracksData(resp.data);
                    // console.log(JSON.stringify(resp.data));
                }
            } catch (err) {
                console.error("ERROR fetching top tracks : ", err);
                setTopTracksData([]);
            }
        }

        getTracks();
 
    }, [time_period, limit])
    


  return (
    <div className='flex flex-col gap-2 items-center'>

        {
            topTracksData.map((track, idx) => {
                return (
                    <TrackInfoCard key={idx} trackData={track} />
                )
            })
        }
      
    </div>
  )
}

export default TrackList
