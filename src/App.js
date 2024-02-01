import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import ConfirmationPage from './components/ConfirmationPage';
import NavBar from './components/NavBar';
import Movies from './components/Movies'
import SignUpPage from './components/SignUpPage'

const App = () => {
  useEffect(() => {
    document.title = 'Movtix';
  });
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<MovieList />} />

          <Route path="/movie/:id" element={<MovieDetails />} />

          <Route path="/movies" element={<Movies />} />

          <Route path="/confirm" element={<ConfirmationPage />} />

          <Route path="/signup" element={<SignUpPage />} />

        </Routes>
      </div>
    </Router>
  );
};
export default App;