import {Container} from 'react-bootstrap';
import './mainPage.scss'
import banner from './banner.png';


const MainPage = ()=>{

    return(
        //<Container>
        <div>
            <div className="main_container">
                <p className="main_container_text" >Освой востребованную профессию</p>
                <img src = {banner} alt = 'banner'/>
            </div>
            <div className='main_separator'/>
        </div>
    )
}

export default MainPage;