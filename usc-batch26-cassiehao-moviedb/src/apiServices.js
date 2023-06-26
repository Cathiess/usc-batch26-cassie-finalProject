import axios from "axios";
const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "dae00b55c2f84ea3e6b7a5269e204c45"
  }
});

export const getMovieList = (category, page) => {
  return client
    .get(`/movie/${category}`, { params: { page } })
    .then((resp) => resp.data);
};

export const getMovieDetail = (movieId) => {
  return client.get(`/movie/${movieId}`).then((resp) => resp.data);
};

export const getPersonalMovies = (accountId, listType, sessionId) => {
  return client
    .get(`/account/${accountId}/${listType}/movies`, {
      params: {
        session_id: sessionId
      }
    })
    .then((resp) => resp.data);
};

export const rateMovie = (movieId, rate, sessionId) => {
  return client.post(
    `/movie/${movieId}/rating`,
    {
      value: Number(rate)
    },
    {
      params: {
        session_id: sessionId
      }
    }
  );
};

export const toggleFavoriteMovie = (
  movieId,
  isFavorite,
  accountId,
  sessionId
) => {
  return client.post(
    `/account/${accountId}/favorite`,
    {
      media_type: "movie",
      media_id: movieId,
      favorite: isFavorite
    },
    {
      params: {
        session_id: sessionId
      }
    }
  );
};

export const loginService = async (username, password) => {
  const { data } = await client.get(`/authentication/token/new`);
  const request_token = data.request_token;
  await client.post("/authentication/token/validate_with_login", {
    username,
    password,
    request_token
  });
  const {
    data: { session_id }
  } = await client.post(`/authentication/session/new`, { request_token });
  const {
    data: { id }
  } = await client.get("/account", {
    params: {
      session_id
    }
  });
  const userData = {
    username,
    accountId: id,
    sessionId: session_id,
    requestToken: request_token
  };
  return userData;
};
