import React from "react";
import "./MovieTitle.css";
function MovieTitle(props) {
  return (
    <div className="heading ">
      <h2 className=" sm:text-center   md:text-left  lg:text-left " >{props.title}</h2>
    </div>
  );
}

export default MovieTitle;