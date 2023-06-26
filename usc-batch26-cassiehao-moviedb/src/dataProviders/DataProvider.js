import React from "react";
import FavoriteDataProvider from "./FavoriteDataProvider";
import MovieListDataProvider from "./MovieListDataProvider";
import RatedDataProvider from "./RatedDataProvider";
import UserDataProvider from "./UserDataProvider";

const DataProvider = ({ children }) => {
  return (
    <UserDataProvider>
      <MovieListDataProvider>
        <FavoriteDataProvider>
          <RatedDataProvider>{children}</RatedDataProvider>
        </FavoriteDataProvider>
      </MovieListDataProvider>
    </UserDataProvider>
  );
};

export default DataProvider;
