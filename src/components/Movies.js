import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div className="MovieCardWrapper">
        {movies.map((movie, index) => (
          <div className="MovieCard" key={index}>
            <Link to={`/movie/${movie.show.id}`}>
              <img
                src={movie.show.image?.medium || '/logo_pop.png'}
                alt={`img${index + 1}`}
              />
            </Link>
            <br />
            <div className="rating">
              <div className="language">English</div>
              <img src="/star.png" alt="star" />
              {movie.show.rating?.average || '--'}
            </div>
            <div className="text-container">
              <h3>{movie.show.name}</h3>
              <h4>{movie.show.genres?.join(' / ')}</h4>
            </div>
            <Link to={`/movie/${movie.show.id}`}>
              <button className="book-now">Book Now</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieList;
