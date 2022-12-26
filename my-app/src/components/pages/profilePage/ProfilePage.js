import { Fragment, useState, useMemo, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom'

import {api} from '../../../api/api'

import  CardCours   from '../../cardCours/CardCours'
import './profilePage.scss'
import decoration from './decoration.png'
import user from './user.png'

const getCourses = async (user_id, setCourses, setRole) => {
    let courses;
    const res = await api['getMyRoleSQL']({user_id:user_id});
    setRole(res?.data?.data[0]['role']);
    if(res?.data?.data[0]['role'] == 'Ученик'){
        const student = await api['getStudentIdSQL']({user_id:user_id});//нужно id  студента чтобы перейти к другой таблице
        courses =  await api['getMyCourseSQL']({student_id:student?.data?.data[0]['id']});//массив id курсов этого студента
    }
    else{
        //то же но с преподом
    }
    // console.log('courses.data.data');
    // console.log(courses.data.data);
    setCourses(courses.data.data);
};


const Courses = (props)=>{
    let {user_id, start, setStart, end, setEnd, getCourses} = props;
    let items = [];
    const [courses, setCourses] = useState();
    const [role, setRole] = useState();
    useEffect(()=>{
        const res = getCourses(user_id, setCourses, setRole)
    }, []);

    return(
        <div className="profile_current_screen">
        {role == 'Преподаватель'? <button>Создать курс</button>:null}
        {courses && courses.map(course=>{
            return(
                <div key = {course['id']}>
                <CardCours course = {course}
                title = {course['title']}
                description = {course['descript']}
                id = {course['id']}
                duration = {course['duration']? course['duration']: 0}
                // title = {'учим Питон'} 
                // description = 'В этом курсе по программированию на языке Python вы познакомитесь с базовыми понятиями программирования. Едва ли возможно научиться программировать без практики, поэтому в качестве домашних заданий вам будет предложено довольно много задач, в которых вы сможете потренировать своё умение программировать.'
                // id ='1'
                // duration = '125 часов'
            />
             </div>
            )

        })}
        </div>
    )
}

const WishList = ()=>{
    return(
        <div className="profile_current_screen">WishList</div>
    )
}

const EditProfile =()=>{
    return(
        <div className="profile_current_screen">EditProfile</div>
    )
}

const Notification =()=>{
    return(
        <div className="profile_current_screen">Notification</div>
    )
}

const ProfilePage = (props)=>{
    //const [idMenuActive, setIdMenuActive] = useState();
    const [idCurrentScreen, setCurrentScreen] = useState(1);
    let {userId, name, urlPhoto, setUserId} = props;
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(3);
    const navigate = useHistory();

    const CurrentScreen = useMemo(()=>{
        switch (idCurrentScreen){
            case 1:
                return (<div className="hi"><Courses user_id = {userId} start = {start} setStart = {setStart} end = {end} setEnd={setEnd} getCourses = {getCourses}/>
                        {/* <button 
                        onClick={()=>{
                            setStart(end);
                            setEnd(end + 3);///
                            return <Courses user_id = {userId} start = {start} setStart = {setStart} end = {end} setEnd={setEnd}/>}}
                        >
                            <div className="inner" >load more</div>
                        </button> */}
                </div>);
            case 2:
                console.log('2');
                return <WishList/>;
            case 3:
                console.log('3');
                return<EditProfile/>;
            case 4:
                console.log('4');
                return <Notification/>;
        }
    }, [idCurrentScreen])
    return(
        <div className="profile">
            <div className="profile_content">
                <div className="profile_menu ">
                    <div className="profile_menu_header">
                        <img src={user}/>
                        <p>{name}</p>
                    </div>
                    <ul>
                        <button onClick={()=>  setCurrentScreen(1)}>Мои курсы</button>
                        <button onClick={()=>  setCurrentScreen(2)}>Список желаний</button>
                        <button onClick={()=>  setCurrentScreen(3)}>Редактировать</button>
                        <button onClick={()=>  setCurrentScreen(4)}>Уведомления</button>
                        
                        <button onClick={()=>{userId=''; navigate.push(`/`)}}>
                            Выйти
                            {/* <NavLink to= "/" exact style = {{textDecoration: 'none'}} activeStyle={{'color':'#C7AA7F'}}>Выйти</NavLink> */}
                            </button>
                        
                    </ul>
                </div>
                {CurrentScreen}
            </div>
    
            <div className = 'profile_decoration'>            
                <img  src={decoration }/>
            </div>
        </div>
    )

}

export default ProfilePage