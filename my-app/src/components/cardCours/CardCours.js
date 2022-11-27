import { ModalTitle } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import './cardCours.scss'

const CardCours = (props)=>{
    const {title, description, duration, id} = props;
    return(
        <div className='mini_card'>
            <div className='header'>
                <h2>{title}</h2>
                <h2>{duration}</h2>
            </div>

            <p>{`${description.slice(0, 210)}...`}</p>
            <NavLink className='mini_card_right' exact to = '/course'> <button>Подробнее</button></NavLink>
        </div>
    )
}

export default CardCours;