import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Search = () => {
    const inputoRef = useRef();
    const apiRaktas = '&api_key=53c258bb52d305146e19a71e58aa2cc5';

    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);
    const [searchError, setSearchError] = useState('');
    const [storedMovies, setStoredMovies] = useState([]);

  
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

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('movies')) || [];
        setStoredMovies(stored);
    }, []);

    const buttonHandler = () => {
        const searchTerm = inputoRef.current.value;

        inputoRef.current.value = '';

        if (searchTerm.length >= 2) {
            axios
                .get(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&language=en-US${apiRaktas}`)
                .then((response) => {
                    setError(null);
                    setMovie(response.data.results);
                })
                .catch((error) => {
                    setError(error);
                    setMovie([]);
                });
            setSearchError('');
        } else {
            setSearchError('Search term must be at least 2 characters long.');
        }
    };

    // Function to handle adding a movie to local storage
    const handleAddToLocalStorage = (movieData) => {
        addToLocalStorage(movieData);
        // Additional logic if needed after adding to local storage
    };

    // Function to handle removing a movie from local storage
    const handleRemoveFromLocalStorage = (movieId) => {
        removeFromLocalStorage(movieId);
        // Additional logic if needed after removing from local storage
    };

    return (
        <>
            <h1>Movie Search</h1>

            <div>
                <div>
                    <label>Movie title:</label>
                    <input type="text" ref={inputoRef} />
                    {searchError && <p style={{ color: 'red' }}>{searchError}</p>}
                    <button onClick={buttonHandler}>Search</button>
                </div>

                <div>
                    {movie.length > 0 ? (
                        <ul className='movieList'>
                            {movie.map((movie) => (
                                <li className='movieInfo' key={movie.id}>
                                    <p className='title'>{movie.original_title}</p>
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="posteris" />
                                    <p>Release date: {movie.release_date}</p>
                                    <p>Vote: {movie.vote_average}</p>
                                    {/* Add button to add movie to local storage */}
                                    <button onClick={() => handleAddToLocalStorage(movie)}>Add to Favorites</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No movies found or search yet.</p>
                    )}
                </div>

                {/* Section to display stored movies */}
                <div>
                    <h1>Stored Movies</h1>
                    <ul className='movieList'>
                        {storedMovies.length > 0 ? (
                            storedMovies.map((storedMovie) => (
                                <li className='movieInfo' key={storedMovie.id}>
                                    <p className='title'>{storedMovie.original_title}</p>
                                    <img src={`https://image.tmdb.org/t/p/w200${storedMovie.poster_path}`} alt="posteris" />
                                    <p>Release date: {storedMovie.release_date}</p>
                                    <p>Vote: {storedMovie.vote_average}</p>
                                    {/* Move remove button to this section */}
                                    <button onClick={() => handleRemoveFromLocalStorage(storedMovie.id)}>Remove from Favorites</button>
                                </li>
                            ))
                        ) : (
                            <p>No stored movies yet.</p>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Search;
