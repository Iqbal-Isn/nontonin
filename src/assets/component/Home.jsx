import Banner from "./Banner";
import { useState, useEffect } from "react";
import CastCard from "./CastCard";
import { PacmanLoader } from "react-spinners";
import Slider from "./Slider";
import Card from "./Card";
import { Link } from "react-router-dom";
import Genres from "./Genres";

const Home = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = import.meta.env.VITE_API;
  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${api}/3/movie/popular?language=en-US`;
    const url2 = `${api}/3/tv/popular?language=en-US`;
    const url3 = `${api}/3/person/popular?language=en-US&`;

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

    fetchData();
  }, []);

  if (loading)
    return (
      <>
        <div className="h-screen flex justify-center items-center bg-black">
          <PacmanLoader color="#ffffff" size={80} />
        </div>
      </>
    );
  return (
    <>
      <Banner />
      <Genres />
      <div className="text-white px-4 sm:px-6">
        <Slider
          contents={movie.slice(0).map((item, index) => {
            const type = item.title || item.original_title ? "movie" : "tv";
            return (
              <div key={index} className="shrink-0 mb-8">
                <Link to={`/${type}/${item.id}`}>
                  <Card
                    title={item.original_title || item.name || item.title}
                    image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  />
                </Link>
              </div>
            );
          })}
          heading="Popular Movies"
        />

        <Slider
          contents={tv.slice(0).map((item, index) => {
            const type = item.title || item.original_title ? "movie" : "tv";
            return (
              <div key={index} className="shrink-0 mb-8">
                <Link to={`/${type}/${item.id}`}>
                  <Card
                    title={item.original_title || item.name || item.title}
                    image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  />
                </Link>
              </div>
            );
          })}
          heading="Popular TV Shows"
        />

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
                  image={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                  alt={cast.name}
                  name={cast.name}
                />
              </Link>
            ))}
          heading="Cast Member"
        />
      </div>
    </>
  );
};

export default Home;
