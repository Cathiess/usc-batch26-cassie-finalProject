import React, { useState } from "react";
import RatedInfoContext from "../context/RatedInfoContext";

const RatedDataProvider = ({ children }) => {
  const [ratedData, setRatedData] = useState({});
  /*
    {
      [movieId]: true / false
    }
  */
  const contextValue = {
    ratedData,
    setRatedData
  };
  return (
    <RatedInfoContext.Provider value={contextValue}>
      {children}
    </RatedInfoContext.Provider>
  );
};

export default RatedDataProvider;
