const Person=({person,handlerDelete})=>{
    return(
        <li>{person.name} {person.number} <button id={person.id} name={person.name} onClick={handlerDelete}>Delete</button> </li>
    )
}

export default Person