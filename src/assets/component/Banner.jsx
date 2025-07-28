import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = import.meta.env.VITE_API;

  useEffect(() => {
    const url = `${api}/3/movie/popular?language=en-US&page=1`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${apiKey}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovie(json.results[4]))
      .catch((err) => console.error(err));
  }, []);

  if (!movie) return null;

  return (
    <div
      className="relative h-[400px] sm:h-[600px] text-white flex sm:items-center items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#000307] via-[#000307]/50 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#000307] via-transparent to-transparent z-10"></div>

      <div className="container mx-auto px-6 z-20">
        <div className="max-w-xl">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
            {movie.original_title}
          </h1>
          <p className="text-sm sm:text-md mb-6">{movie.overview}</p>
          <div className="sm:flex gap-4 mt-10 hidden">
            <Link
              to={`/movie/${movie.id}`}
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
            <Link
              to={`/movie/${movie.id}`}
              className="bg-black/40 text-white px-5 h-12 rounded-full font-medium hover:bg-black/60 transition flex items-center gap-x-2 backdrop-blur-sm"
            >
              Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
