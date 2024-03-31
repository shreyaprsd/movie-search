import { useState, useEffect } from "react";
import "./styles.css";
import MovieList from "./components/MovieList";
import MovieTitle from "./components/MovieTitle";
import Search from "./components/Search";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourite from "./components/RemoveFavourite";

function App() {
  const [movies, setMovies] = useState([]);

  const [input, setInput] = useState("");

  const [favourite, setFavourite] = useState([]);

  async function fetchData(input) {
    const fetch_url = `https://www.omdbapi.com/?s=${input}&apikey=d4f97daa`;

    const request = await fetch(fetch_url);

    const response = await request.json();

    if (response.Search) {
      setMovies(response.Search);
    }
  }

  useEffect(() => {
    fetchData(input);
  }, [input]);

  useEffect(() => {
    const moviefav = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    
    if (Array.isArray(moviefav)) {
      setFavourite(moviefav);
    }
  }, []);

  const addFavouriteMovie = (movieObj) => {
    
    const isAlreadyFavourite = favourite.filter(
      (eachMovieObj) => eachMovieObj.imdbID === movieObj.imdbID
    );
    if (isAlreadyFavourite.length > 0) {
     
      return;
    }
    const newlikedmovies = [...favourite, movieObj];

    setFavourite(newlikedmovies);
    saveToLocalStorage(newlikedmovies);
  };

  const RemoveFavouriteMovie = (movie) => {
    const removeList = favourite.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourite(removeList);
   
    saveToLocalStorage(removeList);
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  return (
    <div className="App">
      <div className="movie__title">
        <MovieTitle title="Movies" />

        <Search input={input} setInput={setInput} />
      </div>

      <div className="movies__section ">
        <MovieList
          movies={movies}
          favouriteComponent={AddFavourites}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>

      {/*  */}

      <div className="movie__title">
        <MovieTitle title="Favourites" />
      </div>

      <div className="movies__section">
        <MovieList
          movies={favourite}
          favouriteComponent={RemoveFavourite}
          handleFavouritesClick={RemoveFavouriteMovie}
        />
      </div>
    </div>
  );
}

export default App;