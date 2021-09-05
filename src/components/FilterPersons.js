const FilterPersons=({persons,filterName,setFindFilterName})=>{
    console.log(persons)
    return(
        <div>
            filter show with: 
            <input value={filterName} onChange={setFindFilterName} />
        </div>
    )
}
export default FilterPersons