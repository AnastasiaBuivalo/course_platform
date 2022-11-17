import {Container} from 'react-bootstrap';
import './mainPage.scss'
import banner from './banner.png';
import decoration from './decoration.png'

const MainPage = ()=>{

    return(
        //<Container>
            <div className="main_container">
                {/* <Container className = "constainer main_container"> */}
                    <p className="main_container_text" >Освой востребованную профессию</p>
                    <img src = {banner} alt = 'banner'/>
                {/* </Container> */}
            </div>
       // </Container>
    )
}

export default MainPage;