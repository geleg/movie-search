import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Define a functional component named Search
const Search = () => {
    // API key for accessing the MovieDB API
    const apiRaktas = '&api_key=53c258bb52d305146e19a71e58aa2cc5';

    // State variables to manage component state
    const [movie, setMovie] = useState([]); // Stores movie data
    const [error, setError] = useState(null); // Manages error states

    // Function to fetch movies from the MovieDB API
    const fetchMovies = () => {
        axios
            .get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${apiRaktas}`)
            .then((response) => {
                setError(null); // Clears any previous errors
                setMovie(response.data.results.slice(0, 10)); // Stores the first 10 movies from the fetched data
            })
            .catch((error) => {
                setError(error); // Sets an error if fetching movies fails
                setMovie([]); // Clears movie data in case of an error
            });
    };

    // useEffect hook to fetch movies once when the component mounts
    useEffect(() => {
        fetchMovies();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Component return: renders JSX containing the UI elements
    return (
        <>
            <h1>Most popular movies</h1>

            <div>
                <div>
                    {/* Conditional rendering based on movie data availability */}
                    {movie.length > 0 ? (
                        // Renders a list of movies if available
                        <ul className='movieList'>
                            {movie.map((movie) => (
                                // Maps through fetched movies to display details
                                <li className='movieInfo' key={movie.id}>
                                    <p className='title'>{movie.original_title}</p>
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="poster" />
                                    <p>Release date: {movie.release_date}</p>
                                    <p>Vote: {movie.vote_average}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        // Displays a message if no movies are fetched yet
                        <p>No search yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Search; // Exporting the Search component as default
