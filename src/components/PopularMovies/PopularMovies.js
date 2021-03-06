import React, { useState, useEffect } from "react";
import "./popular-movies.css";
import "../../queries.css";
import { Link } from "react-router-dom";

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  const getPopularMovies = async () => {
    const popularMovie = localStorage.getItem("popularMovie");
    const timestamp = popularMovie & new Date(parseInt(popularMovie));
    const now = new Date();

    const dateTime = Math.round(now - timestamp) / (1000 * 60);
    if (popularMovie !== null) {
      setPopularMovies(JSON.parse(popularMovie));
      if (dateTime <= 60) {
        localStorage.remove("popularMovie");
      }
    } else {
      const res = await fetch(
        `https://imdb-api.com/en/API/MostPopularMovies/k_wwo8vztv`
      );
      const resJSON = await res.json();
      setPopularMovies(resJSON.items);
      localStorage.setItem("popularMovie", JSON.stringify(resJSON.items));
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <>
      <h3>The most popular movies 30 </h3>
      <div className="popular-container">
        <div className="popular-movie">
          {popularMovies &&
            popularMovies
              .sort((a, b) => b.year - a.year)
              .filter((item) => item.rank <= 30)
              .map((item) => {
                return (
                  <Link to={`/${item.id}`} key={item.id} className="link">
                    <div key={item.id} className="movie-container">
                      <img
                        className="movie-image"
                        src={item.image}
                        alt={item.title}
                      />
                      <div className="movie-content">
                        <h4>{item.title}</h4>
                        <p>{item.year}</p>
                        <p>
                          <strong>Crew:</strong> {item.crew}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default PopularMovies;
