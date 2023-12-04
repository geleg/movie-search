import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'


const Search = () => {

    const inputoRef = useRef()
    const apiRaktas = '&api_key=53c258bb52d305146e19a71e58aa2cc5'

    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);


    const buttonHandler = () => {
  
            axios
                .get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${apiRaktas}`)
                .then((response) => {
                    setError(null);
                    setMovie(response.data.results);
                })
                .catch((error) => {
                    setError(error);
                    setMovie([]);
                });

    };

    return (

        <>
            <h1>Most popular movies</h1>

            <div>
                <div>
                    <label >Movie title:</label>
                    <button onClick={buttonHandler}>Show most popular movies</button>
                </div>

                <div>
                    {movie.length > 0 ? (
                        <ul>
                            {movie.map((movie) => (
                                <li className='movieInfo'>
                                    <p>Title: {movie.original_title}</p>
                                    <p>Release date: {movie.release_date}</p>
                                    <p>Vote: {movie.vote_average}</p>
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="posteris" />
                                    <p>**********</p> <br />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No search yet.</p>
                    )}
                </div>
                

            </div>
        </>
    )
}

export default Search
