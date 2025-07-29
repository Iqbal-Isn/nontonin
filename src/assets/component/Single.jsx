import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CastCard from "./CastCard";
import Slider from "./Slider";
import { PacmanLoader } from "react-spinners";
import Card from "./Card";

const Single = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = import.meta.env.VITE_API;
  const { id, type } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [expanded, setExpanded] = useState(false);
  const maxLength = 180;
  const toggleExpand = () => setExpanded(!expanded);

  useEffect(() => {
    const url = `${api}/3/${type}/${id}?language=en-US`;
    const url2 = `${api}/3/${type}/${id}/credits`;
    const url3 = `${api}/3/${type}/${id}/videos?language=en-US
`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${apiKey}`,
      },
    };

    const fetchData = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          fetch(url, options),
          fetch(url2, options),
          fetch(url3, options),
        ]);
        const data1 = await res1.json();
        const data2 = await res2.json();
        const data3 = await res3.json();

        setTrailer(data3.results[0]);
        setMovie(data1);
        setCast(data2.cast);
        setGenre(data1.genres);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, type]);

  if (loading)
    return (
      <>
        <div className="h-screen flex justify-center items-center bg-black">
          <PacmanLoader color="#ffffff" size={40} />
        </div>
      </>
    );

  return (
    <div>
      <div
        className="relative h-auto text-white flex items-end pt-50 single-cont"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#000307] via-[#000307]/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#000307] via-transparent to-transparent z-10"></div>

        <div className="container mx-auto z-20 flex flex-col md:flex-row gap-10 pb-5">
          <div className="hidden sm:block">
            <Card image={movie.poster_path} />
          </div>
          <div className="max-w-xl px-4 sm:px-6">
            <h1 className="text-4xl font-bold mb-6">
              {movie.original_title || movie.name}
            </h1>
            <div className="relative container mx-auto mt-5 mb-5">
              <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
                {genre.map((item) => (
                  <Link
                    key={item.id}
                    className="px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-[#1c1c1e] text-gray-300 text-sm  hover:bg-[#2c2c2e] transition whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <p className="mt-2 text-md">
                <span className="text-gray-300">Release date:</span>{" "}
                {movie.release_date || movie.first_air_date}
              </p>
              <p className="mb-4 mt-4 text-md text-white">
                {expanded || movie.overview.length <= maxLength
                  ? movie.overview
                  : movie.overview.slice(0, maxLength) + "..."}
              </p>

              {movie.overview.length > maxLength && (
                <button
                  onClick={toggleExpand}
                  className="text-blue-400 hover:underline text-sm text-center"
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              )}
              <div className="flex gap-4 mt-5">
                <Link
                  to={`${movie.homepage}`}
                  className="bg-white text-black px-5 h-12 py-2 rounded-full font-medium hover:bg-gray-200 transition flex items-center gap-x-2"
                >
                  Watch Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6">
        <Slider
          contents={cast
            .filter((item) => item.profile_path)
            .map((cast, key) => (
              <Link
                key={key}
                to={`/cast/${cast.id}`}
                className="mr-3 sm:mr-6 text-center mb-8"
              >
                <CastCard
                  image={cast.profile_path}
                  alt={cast.name}
                  name={cast.name}
                />
              </Link>
            ))}
          heading="Cast Member"
        />
        {trailer && (
          <div className="relative container mx-auto mt-5 mx-auto pb-10">
            <h2 className="text-l sm:text-2xl font-normal text-white mb-4">
              Trailer
            </h2>
            <div className="w-[100%] h-[200px] sm:w-[50%] sm:h-[315px]">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Single;
