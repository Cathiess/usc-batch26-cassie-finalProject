import { Box, CircularProgress } from "@material-ui/core";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { getMovieList, toggleFavoriteMovie } from "../apiServices";
import CategorySelect from "../components/CategorySelect";
import MovieCard from "../components/MovieCard";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import { CATEGORIES } from "../constant";
import FavoriteInfoContext from "../context/FavoriteInfoContext";
import MovieListContext from "../context/MovieListContext";
import useUser from "../hooks/useUser";
import { getImgUrl } from "../utils";
import MovieListBase from "./MovieListBase";

const MovieList = () => {
  const [loading, setLoading] = useState(false);
  const { movieData, setMovieData } = useContext(MovieListContext);
  const [movieList, setMovieList] = useState([]);
  const [category, setCatgory] = useState(CATEGORIES.POPULAR);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);

  const loadMovie = (category, page) => {
    /*
      {
        popular: {
          1: {results, total_page, pages},
          2: {results, total_page, pages}
        },
        upcoming: {
          1: {results, total_page, pages},
          2: {results, total_page, pages}
        },
        ...
      }
    */
    if (movieData[category] && movieData[category][page]) {
      // cached already
      const cachedMovieData = movieData[category][page];
      setMovieList(cachedMovieData.results);
      setCurrentPage(page);
      setTotalPages(cachedMovieData.total_pages);
    } else {
      setLoading(true);
      getMovieList(category, page)
        .then((data) => {
          const { page, results, total_pages } = data;
          setMovieList(results);
          setMovieData({
            ...movieData,
            [category]: movieData[category]
              ? {
                  ...movieData[category],
                  [page]: data
                }
              : {
                  [page]: data
                }
          });
          setCurrentPage(page);
          setTotalPages(total_pages);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    loadMovie(CATEGORIES.POPULAR, 1);
  }, []);

  useEffect(() => {
    loadMovie(category, 1);
  }, [category]);

  const handlePageChange = (page) => {
    loadMovie(category, page);
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <Box display={"flex"} justifyContent="space-between">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handlePageChange}
              onPrev={handlePageChange}
            />
            <CategorySelect category={category} setCategory={setCatgory} />
          </Box>

          <MovieListBase movieList={movieList} />
        </Fragment>
      )}
    </div>
  );
};

export default MovieList;
