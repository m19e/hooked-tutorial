import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import Text from "./Text";

const MOVIE_API_URL = "http://www.omdbapi.com/?s=paranormal&apikey=82b14814";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetch(MOVIE_API_URL)
            .then((res) => res.json())
            .then((jsonRes) => {
                setMovies(jsonRes.Search);
                setLoading(false);
            });
    }, []);

    const search = (searchValue: string) => {
        setLoading(true);
        setErrorMessage(null);

        fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=82b14814`)
            .then((res) => res.json())
            .then((jsonRes) => {
                if (jsonRes.Response === "True") {
                    setMovies(jsonRes.Search);
                    setLoading(false);
                } else {
                    setErrorMessage(jsonRes.Error);
                    setLoading(false);
                }
            });
    };

    return (
        <div className="App">
            <Header text="HOOKED" />
            {/* <Search search={search} /> */}
            <Text />
            {/* <p className="movies">
                {loading && !errorMessage ? (
                    <span>loading...</span>
                ) : errorMessage ? (
                    <div className="errorMessage">{errorMessage}</div>
                ) : (
                    movies.map((movie: any, index) => (
                        <Movie key={`${index}-${movie.Title}`} movie={movie} />
                    ))
                )}
            </p> */}
        </div>
    );
};

export default App;
