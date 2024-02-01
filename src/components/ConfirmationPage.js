import React from 'react';
import { useLocation } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const { state } = useLocation();

  if (!state || !state.movieDetails || !state.userData) {
    return <div>Data not available</div>;
  }

  const { movieDetails, userData } = state;

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':');
    const isPM = parseInt(hours, 10) >= 12;
    const hours12 = (parseInt(hours, 10) % 12) || 12;
    return `${hours12}:${minutes} ${isPM ? 'PM' : 'AM'}`;
  };

  return (
        <div className="confirm_page">
            <img src="/check.gif" alt="check" className="check"></img>
            <h2>Booking Confirmed !!</h2>
            <h3> Enjoy your Movie {userData.name}</h3>
            <h3>Ticket sent to {userData.email}</h3>
            
            <div className="movie-details-cnf">   
            <h1>Booking Summary</h1>
                <img
                    src={movieDetails.image?.medium || '/logo_pop.png'}
                    alt={movieDetails.name}
                />
                <div className="text-details-cnf">
                    <p>Movie: {movieDetails.name}</p>
                    <p>Language: {movieDetails.language}</p>
                    <p>Genre: {movieDetails.genres.join(', ')}</p>
                    <p>Day and Time: {movieDetails.schedule.days} at {convertTo12HourFormat(movieDetails.schedule.time)}</p>
                </div>
            </div>
        </div>
  );
};

export default ConfirmationPage;
