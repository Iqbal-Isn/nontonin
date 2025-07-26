const Card = (props) => {
  return (
    <div>
      <div className="relative w-[120px] h-[100%] sm:w-[200px] sm:h-[320px] rounded-md overflow-hidden shadow-lg bg-gray-800 flex-shrink-0 group">
        <img
          src={props.image}
          alt={props.title}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000307]/20 via-transparent to-transparent z-10"></div>
      </div>
      <p className="mt-3 sm:text-md text-white text-center w-[95px] sm:w-[200px] line-clamp-2">
        {props.title}
      </p>
    </div>
  );
};

export default Card;
