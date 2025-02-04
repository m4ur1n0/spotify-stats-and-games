import React from 'react'

const TrackInfoCard = ({trackData}) => {

    // track data is one index of a list returned by a call to get tracks from the spotify app...

    let imageAddr;
    try {
        imageAddr = trackData.album.images[1].url;
    } catch (err) {
        try {
            imageAddr = trackData.album.images[0].url;
        } catch (e) {
            imageAddr = '/images/blankAlbum.png'
        }
    }

  return (
    <div className='track-data-card shadow-md flex flex-row justify-start w-[400px] max-h-[80px] rounded-md p-2 bg-off_white transition-transform duration-500 ease-out hover:scale-[1.03] overflow-ellipsis overflow-hidden  hover:shadow-lg cursor-pointer' onClick={() => {if (trackData.external_urls.spotify !== undefined) {window.open(trackData.external_urls.spotify, '_blank')}}}>
        {/** album cover */}
        <img className='track-data-card-album-image object-scale-down max-w-[50px] select-none' src={imageAddr} />

        <div className='song-details flex flex-col gap-1 ml-4'>
            {/* song title */}
            <p className='font-bold text-xl text-nowrap whitespace-nowrap  select-none'>{trackData.name}</p>
            <p className='text-base text-gray-500 select-none text-nowrap whitespace-nowrap'>{trackData.artists[0].name}</p>

        </div>

      
    </div>
  )
}

export default TrackInfoCard
