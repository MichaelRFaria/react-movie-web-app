import React from 'react';

import imageNotFound from '../imgs/imageNotFound.svg';

const MovieCard = ({movie}) => {

    return (
        <div className="movieCard">
            <div className="moviePoster">
                <img src={movie.poster_path !== null ?
                    `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : imageNotFound}
                     alt={movie.title}/>
            </div>

            <div>
                <p className="movieYear">{movie.release_date}</p>
            </div>

            <div className="movieInfo">
                <span className="movieType">
                    {movie.vote_average}</span>
                <h3 className="movieTitle">{movie.title}</h3>
            </div>
        </div>
    )
}

export default MovieCard;