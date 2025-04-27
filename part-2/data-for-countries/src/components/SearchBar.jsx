import React from "react";

const SearchBar = ({searchItem, handleSearch}) => {
return (
    <div>
    <h1>Country Information App</h1>
    <label htmlFor="search">Search for a country:
    <input type="text" value={searchItem} onChange={handleSearch} id="search"/>
    </label>

    </div>
)
}

export default SearchBar;