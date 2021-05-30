
const Search = ({ search, submit }) => {
    return (
        <div className='weatherContainer'>
            <div className='logo'><span>WEATHER</span></div>
            <div className='input-group mb-3 input'>
                <input
                    className='form-control'
                    type="text"
                    onChange={search}
                    placeholder='Write a City name...'
                />
                <button
                    className='btn btn-outline-secondary'
                    onClick={submit}>
                    Search
                </button>
            </div>

        </div>
    );
}

export default Search;