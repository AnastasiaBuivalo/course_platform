import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import {api} from '../../../api/api'

import promo from './course_promo.jpeg'
import lector from './lector.png'
import results from './results.png'
import clock from './clock.png'
import book from './book.png'

import './coursePage.scss'

const getCourse = async (course_id, setCourse) => {
   // console.log('course_id');
   // console.log(course_id);
    const res = await api['getCourseSQL']({course_id:course_id});
    setCourse(res?.data?.data[0]);
    //await setCourse(res?.data?.data[0]);
    console.log('res');
    console.log(res.data.data[0]);
    // return res;
};

const CoursePage = (props)=>{

    const{course_id} = useParams();
    let [course, setCourse] = useState();
    //console.log(course_id[1]);
    // useEffect(()=>{
//         getCourse(course_id[1], course);
//         setTimeout(() => {
//             console.log(course); // здесь старое значение, потому что функция вызвалась только один раз
//             // и на момент вызова там была пустая строка
//  }, 5000);
    // }, []);
    useEffect(()=>getCourse(course_id[1], setCourse), []);
    //         setTimeout(() => {
//             console.log(course); // здесь старое значение, потому что функция вызвалась только один раз
//             // и на момент вызова там была пустая строка
//  }, 5000);

    return(
        <div className="course_page">
            {course?(
                <div>
            < div className="promo">
                <img src={promo}/>
                <h2>цена</h2>
                <h2>{course['price']}</h2>

                <div className="promo_favorite">
                    <button>Добавить в корзину</button>
                    <button>Избранное</button>
                </div>
                <div className='promo_buy'>
                    <button>Купить</button>
                </div>
            </div>
            <div className="infobox">
                <h1>{course.title}</h1>
                {/* <h1>Полное руководство по Python 3: от новичка до специалиста</h1> */}
                <p>{course.descript}</p>
                {/* <p>Изучи Python 3 с нуля - один из самых популярных языков программирования в мире + Введение в SQL и PostgreSQL</p> */}
                <h2>Включает:</h2>
                <div className="items">
                    <div className="item">
                        <img alt='часы' src={clock}/>
                        <p>Длительность: {course.duration} часов</p>
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
            </div>):null}
            
        </div>
    )
};

export default CoursePage;