import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
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
        Top Charts In 2022
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topChartsData?.map((song, index) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={topChartsData}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
