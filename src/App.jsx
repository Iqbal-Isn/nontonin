import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/component/Home";
import Header from "./assets/component/Header";
import Single from "./assets/component/Single";
import "./App.css";
import SearchPage from "./assets/component/SearchPage";
import SingleCast from "./assets/component/SingleCast";
import Archive from "./assets/component/Archive";
import Footer from "./assets/component/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:type/:id" element={<Single />} />
        <Route path="/genre/:id" element={<Archive />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cast/:id" element={<SingleCast />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
