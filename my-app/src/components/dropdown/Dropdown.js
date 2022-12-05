import { useState } from "react"
import { NavLink } from 'react-router-dom';
import { Container } from "react-bootstrap";
import './dropdown.scss'

const List = ()=>{
    console.log('list');
    return(
        <ul className="dropdown_list" style={{display:'flex',flexDirection:'column'}}>
            <NavLink exact to= "/catalog" activeStyle={{'color':'#C7AA7F'}}><button>Все</button></NavLink>
            <button>Two</button>
            <button>Three</button>
        </ul>
    )
}
const Dropdown = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="cont">
            <div className="dropdown">
                <button onClick={()=>setIsOpen((isOpen)=>!isOpen)}>Каталог</button>
                {isOpen? <List/>: null}
            </div>
        </div>
    )
}

export default Dropdown;