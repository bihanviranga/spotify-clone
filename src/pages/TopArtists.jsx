import { ArtistCard, Error, Loader } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const {
    data: topChartsData,
    isFetching: isTopChartsFetching,
    error: topChartsFetchError,
  } = useGetTopChartsQuery();

  if (isTopChartsFetching) return <Loader title="Loading top charts" />;

  if (topChartsFetchError) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Artists
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topChartsData?.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
