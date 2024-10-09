import React, { useEffect, useState } from 'react';
import './Movie.css'; // Ensure your CSS file is imported

// A fallback image for cases where no poster or image is available
const fallbackImage = 'https://via.placeholder.com/300x450?text=No+Image';

function Movie() {
    const [movieList, setMovieList] = useState([]);

    // Function to fetch the movie data
    const getMovie = () => {
        fetch("https://raw.githubusercontent.com/winAs-Xprt/movieData/refs/heads/main/movies.json")
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setMovieList(json); // Set the movie list from the fetched JSON data
            })
            .catch(error => console.error('Error fetching data:', error)); // Handle any fetch errors
    };

    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Movie List</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {movieList.map((movie) => (
                    <div className="movie-card" key={movie.imdbID}>
                        <img 
                            src={movie.Images && movie.Images.length > 0 ? movie.Images[0] : fallbackImage} 
                            alt={movie.Title}
                            style={{ width: '300px', height: '450px' }} // Adjust image size as needed
                        />
                        <h3 className="movie-title">{movie.Title}</h3>
                        <p className="movie-info"><strong>Year:</strong> {movie.Year}</p>
                        <p className="movie-info"><strong>Director:</strong> {movie.Director}</p>
                        <p className="movie-info"><strong>Actors:</strong> {movie.Actors}</p>
                        <p className="movie-info"><strong>Plot:</strong> {movie.Plot}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Movie;
