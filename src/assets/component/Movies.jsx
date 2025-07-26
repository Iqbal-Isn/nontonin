// import React, { useState, useEffect } from "react";
// import CardList from "./Card";
// import { Link } from "react-router-dom";

// const Movies = () => {
//   const [movie, setMovie] = useState([]);
//   useEffect(() => {
//     const url =
//       "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGNmYmMwM2I3NDJjMGU2ZGJjMzRkMGVkNDQ1YjFhZSIsIm5iZiI6MTc1MjU2MDAxNy42MzY5OTk4LCJzdWIiOiI2ODc1ZjE5MWQyYmFkYWMyNThkMTYxMDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.C1Jc3DVN_PHjHZfCPnczlQpOvfw-xcLRAaeaoIAHYpw",
//       },
//     };

//     fetch(url, options)
//       .then((res) => res.json())
//       .then((json) => setMovie(json.results))
//       .catch((err) => console.error(err));
//   }, []);

//   if (!movie) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto mt-5">
//       <div className="flex justify-center space-x-4 overflow-x-auto">
//         {movie.slice(0, 6).map((index, key) => (
//           <div key={key}>
//             <Link to={`movie/${index.id}`}>
//               <CardList
//                 title={index.original_title}
//                 image={`https://image.tmdb.org/t/p/w500/${index.poster_path}
// `}
//               />
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Movies;
