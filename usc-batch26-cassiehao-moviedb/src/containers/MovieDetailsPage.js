import React, { Fragment, useContext, useEffect, useState } from "react";
import { getMovieDetail, rateMovie } from "../apiServices";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import RatedInfoContext from "../context/RatedInfoContext";
import useUser from "../hooks/useUser";
import Alert from "../components/Alert";

const MovieDetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const { ratedData, setRatedData } = useContext(RatedInfoContext);
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const movieId = params.movieId;

  useEffect(() => {
    console.log(params);
    getMovieDetail(movieId).then((data) => {
      setMovie(data);
    });
  }, [params]);

  const handleRate = (rating) => {
    if (user) {
      rateMovie(movieId, rating, user.sessionId).then(() => {
        setOpen(true);
        setRatedData({
          ...ratedData,
          [movieId]: rating
        });
      });
    }
  };
  return (
    <Fragment>
      <Alert openSnakeBar={open} setOpenSnakeBar={setOpen} title="success" />
      <MovieDetail
        movie={movie}
        myRate={ratedData[movieId]}
        onRate={handleRate}
      />
    </Fragment>
  );
};

export default MovieDetailsPage;
