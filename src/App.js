import "./App.css";
import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f4d9c736ebd0be3b173b8f011ceca34f&page=1";
  const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=f4d9c736ebd0be3b173b8f011ceca34f&query=";


  useEffect(() => {
    getMovies(FEATURED_API)
  }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

const getMovies = (API) =>{
  fetch(API)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    setMovies(data.results);
  })
  .catch((error) => error, "Something Went Wrong");
}
  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies(SEARCH_API + searchTerm)
    setSearchTerm("")
  }

  return (
    <div className="body">
      <header>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="search"
            className="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="search.."
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
