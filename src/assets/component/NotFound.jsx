import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">NOT FOUND.</p>
      <Link
        to="/"
        className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
