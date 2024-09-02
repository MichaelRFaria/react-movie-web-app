import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import Rated from "./pages/Rated";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/details/:id" element={<MoviePage/>}/>
            <Route path="/rated" element={<Rated/>}/>
        </Routes>
    );
}

export default App;