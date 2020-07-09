import React, { useState } from "react";

const Search = (props: any) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    const resetInputField = () => {
        setSearchValue("");
    };

    const callSearchFunction = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    };

    return (
        <form className="search">
            <input
                type="text"
                value={searchValue}
                onChange={handleSearchInputChanges}
            />
            <input type="submit" onClick={callSearchFunction} value="SEARCH" />
        </form>
    );
};

export default Search;
