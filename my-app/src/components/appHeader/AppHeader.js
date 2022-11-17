import { NavLink } from 'react-router-dom';
import {Container} from 'react-bootstrap';
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

                <div className="dropdown">
                    <a className="btn btn-secondary dropdown-toggle"
                        href="#" 
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false">
                            Dropdown link
                    </a>

                    <ul className="dropdown-menu" >
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </ul>
                </div>

                <input type="text" 
                        style = {{width: '410px', height: '45px'}}
                        className='form-control search-input search-panel'
                        placeholder = 'Поиск'/>
                <nav className="app__menu">
                    <ul>
                        <li type = 'none'> 
                            <NavLink exact to= "/aboutUs" activeStyle={{'color':'#9f0013'}}>О нас         
                            </NavLink>
                        </li>
                        <li type = 'none'> 
                            <NavLink exact to= "/profile" activeStyle={{'color':'#9f0013'}}>Профиль         
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to= "/comics" activeStyle={{'color':'#9f0013'}}>Comics
                            </NavLink>
                        </li> */}
                    </ul>
                </nav>
            </header>
        </Container>
    )
}

export default AppHeader;