import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/component/Home";
import Header from "./assets/component/Header";
import Single from "./assets/component/Single";
import "./App.css";
import SearchPage from "./assets/component/SearchPage";
import SingleCast from "./assets/component/SingleCast";
import Archive from "./assets/component/Archive";
import Footer from "./assets/component/Footer";
import NotFound from "./assets/component/NotFound";
import About from "./assets/component/About";
import PrivacyPolicy from "./assets/component/PrivacyPolicy";
import Contact from "./assets/component/Contact";

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
        <Route path="/about" element={<About />} />
        <Route path="/privacy&policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
