import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Category = () => {
    const apiRaktas = '&api_key=53c258bb52d305146e19a71e58aa2cc5';

    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [genres, setGenres] = useState([]);

    const fetchMovieGenres = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?language=en-US${apiRaktas}`
            );
            setGenres(response.data.genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    useEffect(() => {
        fetchMovieGenres();
    }, []); // Fetch genres when component mounts

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const fetchMoviesByCategory = (category) => {
        axios
            .get(`https://api.themoviedb.org/3/discover/movie?with_genres=${category}&language=en-US${apiRaktas}`)
            .then((response) => {
                setError(null);
                setMovie(response.data.results);
            })
            .catch((error) => {
                setError(error);
                setMovie([]);
            });
    };

    useEffect(() => {
        if (selectedCategory) {
            fetchMoviesByCategory(selectedCategory);
        }
    }, [selectedCategory]);

    return (
        <>
            <h1>Search Movie by Category</h1>
            <div>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select a category</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {movie.length > 0 ? (
                    <ul className='movieList'>
                        {movie.map((movieItem) => (
                            <li key={movieItem.id} className='movieInfo'>
                                <p className='title'>{movieItem.original_title}</p>
                                <img src={`https://image.tmdb.org/t/p/w200${movieItem.poster_path}`} alt="posteris" />
                                <p>Release date: {movieItem.release_date}</p>
                                <p>Vote: {movieItem.vote_average}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No movies found or search yet.</p>
                )}
            </div>
        </>
    );
};

export default Category;
