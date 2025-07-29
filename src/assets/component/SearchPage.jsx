import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Card from "./Card";
import Slider from "./Slider";
import CastCard from "./CastCard";
import { PacmanLoader } from "react-spinners";

const SearchPage = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = import.meta.env.VITE_API;
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${api}/3/search/movie?query=${query}&language=en-US`;
    const url2 = `${api}/3/search/tv?query=${query}&language=en-US`;
    const url3 = `${api}/3/search/person?query=${query}&language=en-US`;

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

        setMovie(data1.results);
        setTv(data2.results);
        setCast(data3.results);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  if (loading)
    return (
      <>
        <div className="h-screen flex justify-center items-center bg-black">
          <PacmanLoader color="#ffffff" size={40} />
        </div>
      </>
    );

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h2 className="text-xl sm:text-3xl font-medium text-md mb-10 mt-15 text-center">
        <span className="italic">{query}</span>
      </h2>

      {movie.length === 0 && tv.length === 0 && cast.length === 0 ? (
        <p>No data</p>
      ) : (
        <>
          {movie.length > 0 && (
            <Slider
              contents={movie
                .filter((item) => item.poster_path)
                .map((item, index) => {
                  const type =
                    item.title || item.original_title ? "movie" : "tv";
                  return (
                    <div key={index} className="shrink-0 mb-8">
                      <Link to={`/${type}/${item.id}`}>
                        <Card
                          title={item.original_title || item.name || item.title}
                          image={item.poster_path}
                        />
                      </Link>
                    </div>
                  );
                })}
              heading="Popular Movies"
            />
          )}
          {tv.length > 0 && (
            <Slider
              contents={tv
                .filter((item) => item.poster_path)
                .map((item, index) => {
                  const type =
                    item.title || item.original_title ? "movie" : "tv";
                  return (
                    <div key={index} className="shrink-0 mb-8">
                      <Link to={`/${type}/${item.id}`}>
                        <Card
                          title={item.original_title || item.name || item.title}
                          image={item.poster_path}
                        />
                      </Link>
                    </div>
                  );
                })}
              heading="Popular TV Shows"
            />
          )}
          {cast.length > 0 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
