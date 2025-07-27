import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Genres() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = import.meta.env.VITE_API;
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const url2 = "https://api.themoviedb.org/3/genre/tv/list?language=en";

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

        const movieData = await res1.json();
        const tvData = await res2.json();

        const combinedGenres = [
          ...movieData.genres,
          ...tvData.genres.filter(
            (tvGenre) =>
              !movieData.genres.some(
                (movieGenre) => movieGenre.id === tvGenre.id
              )
          ),
        ];

        setGenre(combinedGenres);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <div className="relative container mx-auto mt-5 mb-10 pl-4 sm:pl-2">
      <div className="flex flex-nowrap sm:flex-wrap gap-2 overflow-x-auto scrollbar-hide">
        {genre.map((genre) => (
          <Link
            key={genre.id}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-[#1c1c1e] text-gray-300 text-md hover:bg-[#2c2c2e] transition whitespace-nowrap"
            to={`genre/${genre.id}`}
            state={{ name: genre.name }}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Genres;
