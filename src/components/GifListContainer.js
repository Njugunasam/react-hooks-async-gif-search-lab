import React, { useState, useEffect } from "react";
import GifList from "./GifList";
import GifSearch from "./GifSearch";

function GifListContainer() {
    const [gifs, setGifs] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query.trim() !== "") {
            fetchGifs(query);
        }
    }, [query]);

    const fetchGifs = async (query) => {
        try {
            const apiKey = "hUN4EHueyJpWrDykwjgRh3mOyCH2MlFI";
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&rating=g`
            );
            const data = await response.json();
            setGifs(data.data.slice(0, 3));
        } catch (error) {
            console.error("Error fetching gifs:", error);
        }
    };

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
    };

    return (
        <div>
            <GifSearch onSearch={handleSearch} />
            <GifList gifs={gifs} />
        </div>
    );
}

export default GifListContainer;
