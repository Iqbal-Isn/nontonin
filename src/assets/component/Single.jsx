import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CastCard from "./CastCard";
import Slider from "./Slider";
import { PacmanLoader } from "react-spinners";

const Single = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = import.meta.env.VITE_API;
  const { id, type } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${api}/3/${type}/${id}?language=en-US`;
    const url2 = `${api}/3/${type}/${id}/credits`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${apiKey}`,
      },
    };

    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(url, options),
          fetch(url2, options),
        ]);
        const data1 = await res1.json();
        const data2 = await res2.json();

        console.log(data1);
        setMovie(data1);
        setCast(data2.cast);

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
          <PacmanLoader color="#ffffff" size={80} />
        </div>
      </>
    );

  return (
    <div>
      <div
        className="relative h-[800px] text-white flex items-center"
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
            <h1 className="text-4xl font-bold mb-6">
              {movie.original_title || movie.name}
            </h1>
            <p className="mb-6 text-md">{movie.overview}</p>
            <div className="flex gap-4 mt-10">
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
            </div>
          </div>
        </div>
      </div>
      <Slider
        contents={cast.map((cast, key) => (
          <Link key={key} to={`/cast/${cast.id}`} className="mr-11">
            <CastCard
              image={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
              alt={cast.name}
              name={cast.name}
            />
          </Link>
        ))}
        heading="Cast Member"
      />
    </div>
  );
};

export default Single;
