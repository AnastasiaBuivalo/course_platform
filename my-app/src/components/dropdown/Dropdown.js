import { useState } from "react"
import { Container } from "react-bootstrap";
import './dropdown.scss'

const List = ()=>{
    console.log('list');
    return(
        <ul className="dropdown_list" style={{display:'flex',flexDirection:'column'}}>
            <button>One</button>
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