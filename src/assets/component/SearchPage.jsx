import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Card from "./Card";

const SearchPage = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = import.meta.env.VITE_API;
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const url = `${api}/3/movie/popular?language=en-US&page=1`;
      const url2 = `${api}/3/tv/popular?language=en-US&page=1`;
      const url3 = `${api}/3/person/popular?language=en-US&page=1`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${apiKey}`,
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => setMovie(json.results))
        .catch((err) => console.error(err));

      fetch(url2, options)
        .then((res) => res.json())
        .then((json) => setTv(json.results))
        .catch((err) => console.error(err));

      fetch(url3, options)
        .then((res) => res.json())
        .then((json) => setCast(json.results))
        .catch((err) => console.error(err));
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const filteredMovie = movie.filter((item) =>
    item.title?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTv = tv.filter((item) =>
    item.name?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCast = cast.filter((item) =>
    item.name?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-medium text-md mb-6 mt-20">
        Hasil pencarian untuk: <span className="italic">{query}</span>
      </h1>

      {filteredMovie.length === 0 &&
      filteredTv.length === 0 &&
      filteredCast.length === 0 ? (
        <p>Tidak ada data yang kamu cari </p>
      ) : (
        <>
          {filteredMovie.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-3">Movies</h2>
              <div className="flex gap-4 overflow-x-auto">
                {filteredMovie.map((item) => (
                  <Link to={`/movie/${item.id}`} key={item.id}>
                    <Card
                      image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      title={item.title}
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}
          {filteredTv.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-3">Series</h2>
              <div className="flex gap-4 overflow-x-auto">
                {filteredTv.map((item) => (
                  <Link to={`/tv/${item.id}`} key={item.id}>
                    <Card
                      key={item.id}
                      image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      title={item.name}
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}
          {filteredCast.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-3">Casts</h2>
              <div className="flex gap-4 overflow-x-auto">
                {filteredCast.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center w-36"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                      alt={item.name}
                      className="w-36 h-36 rounded-full object-cover"
                    />
                    <p className="mt-2 text-center">{item.name}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
