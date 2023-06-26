import React, { useState } from "react";
import FavoriteInfoContext from "../context/FavoriteInfoContext";

const FavoriteDataProvider = ({ children }) => {
  const [favData, setFavData] = useState({});
  /*
    {
      [movieId]: true / false
    }
  */
  const contextValue = {
    favData,
    setFavData
  };
  return (
    <FavoriteInfoContext.Provider value={contextValue}>
      {children}
    </FavoriteInfoContext.Provider>
  );
};

export default FavoriteDataProvider;
