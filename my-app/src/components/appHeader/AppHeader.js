import { NavLink } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import  Dropdown  from '../dropdown/Dropdown';
import './appHeader.scss';
import logo512 from './logo512.png'

// end style={({isActive})=>({color: isActive? '#9f0013': 'inherit'})}
//end style={({isActive})=>({})}
const AppHeader = () => {
    return (
        <Container>
            <header className="app__header pt-5" >
                {/* <h1 className="app__title"> */}
                    <NavLink to= "/" exact>
                        <img src={logo512}/>
                    </NavLink>
                {/* </h1> */}

                <Dropdown/>

                <input type="text" 
                        style = {{width: '410px', height: '45px'}}
                        className='form-control search-input'
                        placeholder = 'Поиск'/>
                <nav className="app__menu">
                    <ul>
                        <li type = 'none'> 
                            <NavLink exact to= "/aboutUs" activeStyle={{'color':'#C7AA7F'}}>О нас         
                            </NavLink>
                        </li>
                        <li type = 'none'> 
                            <NavLink exact to= "/profile" activeStyle={{'color':'#C7AA7F'}}>Профиль         
                            </NavLink>
                        </li>
                        <li type = 'none'> 
                            <NavLink exact to= "/login" activeStyle={{'color':'#C7AA7F'}}>Log in         
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </Container>
    )
}

export default AppHeader;