import promo from './course_promo.jpeg'
import lector from './lector.png'
import results from './results.png'
import clock from './clock.png'
import book from './book.png'

import './coursePage.scss'

const CoursePage = (props)=>{
    const {title} = props;

    return(
        <div className="course_page">
            < div className="promo">
                <img src={promo}/>
                <h2>цена</h2>

                <div className="promo_favorite">
                    <button>Добавить в корзину</button>
                    <button>Избранное</button>
                </div>
                <div className='promo_buy'>
                    <button>Купить</button>
                </div>
            </div>
            <div className="infobox">
                <h1>Полное руководство по Python 3: от новичка до специалиста</h1>
                <p>Изучи Python 3 с нуля - один из самых популярных языков программирования в мире + Введение в SQL и PostgreSQL</p>
                <h2>Включает:</h2>
                <div className="items">
                    <div className="item">
                        <img alt='часы' src={clock}/>
                        <p>Длительность: часов</p>
                    </div>
                    <div className="item">
                        <img alt='Доп материалы' src = {book}/>
                        <p>Ресурсы</p>
                    </div>
                    <div className="item">
                        <img alt='Результат' src = {results}/>
                        <p>Сертификат</p>
                    </div>
                </div>
                <p>Дополнительное описание</p>
                <div className="lecturer">
                    <img alt='Фото преподавателя' src = {lector}/>
                    <div className='lecturer_inform'>
                        <h3>ФИО</h3>
                        <p>О себе</p>
                    </div>

                </div>
            </div>
            
        </div>
    )
};

export default CoursePage;