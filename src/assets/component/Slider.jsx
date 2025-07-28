import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const Slider = (props) => {
  const scrollRef = useRef(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const scrollByAmount = 300;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const isAtStart = el.scrollLeft <= 0;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    setIsStart(isAtStart);
    setIsEnd(isAtEnd);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;

    const timeout = setTimeout(() => {
      handleScroll();
    }, 100);

    if (el) {
      el.addEventListener("scroll", handleScroll);
    }

    return () => {
      clearTimeout(timeout);
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative container mx-auto mt-5 mx-auto ">
      <h2 className="text-l sm:text-xl font-normal text-white mb-6">
        {props.heading}
      </h2>

      {/* Arrow Left */}
      {!isStart && (
        <button
          onClick={scrollLeft}
          className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition hidden sm:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex space-x-2 sm:space-x-4 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {props.contents}
      </div>

      {/* Arrow Right */}
      {!isEnd && (
        <button
          onClick={scrollRight}
          className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-black/60 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition hidden sm:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Slider;
