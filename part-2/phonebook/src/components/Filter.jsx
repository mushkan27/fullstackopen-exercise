
const Filter = ({search, handleSearch}) => {
    return (
        <div>Filter shown with <input value={search} onChange={handleSearch} />
        </div>

)
}

export default Filter;