import React from 'react';
import {useState,useEffect} from "react";
import {Link} from "react-router-dom";

import '../css/Home.css';
import MovieCard from '../comps/MovieCard.jsx';

const apiKey = process.env.REACT_APP_API_KEY;

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const updatePage = (des) => {
        if (des === "next" && movies?.length === 20) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
        } else if (pageNumber !== 1) {
            setPageNumber(prevPageNumber => prevPageNumber - 1);
        }
    }

    useEffect(() => {
        const fetchTrendingMovies = async() => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}&api_key=${apiKey}`);
            const data = await res.json();

            setMovies(data.results);
        }

        const fetchMovies = async(title) => {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&page=${pageNumber}`);
            const data = await res.json();

            setMovies(data.results);
        }

        if (searchTerm) {
            fetchMovies(searchTerm);
        } else {
            fetchTrendingMovies();
        }
    }, [pageNumber, searchTerm]);


    return(
        <div className="app">
            <h1 className="homeTitle">CineSphere</h1>

            <div className="ratedButton">
                <Link to={`/rated`}>
                    <h2>Rated</h2>
                </Link>
            </div>

            <div className="searchBar">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value);setPageNumber(1)}}
                />
            </div>

            {
                movies?.length > 0 ?
                (
                     <div className="container">
                         {movies.map((movie) => (
                             <Link to={`details/${movie?.id}`}>
                                <MovieCard movie = {movie} />
                             </Link>
                         ))}

                     </div>

                ) : (
                    <div className="noMovies">
                        <h2>No movies found!</h2>
                    </div>
                )

            }

            <div className="homePageNav">
                <button onClick={() => updatePage("prev")}>{"<"}</button>
                <p>{pageNumber}</p>
                <button onClick={() => updatePage("next")}>{">"}</button>
            </div>

        </div>
    );
}

export default Home;