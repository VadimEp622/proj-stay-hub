export function AppHeaderSearch({ filterBy, onSubmit, handleChange }) {


    return (
        <section>
            <form className="header-search-temp" onSubmit={onSubmit}>
                <label>Search: </label>
                <input name="filterText" value={filterBy.filterText} onChange={handleChange}></input>
                <input type="submit" />
            </form>
        </section>
    )
}