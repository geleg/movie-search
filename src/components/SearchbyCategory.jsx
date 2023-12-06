// Import necessary modules from React and Axios library
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Functional component named Category
const Category = () => {
    // API key for accessing the MovieDB API
    const apiRaktas = '&api_key=53c258bb52d305146e19a71e58aa2cc5';

    // State variables using the 'useState' hook to manage component state
    const [movie, setMovie] = useState([]); // Stores movie data
    const [error, setError] = useState(null); // Manages error states
    const [selectedCategory, setSelectedCategory] = useState(''); // Tracks the selected movie category
    const [genres, setGenres] = useState([]); // Stores movie genres

    // Function to fetch movie genres from the MovieDB API
    const fetchMovieGenres = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?language=en-US${apiRaktas}`
            );
            setGenres(response.data.genres); // Sets the fetched genres into the state
        } catch (error) {
            console.error('Error fetching genres:', error); // Logs an error if fetching fails
        }
    };

    // useEffect hook to fetch movie genres once when the component mounts
    useEffect(() => {
        fetchMovieGenres();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Event handler to update the selected category when the dropdown selection changes
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value); // Updates the selected category state
    };

    // Function to fetch movies based on the selected category
    const fetchMoviesByCategory = (category) => {
        axios
            .get(`https://api.themoviedb.org/3/discover/movie?with_genres=${category}&language=en-US${apiRaktas}`)
            .then((response) => {
                setError(null); // Clears any previous errors
                setMovie(response.data.results); // Sets the fetched movies into the state
            })
            .catch((error) => {
                setError(error); // Sets an error if fetching movies fails
                setMovie([]); // Clears movie data in case of an error
            });
    };

    // useEffect hook to fetch movies when a category is selected
    useEffect(() => {
        if (selectedCategory) {
            fetchMoviesByCategory(selectedCategory); // Fetches movies based on the selected category
        }
    }, [selectedCategory]); // Runs when the selected category changes

    // Component return: renders JSX containing the UI elements
    return (
        <>
            <h1>Search Movie by Category</h1>
            {/* Dropdown to select movie category */}
            <div>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select a category</option>
                    {genres.map((genre) => (
                        // Maps through available genres to populate dropdown options
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Display movies based on selected category */}
            <div>
                {movie.length > 0 ? ( // Checks if movies are available
                    <ul className='movieList'>
                        {movie.map((movieItem) => (
                            // Maps through fetched movies to display details
                            <li key={movieItem.id} className='movieInfo'>
                                <p className='title'>{movieItem.original_title}</p>
                                <img src={`https://image.tmdb.org/t/p/w200${movieItem.poster_path}`} alt="poster" />
                                <p>Release date: {movieItem.release_date}</p>
                                <p>Vote: {movieItem.vote_average}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    // Displays a message if no movies are found or fetched yet
                    <p>No movies found or search yet.</p>
                )}
            </div>
        </>
    );
};

export default Category; // Exporting the Category component as default
