import { CircularProgress, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getPersonalMovies } from "../apiServices";
import useUser from "../hooks/useUser";
import MovieListBase from "./MovieListBase";

const RatedList = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    if (user) {
      setLoading(true);
      getPersonalMovies(user.accountId, "rated", user.sessionId).then(
        (data) => {
          setLoading(false);
          setMovieList(data.results);
        }
      );
    }
  }, []);
  return (
    <div>
      <Typography>Rated</Typography>
      {loading ? <CircularProgress /> : <MovieListBase movieList={movieList} />}
    </div>
  );
};

export default RatedList;
