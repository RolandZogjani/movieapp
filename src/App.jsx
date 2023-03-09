import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./images/search.svg";

import "./App.css";

//30b7b5b6

const API_URL = "http://www.omdbapi.com?apikey=30b7b5b6";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <img src={SearchIcon} alt="search" onClick={handleSearch} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID}></MovieCard>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
