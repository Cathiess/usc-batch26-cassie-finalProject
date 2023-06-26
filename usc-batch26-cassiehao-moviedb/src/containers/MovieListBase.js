import React, { useContext } from "react";
import { toggleFavoriteMovie } from "../apiServices";
import MovieCard from "../components/MovieCard";
import MovieGrid from "../components/MovieGrid";
import FavoriteInfoContext from "../context/FavoriteInfoContext";
import useUser from "../hooks/useUser";
import { getImgUrl } from "../utils";

const MovieListBase = ({ movieList }) => {
  const { favData, setFavData } = useContext(FavoriteInfoContext);
  const { user } = useUser();
  const handleToggleFavorite = (id) => {
    if (user) {
      toggleFavoriteMovie(
        id,
        !favData[id],
        user.accountId,
        user.sessionId
      ).then(() => {
        setFavData({
          ...favData,
          [id]: !favData[id]
        });
      });
    }
  };
  return (
    <MovieGrid>
      {movieList.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            id={movie.id}
            imgSrc={getImgUrl(movie.poster_path)}
            title={movie.title}
            rating={movie.vote_average}
            favorite={favData[movie.id]}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      })}
    </MovieGrid>
  );
};

export default MovieListBase;
