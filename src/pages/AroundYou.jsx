import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [country, setCountry] = useState('US');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songsByCountryData,
    isFetching: isSongsByCountryFetching,
    error: songsByCountryError,
  } = useGetSongsByCountryQuery({ countryCode: country });
  const geoipifyApiKey = import.meta.env.VITE_GEO_API_KEY;

  useEffect(() => {
    axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${geoipifyApiKey}`)
      .then((res) => setCountry(res?.data?.location?.country))
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isSongsByCountryFetching && loading) return <Loader title="Loading songs around you" />;

  if (songsByCountryError) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around all of You <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songsByCountryData?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songsByCountryData}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
