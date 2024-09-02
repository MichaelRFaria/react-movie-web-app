import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import imageNotFound from "../imgs/imageNotFound.svg";

import '../css/MoviePage.css';
import Rating from "../comps/Rating";

const MoviePage = () => {
    let { id} = useParams();
    const apiKey = '320554cfb760708710e0eb192a0454ea';
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [textRating, setTextRating] = useState("");

    const ratingKey = `starRating_${id}`;
    const defaultRating = localStorage.getItem(ratingKey);


    useEffect(() => {
        const fetchSpecificMovie = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`);
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchSpecificMovie()
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!movie) {
        return <div>No movie data available!</div>;
    }

    return (
        <div className="moviePage" style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        }}>

            <ul className="moviePageNavBar">
                <li className="left">
                    <h1>CineSphere</h1>
                </li>
                <li className="right">
                    <h3>
                        <Link to={"/rated"}>
                            Rated
                        </Link>
                    </h3>
                </li>
                <li className="right">
                    <h3>
                        <Link to={"/"}>
                            Home
                        </Link>
                    </h3>
                </li>
            </ul>

            <h1 className="moviePageTitle">{movie.title}</h1>

            <div className="moviePageContent">
                <div className="moviePagePoster">
                    <img src={movie.poster_path !== null ?
                        `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : imageNotFound}
                         alt={movie.title}/>
                </div>
                <div className="moviePageDetails">
                    <p>{movie.overview}</p>
                    <p>Release Date: {movie.release_date}</p>
                    <p>Runtime: {movie.runtime} minutes</p>
                    <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p>Vote Average: {movie.vote_average}</p>
                    <p>Production Companies: {movie.production_companies.map(company => company.name).join(', ')}</p>

                    <hr/>

                    <div className="moviePageRating">
                        <p>What did you think of it?</p>
                        <textarea onChange={(e) => {setTextRating(e.target.value)}}></textarea>
                        <Rating defaultRating={defaultRating} id={id} textRating={textRating}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoviePage;