import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Category = () => {

    const inputoRef = useRef()
    const apiRaktas = '&api_key=53c258bb52d305146e19a71e58aa2cc5'

    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(''); // State to store selected category
    const categories = ['Action', 'Abenteuer', 'Animation', 'Komödie', 'Krimi'];


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
                    {categories.map((category, index) => (
                        <option key={index} value={category.toLowerCase()}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>


            <div>
                {movie.length > 0 ? (
                    <ul className='movieList'>
                        {movie.map((movie) => (
                            <li className='movieInfo'>
                                <p className='title'>{movie.original_title}</p>
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="posteris" />
                                <p>Release date: {movie.release_date}</p>
                                <p>Vote: {movie.vote_average}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No movies found or search yet.</p>
                )}
            </div>



        </>
    )
}

export default Category
