import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Slider from "./Slider";
import Card from "./Card";
import { PacmanLoader } from "react-spinners";

const Archive = () => {
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = import.meta.env.VITE_API;
  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const genreName = location.state?.name;

  useEffect(() => {
    const url = `${api}/3/discover/movie?language=en-US&with_genres=${id}`;
    const url2 = `${api}/3/discover/tv?language=en-US&with_genres=${id}`;

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

        setMovie(data1.results);
        setTv(data2.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const genreId = Number(id);
  const genreInMovie = movie?.some((item) => item.genre_ids?.includes(genreId));
  const genreInTV = tv?.some((item) => item.genre_ids?.includes(genreId));

  if (loading)
    return (
      <>
        <div className="h-screen flex justify-center items-center bg-black">
          <PacmanLoader color="#ffffff" size={60} />
        </div>
      </>
    );

  return (
    <>
      <div className="relative container mx-auto mb-15 px-4">
        {!genreInMovie && !genreInTV ? (
          <h2 className="text-2xl font-normal text-md text-white mb-10 pt-25">
            Tidak ada data
          </h2>
        ) : (
          <h2 className="text-2xl sm:text-3xl font-normal text-md text-white mb-10 pt-25 text-center">
            <span className="italic">{genreName}</span>
          </h2>
        )}

        {genreInMovie && (
          <>
            <Slider
              contents={movie.map((item, index) => {
                const type = item.title || item.original_title ? "movie" : "tv";
                return (
                  <div key={index} className="shrink-0 mb-12">
                    <Link to={`/${type}/${item.id}`}>
                      <Card
                        title={item.original_title || item.name || item.title}
                        image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      />
                    </Link>
                  </div>
                );
              })}
              heading="Movies"
            />
          </>
        )}

        {genreInTV && (
          <>
            <Slider
              contents={tv.map((item, index) => {
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
              heading="Series"
            />
          </>
        )}
      </div>
    </>
  );
};

export default Archive;
