import React, {useEffect, useState} from 'react';
import MovieCard from "../comps/MovieCard";
import {Link} from "react-router-dom";

import '../css/Rated.css'

const apiKey = process.env.REACT_APP_API_KEY;
const filledStar = "★";
const emptyStar = "☆";

const Rated = () => {
    const [ratedMovies, setRatedMovies] = useState([]);

    const fetchMovie = async (id) => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        return await res.json();
    }

    const displayRating = (rating) => {
        const numericRating = parseInt(rating);
        const filledStars = filledStar.repeat(numericRating);
        const emptyStars = emptyStar.repeat(10 - numericRating);
        return filledStars + emptyStars;
    }

    useEffect(() => {
        const fetchAllMovies = async () => {
            const moviePromises = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const ratingObject = JSON.parse(value);

                if (key.startsWith("starRating_")) {
                    const id = key.substring(11);

                    moviePromises.push(
                        fetchMovie(id).then(movieData => ({
                            ...movieData,
                            numberRating: ratingObject.newRating,
                            textRating: ratingObject.textRating
                        }))
                    );
                }
            }

            const fetchedMovies = await Promise.all(moviePromises);
            setRatedMovies(fetchedMovies);
        };

        fetchAllMovies();
    }, []);

    return (
        <div className="rated">

            <ul className="ratedNavBar">
                <li>
                    <h1>CineSphere</h1>
                </li>
                <li>
                    <h3>
                        <Link to={"/"}>
                            Home
                        </Link>
                    </h3>
                </li>
            </ul>

            <h1 className="ratedTitle">Your rated movies:</h1>

            {
                ratedMovies.length > 0 ?
                    (
                        <div className="container">
                            {ratedMovies.map((movie) => (
                                <Link to={`../details/${movie.id}`}>
                                    <MovieCard movie={movie} />
                                    <p className="numberRating">{displayRating(movie.numberRating)}</p>
                                    <p className="textRating">"{movie.textRating}"</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="noMovies">
                            <h2>No rated movies found!</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default Rated;
