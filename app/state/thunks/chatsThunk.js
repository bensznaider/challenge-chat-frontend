import axios from "axios";

axios.defaults.withCredentials = true;

const server = "http://localhost:8080/api"

export const getChatsByUser = (userId) => async () => {
  try {
    const response = await axios.get(
      `${server}/chats/all-messages/${userId}/`,
      { withCredentials: true, credentials: 'include' }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const addFavorite = (movieData) => async () => {
  const { title, tmdbId, userId, year, posterURL, voteAverage } = movieData;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER}/favorites/add-favorite`,
      {
        title: title,
        tmdbId: tmdbId,
        userId: userId,
        year: year,
        posterURL: posterURL,
        voteAverage: voteAverage,
      },
      { withCredentials: true, credentials: 'include' }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const removeFavorite = (movieData) => async () => {
  const { tmdbId, userId } = movieData;
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER}/favorites/remove-favorite`,
      { data: { userId: userId, tmdbId: tmdbId } },
      { withCredentials: true, credentials: 'include' }
    );
    return response;
  } catch (err) {
    throw err;
  }
};
