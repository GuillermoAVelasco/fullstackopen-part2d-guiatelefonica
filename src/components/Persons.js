import Person from "./Person"

const Persons= ({persons,handlerDelete})=>{
    return(
        <ul>
        {
            persons.map(e=>
            <Person key={e.id} person={e} handlerDelete={handlerDelete} />
            )
        }
        </ul>        
    )
}

export default Persons