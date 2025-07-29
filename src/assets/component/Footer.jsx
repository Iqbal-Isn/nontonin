import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/90 backdrop-blur text-gray-400 py-10">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-6">
        {/* Top Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm sm:text-md">
          <Link to="/about">
            <span className="hover:underline">About</span>
          </Link>
          <Link to="/privacy&policy">
            <span className="hover:underline">Privacy & Policy</span>
          </Link>
          <Link to="/contact">
            <span className="hover:underline">Contact</span>
          </Link>
        </div>

        {/* Icons */}
        <div className="flex gap-6 text-xl mt-2">
          <a href="#" aria-label="Facebook" className="hover:text-white">
            <FaFacebookF className="text-xl" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-white">
            <FaInstagram className="text-xl" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white">
            <FaXTwitter className="text-xl" />
          </a>
          <a href="#" aria-label="Github" className="hover:text-white">
            <FaGithub className="text-xl" />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-white">
            <FaYoutube className="text-xl" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-center">
          © 2025 nontonin, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
