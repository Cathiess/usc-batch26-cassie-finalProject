import { CircularProgress, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getPersonalMovies } from "../apiServices";
import useUser from "../hooks/useUser";
import MovieListBase from "./MovieListBase";
const FavoriteList = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    if (user) {
      setLoading(true);
      getPersonalMovies(user.accountId, "favorite", user.sessionId).then(
        (data) => {
          setLoading(false);
          setMovieList(data.results);
        }
      );
    }
  }, []);
  return (
    <div>
      <Typography>Favorite</Typography>
      {loading ? <CircularProgress /> : <MovieListBase movieList={movieList} />}
    </div>
  );
};

export default FavoriteList;
