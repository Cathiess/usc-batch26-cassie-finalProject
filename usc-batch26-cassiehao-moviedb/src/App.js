import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import FavoriteList from "./containers/FavoriteList";
import LoginPage from "./containers/LoginPage";
import MovieDetailsPage from "./containers/MovieDetailsPage";
import MovieList from "./containers/MovieList";
import RatedList from "./containers/RatedList";
import "./styles.css";
import NavBar from "./containers/NavBar";
import DataProvider from "./dataProviders/DataProvider";
import UserInfoLoader from "./containers/UserInfoLoader";

export default function App() {
  return (
    <Fragment>
      <DataProvider>
        <UserInfoLoader>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <MovieList />
            </Route>
            <Route path="/movies/:movieId" exact>
              <MovieDetailsPage />
            </Route>
            <Route path="/favorite">
              <FavoriteList />
            </Route>
            <Route path="/rated">
              <RatedList />
            </Route>
            <Route>
              <LoginPage />
            </Route>
          </Switch>
        </UserInfoLoader>
      </DataProvider>
    </Fragment>
  );
}
