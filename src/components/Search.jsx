import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'


const Search = () => {

    const inputoRef = useRef()
    const apiRaktas = '&api_key=53c258bb52d305146e19a71e58aa2cc5'

    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);


    const buttonHandler = () => {
        const searchTerm = inputoRef.current.value;
        
        inputoRef.current.value = ''
        
        if (searchTerm) {
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
        }
    };

    return (

        <>
            <h1>Movie Search</h1>

            <div>
                <div>
                    <label >Movie title:</label>
                    <input type="text" ref={inputoRef} />
                    <button onClick={buttonHandler}>Search</button>
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
                

            </div>
        </>
    )
}

export default Search
