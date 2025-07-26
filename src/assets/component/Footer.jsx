import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black/90 backdrop-blur text-gray-400 py-10">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-6">
        {/* Top Links */}
        <div className="flex flex-wrap justify-center gap-6 text-md">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Privacy & Policy
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Accessibility
          </a>
          <a href="#" className="hover:underline">
            Partners
          </a>
        </div>

        {/* Icons */}
        <div className="flex gap-6 text-xl mt-2">
          <a href="#" aria-label="Facebook" className="hover:text-white">
            <FaFacebookF className="text-2xl" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-white">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white">
            <FaXTwitter className="text-2xl" />
          </a>
          <a href="#" aria-label="Github" className="hover:text-white">
            <FaGithub className="text-2xl" />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-white">
            <FaYoutube className="text-2xl" />
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
