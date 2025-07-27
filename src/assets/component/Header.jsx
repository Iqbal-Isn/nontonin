import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../img/logo.png";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Action", href: "/genre/28", current: false },
  { name: "Drama", href: "/genre/18", current: false },
  { name: "Comedy", href: "/genre/35", current: false },
  { name: "Animation", href: "/genre/16", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setIsScrolled(true);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <Disclosure
      as="nav"
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center">
                <div className="sm:hidden">
                  <DisclosureButton
                    onClick={handleClick}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>

                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                  <img
                    src={imgLogo}
                    alt="Logo"
                    className="h-25 sm:h-30 w-auto"
                  />
                </Link>
              </div>

              <div className="hidden sm:flex flex-1 justify-center">
                <ul className="flex space-x-4">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "text-white font-bold"
                            : "text-gray-300 hover:text-white",
                          "px-3 py-2 text-base"
                        )}
                        state={{ name: item.name }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ml-4">
                <div className="relative text-white">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="pl-11 pr-3 py-1 rounded-md bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring focus:ring-white/30 w-32 sm:w-60"
                  />
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
