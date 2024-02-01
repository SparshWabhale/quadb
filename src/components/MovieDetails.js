import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const navigate  = useNavigate ();

  const getMovieDetails = async () => {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const formattedDate = movieDetails.premiered
    ? new Date(movieDetails.premiered).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Not available';

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputEmailChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(formData));
  
    navigate('/confirm', {
      state: {
        movieDetails,
        userData: formData,
      },
    });
    setShowModal(false);
  };
  
  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':');
    const isPM = parseInt(hours, 10) >= 12;
    const hours12 = (parseInt(hours, 10) % 12) || 12;
    return `${hours12}:${minutes} ${isPM ? 'PM' : 'AM'}`;
  };

  return (
    <div className="MovieDetailsContainer">
      <img
        src={movieDetails.image?.medium || '/logo_pop.png'}
        alt={movieDetails.name}
      />
      <div className="MovieDetailsInfo">
        <h1>{movieDetails.name}</h1>

        <div className="rating-details">
          <img src="/star.png" alt="star" />
          {movieDetails.rating?.average || '--'}
        </div>

        <div className="Genres">
          {movieDetails.genres?.map((genre, index) => (
            <div key={index} className="GenreItem">
              {genre}
            </div>
          ))}
        </div>

        <div className="Language">
          {movieDetails.language} <div className="circle"></div> {formattedDate}{' '}
          <div className="circle"></div> {movieDetails.runtime ? `${movieDetails.runtime} Minutes` : ''}
        </div>

        <div className="Summary" dangerouslySetInnerHTML={{ __html: movieDetails.summary }}>
        </div>

        {movieDetails.schedule && movieDetails.schedule.days && movieDetails.schedule.time && (
          <>
            <strong>Available Shows</strong>
            <div className="Show">
              {movieDetails.schedule.days} <div className="circle"></div> {convertTo12HourFormat(movieDetails.schedule.time)} {' '}
            </div>
            <Link>
              <button className="book" onClick={openModal}>
                Book Tickets
              </button>
            </Link>
          </>
        )}

{showModal && (
  <div className="modal">
    <div className="modal-content">
      <div className="movie-details-box">
        <p>
          <strong>Movie : </strong> {movieDetails.name}
        </p>
        <p>
          <strong>Language:</strong> {movieDetails.language}
        </p>
        <p>
          <strong>Genres:</strong> {movieDetails.genres.join(', ')}
        </p>
        <p>
          <strong>Day and Time:</strong> {movieDetails.schedule.days} at {convertTo12HourFormat(movieDetails.schedule.time)}
        </p>
      </div>
      <form onSubmit={handleFormSubmit} className="booking-form">
      <label htmlFor="name">Name</label>
            <input
            type="text"
            id="name"
            name="name"
            value={formData.name} 
            onChange={handleInputChange}
            required
            />
            <label htmlFor="email">Email / Phone Number</label>
            <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputEmailChange}
            required
        />
        <button className="submit">Confirm Booking</button>
        <button className="cancel" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default MovieDetails;
