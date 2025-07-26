import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import Slider from "./Slider";
import Card from "./Card";

const SingleCast = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = import.meta.env.VITE_API;
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${api}/3/person/${id}?language=en-US`;
    const url2 = `${api}/3/person/${id}/combined_credits?language=en-US`;
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

        setCast(data1);
        setCredits(data2.cast);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const movie = credits.filter((item) => item.media_type === "movie");
  const tv = credits.filter((item) => item.media_type === "tv");

  if (loading)
    return (
      <>
        <div className="h-screen flex justify-center items-center bg-black">
          <PacmanLoader color="#ffffff" size={80} />
        </div>
      </>
    );

  return (
    <div className="text-white min-h-screen px-6 py-10">
      <div className=" relative flex container mx-auto mt-15 mb-15">
        {/* Foto */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
            alt={cast.name}
            className="rounded-full w-60 h-60 object-cover"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{cast.name}</h1>
          <p className="text-gray-400 mb-6 mt-5">
            <span className="text-sm mb-10">{cast.name_native}</span>{" "}
            &nbsp;|&nbsp;
            <span className="text-sm">
              Also Known As: {cast.also_known_as?.[0]}
            </span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-md">
            <div>
              <strong>Gender:</strong>{" "}
              {cast.gender === 1
                ? "Female"
                : cast.gender === 2
                ? "Male"
                : "Unknown"}
            </div>
            <div>
              <strong>Occupation:</strong> {cast.known_for_department}
            </div>
            <div>
              <strong>Age:</strong> {getAge(cast.birthday)}
            </div>
            <div>
              <strong>Date of Birth:</strong> {cast.birthday}
            </div>
            <div>
              <strong>Height:</strong> {cast.height || "-"}
            </div>
            <div>
              <strong>Nationality:</strong> {cast.place_of_birth}
            </div>
          </div>

          <p className="mt-6 text-gray-300 text-justify leading-relaxed text-md">
            {cast.biography || "No biography available."}
          </p>
        </div>
      </div>
      <div className="relative container mx-auto mt-5 mb-15">
        <Slider
          contents={movie.slice(0).map((item, index) => {
            const type = item.title || item.original_title ? "movie" : "tv";
            return (
              <div key={index} className="shrink-0">
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
              <div key={index} className="shrink-0">
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
      </div>
    </div>
  );
};

// Fungsi untuk hitung umur
function getAge(birthday) {
  if (!birthday) return "-";
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default SingleCast;
