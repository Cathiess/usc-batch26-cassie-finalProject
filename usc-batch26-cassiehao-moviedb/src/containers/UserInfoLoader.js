import { CircularProgress } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { getPersonalMovies } from "../apiServices";
import FavoriteInfoContext from "../context/FavoriteInfoContext";
import RatedInfoContext from "../context/RatedInfoContext";
import useUser from "../hooks/useUser";

const UserInfoLoader = ({ children }) => {
  const { user, setUser } = useUser();
  const { setFavData } = useContext(FavoriteInfoContext);
  const { setRatedData } = useContext(RatedInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInStorage = localStorage.getItem("user");
    if (userInStorage) {
      try {
        const userInfo = JSON.parse(userInStorage);
        if (userInfo) {
          setUser(userInfo);
        }
      } catch (e) {
        console.error("Failed to parse user info");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([
        getPersonalMovies(user.accountId, "favorite", user.sessionId).then(
          (data) => {
            const { results } = data;
            const favData = results.reduce((acc, movie) => {
              return {
                ...acc,
                [movie.id]: movie
              };
            }, {});
            setFavData(favData);
          }
        ),
        getPersonalMovies(user.accountId, "rated", user.sessionId).then(
          (data) => {
            const { results } = data;
            const rateData = results.reduce((acc, movie) => {
              return {
                ...acc,
                [movie.id]: movie.rating
              };
            }, {});
            setRatedData(rateData);
          }
        )
      ]).then(() => {
        setLoading(false);
      });
    }
  }, [user]);

  return loading ? <CircularProgress /> : children;
};

export default UserInfoLoader;
