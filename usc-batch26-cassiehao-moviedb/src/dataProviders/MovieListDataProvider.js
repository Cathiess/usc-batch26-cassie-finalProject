import React, { useState } from "react";
import MovieListContext from "../context/MovieListContext";

const MovieListDataProvider = ({ children }) => {
  const [movieData, setMovieData] = useState({});
  const contextValue = {
    movieData,
    setMovieData
  };
  return (
    <MovieListContext.Provider value={contextValue}>
      {children}
    </MovieListContext.Provider>
  );
};

export default MovieListDataProvider;
