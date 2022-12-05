import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
//import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
//import App from '../app/App'

import './courseList.scss';
import '../pages/formPage/forms.scss'
import logo from '../appHeader/logo512.png'


const getAllCourses = (offset)=>{
    return ([
        {id:1, name: 'Название', decription: 'Описание', thumbnail: logo, price: 'Цена'},
        {id:2, name: 'Название', decription: 'Описание', thumbnail: logo, price: 'Цена'},
        {id:3, name: 'Название', decription: 'Описание', thumbnail: logo, price: 'Цена'}
    ])
}

const CourseList = (props)=>{

    const [courseList, setCourseList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(110);
    const [ended, setEnded] = useState(false);

    //const {loading, error, getAllCharacters} = useMarvelService();
    let loading = false;
    let error = false;
    // const {loading, error} = props;
    useEffect(() => {
        onRequest(offset, true);},
        // eslint-disable-next-line react-hooks/exhaustive-deps
         []);


    const onRequest = (offset, initial) => {
        setNewItemLoading(!initial);
        onCourseListLoaded(getAllCourses(offset));

            //.then(onCharListLoaded)
    }

    const onCourseListLoaded = (newCourseList) => {
        let isEnd = false;
        if(newCourseList.length < 9)
            isEnd = true;
        setCourseList((courseList)=>[...courseList, ...newCourseList]);
        setNewItemLoading(false);
        setOffset((offset)=>offset+9);
        setEnded(isEnd);
    }

    function renderItems(arr) {
        //console.log(arr);
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            let classItem = (props.selectedId === item.id)? "course_item course_item_selected":"course_item";
            return (
                <li 
                    className= {classItem}
                    key={item.id}
                    onClick={() => props.onCharSelected(item.id)}>
                        <div className='course_name'><img src={item.thumbnail} alt={item.name} style={imgStyle}/></div>
                        <div className="course_name">{item.name}</div>
                        <div>{item.decription}</div>
                </li>
            )
        });
        console.log(items);
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="course_grid">
                {items}
            </ul>
        )
    };


    //const {charList, loading, error, newItemLoading, offset, ended} = this.state;
    
    const items = renderItems(courseList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    // if(loading){
    //     import('./SomeFunc')
    //     .then(obj=>obj.logger())
    //     .catch(console.log('о,шибка'))
    // }
    //const content = !(loading || error) ? items : null;

    return (
        <div className="course_list">
            {errorMessage}
            {spinner}
            {items}
            <div className='course_list_btn'>
                <button 
                
                disabled = {newItemLoading}
                onClick={()=>{onRequest(offset)}}
                // style = {{'display': ended ? 'none':'block'}}
                >
                    <div className="inner">load more</div>
                </button>
                </div>
            </div>
    )
}

// CourseList.propTypes = {
//     onCharSelected: PropTypes.func.isRequired
// }

export default CourseList;