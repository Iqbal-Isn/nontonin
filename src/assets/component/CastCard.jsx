import React from "react";

const CastCard = (props) => {
  return (
    <div className="flex flex-col items-center w-26 sm:w-32 shrink-0">
      <img
        src={props.image}
        alt={props.alt}
        className="w-[100%] h-26 sm:h-32 rounded-full object-cover shadow-md"
      />
      <p className="mt-3 text-sm sm:text-md text-white text-center truncate overflow-hidden whitespace-nowrap w-full">
        {props.name}
      </p>
    </div>
  );
};

export default CastCard;
