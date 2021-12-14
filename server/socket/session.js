require('dotenv').config();
const axios = require('axios');
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const genre_IDs = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const randomUnique = (range, count) => {
  let nums = new Set();
  while (nums.size < count) {
    nums.add(Math.floor(Math.random() * (range - 1 + 1)));
  }
  return [...nums];
};

const initializeSession = () => {
  const state = createSessionState();
  return state;
};

const createSessionState = async () => {
  try {
    let sessionMovies = [];
    const response1 = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&with_watch_providers=8&watch_region=US&page=1`
    );
    const response2 = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&with_watch_providers=8&watch_region=US&page=2`
    );
    const response3 = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&with_watch_providers=8&watch_region=US&page=3`
    );
    let moviesList1 = response1.data.results;
    const moviesList2 = response2.data.results;
    const moviesList3 = response3.data.results;
    moviesList1 = moviesList1.concat(moviesList2);
    const moviesList = moviesList1.concat(moviesList3);

    let randomUniqueNumbers = randomUnique(moviesList.length, 10);
    randomUniqueNumbers.forEach((num) => {
      const genreList = moviesList[num].genre_ids.map((genreId) => genre_IDs[genreId]);

      sessionMovies.push({
        title: moviesList[num].title,
        rating: moviesList[num].vote_average,
        genreList,
        description: moviesList[num].overview,
        imageUrl: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${moviesList[num].poster_path}`,
      });
    });
    return { sessionMovies, client1Choices: [], client2Choices: [] };
  } catch (e) {
    console.log(e);
  }
};

module.exports = { initializeSession };
