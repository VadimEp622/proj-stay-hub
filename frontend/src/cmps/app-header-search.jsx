export function AppHeaderSearch({ filterBy, onSubmit, handleChange }) {


    return (
        <section>
            <label>Search: </label>
            <input name="filterText" value={filterBy.filterText} onChange={handleChange}></input>
        </section>
    )
}