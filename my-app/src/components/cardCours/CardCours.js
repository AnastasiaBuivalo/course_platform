import { ModalTitle } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom';
import './cardCours.scss'

const CardCours = (props)=>{
    const {title, description, duration, id, course} = props;
    const navigate = useHistory();
    return(
        <div className='mini_card'>
            <div className='header'>
                <h2>{title}</h2>
                <h2>{duration}</h2>
            </div>

            <p>{`${description.slice(0, 210)}...`}</p>
           
            {/* <NavLink className='mini_card_right' exact to = '/course'> */}
            <div className='mini_card_btns'> <button>Перейти к урокам</button><button onClick={()=> navigate.push(`/course:${course['id']}`)}>Подробнее</button></div> 
                 {/* </NavLink> */}
        </div>
    )
}

export default CardCours;