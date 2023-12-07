import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Search = () => {
    // Create a reference for the input field
    const inputoRef = useRef();

    // API key for accessing movie database
    const apiRaktas = '&api_key=53c258bb52d305146e19a71e58aa2cc5';

    // State variables using useState hook
    const [movie, setMovie] = useState([]); // Holds movie search results
    const [error, setError] = useState(null); // Holds potential errors during API calls
    const [searchError, setSearchError] = useState(''); // Holds errors related to search term validation
    const [storedMovies, setStoredMovies] = useState([]); // Holds movies stored in local storage

    // Function to add a movie to local storage
    const addToLocalStorage = (movieData) => {
        const updatedMovies = [...storedMovies, movieData];
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        setStoredMovies(updatedMovies);
    };

    // Function to remove a movie from local storage
    const removeFromLocalStorage = (movieId) => {
        const updatedMovies = storedMovies.filter((movie) => movie.id !== movieId);
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        setStoredMovies(updatedMovies);
    };

    // Fetch stored movies from local storage on component mount
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('movies')) || [];
        setStoredMovies(stored);
    }, []);

    // Function to handle button click for movie search
    const buttonHandler = () => {
        const searchTerm = inputoRef.current.value;

        inputoRef.current.value = '';

        if (searchTerm.length >= 2) {
            // Make an API call to search movies based on the provided term
            axios
                .get(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&language=en-US${apiRaktas}`)
                .then((response) => {
                    setError(null);
                    setMovie(response.data.results); // Set the retrieved movies in the state
                })
                .catch((error) => {
                    setError(error);
                    setMovie([]); // Set movies to empty array in case of an error
                });
            setSearchError('');
        } else {
            setSearchError('Search term must be at least 2 characters long.');
        }
    };

    // Function to add a movie to local storage
    const handleAddToLocalStorage = (movieData) => {
        addToLocalStorage(movieData);
    };

    // Function to remove a movie from local storage
    const handleRemoveFromLocalStorage = (movieId) => {
        removeFromLocalStorage(movieId);
    };
    
    const favoriteMovieList = document.getElementsByClassName('favoriteMovieList')

    const deleteFavoriteList = () => {
        localStorage.clear()

        setStoredMovies('')

    }

    // Render JSX
    return (
        <>
            <h1>Movie Search</h1>

            <div>
                {/* Search input and button */}
                <div className='flex'>
                    <label>Movie title:</label>
                    <input type="text" ref={inputoRef} />
                    {searchError && <p style={{ color: 'red' }}>{searchError}</p>}
                    <button onClick={buttonHandler}>Search</button>
                </div>

                {/* Display search results */}
                <div >
                    {movie.length > 0 ? (
                        <ul className='movieList'>
                            {movie.map((movie) => (
                                <li className='movieInfo' key={movie.id}>
                                    {/* Display movie information */}
                                    <p className='title'>{movie.original_title}</p>
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="posteris" />
                                    <p>Release date: {movie.release_date}</p>
                                    <p>Vote: {movie.vote_average}</p>
                                    {/* Button to add movie to favorites */}
                                    <button onClick={() => handleAddToLocalStorage(movie)}>Add to Favorites</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='flex'>No movies found or search yet.</p>
                    )}
                </div>

                {/* Display stored movies */}
                <div>
                    <h1>Favorite Movies</h1>
                   
                        
                        {storedMovies.length > 0 ? ( <ul className='movieList favoriteMovieList' >
                            {storedMovies.map((storedMovie) => (
                                <li className='movieInfo' key={storedMovie.id}>
                                    {/* Display stored movie information */}
                                    <p className='title'>{storedMovie.original_title}</p>
                                    <img src={`https://image.tmdb.org/t/p/w200${storedMovie.poster_path}`} alt="posteris" />
                                    <p>Release date: {storedMovie.release_date}</p>
                                    <p>Vote: {storedMovie.vote_average}</p>
                                    {/* Button to remove movie from favorites */}
                                    <button onClick={() => handleRemoveFromLocalStorage(storedMovie.id)}>Remove from Favorites</button>
                                </li>
                            ))}
                            </ul>
                        ) : (
                            <p className='flex'>No stored movies yet.</p>
                        )}
                    <div className='flex'> <button  onClick={deleteFavoriteList}>Clear favorite movie list</button></div>
                   
                </div>
            </div>
        </>
    );
};

export default Search;
