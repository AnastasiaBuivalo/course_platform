import { Fragment, useState, useMemo, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom'

import {api} from '../../../api/api'

import  CardCours   from '../../cardCours/CardCours'
import EditProfile from './EditProfile'

import './profilePage.scss'
import decoration from './decoration.png'
import user from './user.png'


const getCourses = async (setCourses, role, studentId, lectorId) => {
    let courses;
    if(studentId||lectorId){
        if(role == 'Ученик'){
            courses =  await api['getMyCourseSQL']({student_id:studentId});//массив id курсов этого студента
        }
        else{
            courses =  await api['getMyCreateCourseSQL']({lecturer_id:lectorId});//массив id курсов этого преподавтеля
        }
        setCourses(courses.data.data);
    }
    else console.log('ждем');
};

const getUser = async (user_id, setStudent, setLector, setRole, setStudentId, setLectorId) => {
    const res = await api['getMyRoleSQL']({user_id:user_id});
    //console.log(`role${res?.data?.data[0]['role']}`);
    setRole(res?.data?.data[0]['role']);
    if(res?.data?.data[0]['role'] == 'Ученик'){
        const student_id = await api['getStudentIdSQL']({user_id:user_id});//нужно id  студента чтобы перейти к другой таблице
        //console.log(`student_id${student_id?.data?.data[0]['id']}`);
        setStudentId(student_id?.data?.data[0]['id']);
        const student =  await api['getStudent']({student_id:student_id?.data?.data[0]['id']});
        // console.log('student.data.data');
        // console.log(student.data.data[0]);
        setStudent(student.data.data[0]);
    }
    else{
        const lector_id = await api['getLecturerIdSQL']({user_id:user_id});//нужно id  преподавателя чтобы перейти к другой таблице
        setLectorId(lector_id?.data?.data[0]['id']);
        const lector = await api['getLecturer']({lecturer_id:lector_id?.data?.data[0]['id']});
        console.log(lector.data.data);
        setLector(lector.data.data[0]);
    }

    // console.log('studentId')
    // console.log(studentId);
    // let res;
    // if(studentId){
    //     res = await api['getStudent']({student_id:studentId});
    //     setStudent(res.data.data);
    // }
    // else{
    //     res = await api['getLecturer']({lecturer_id:lectorId});
    //     setLector(res.data.data);
    // }
};

const Courses = (props)=>{
    const {role, studentId, lectorId} = props;

    const [courses, setCourses] = useState();
    useEffect(()=>{
        const res = getCourses(setCourses, role, studentId, lectorId);
    }, []);

    return(
        <div className="profile_current_screen">
        {role == 'Преподаватель'? <button><NavLink exact to = "/createCourse">Создать курс</NavLink></button>:null}
        {role?(courses && courses.map(course=>{
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

        })):null}
        </div>
    )
}

const WishList = ()=>{
    return(
        <div className="profile_current_screen" style={{height:'714px'}}>WishList</div>
    )
}

// const EditProfile =(props)=>{
//     const {role, studentId, lectorId} = props;
//     return(
//         <div className="profile_current_screen">
//             EditProfile
//         </div>
//     )
// }

const Notification =()=>{
    return(
        <div className="profile_current_screen" style={{height:'714px'}}>Notification</div>
    )
}

const ProfilePage = (props)=>{
    //const [idMenuActive, setIdMenuActive] = useState();
    const [idCurrentScreen, setCurrentScreen] = useState(2);
    let {userId, name, urlPhoto, setUserId} = props;
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(3);
    const navigate = useHistory();

    const [studentId, setStudentId] = useState();
    const [student, setStudent] = useState();
    const [lector, setLector] = useState();
    const [lectorId, setLectorId] = useState();
    const [role, setRole] = useState();

    useEffect(()=>{
        const res = getUser(userId, setStudent, setLector, setRole, setStudentId, setLectorId);
    }, []);

    const CurrentScreen = useMemo(()=>{
        switch (idCurrentScreen){
            case 1:
                return (<div><Courses role = {role} studentId = {studentId} lectorId={lectorId}/>
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
                return<EditProfile role = {role} student = {student} lector = {lector} userId = {userId}/>;
            case 4:
                console.log('4');
                return <Notification/>;
        }
    }, [idCurrentScreen])
    const fcs_s = student?student['fcs']?student['fcs']:null:null;
    const fcs_l = lector?lector['fcs']?lector['fcs']:null:null;
    return(
        <div className="profile">
            <div className="profile_content">
                <div className="profile_menu ">
                    <div className="profile_menu_header">
                        <img src={user}/>
                        <p>{fcs_s||fcs_l}</p>
                    </div>
                    <ul>
                        <button onClick={()=>  setCurrentScreen(1)}>Мои курсы</button>
                        <button onClick={()=>  setCurrentScreen(2)}>Список желаний</button>
                        <button onClick={()=>  setCurrentScreen(3)}>Редактировать</button>
                        <button onClick={()=>  setCurrentScreen(4)}>Уведомления</button>
                        
                        <button onClick={()=>{setUserId(''); navigate.push(`/`)}}>
                            Выйти
                            {/* <NavLink to= "/" exact style = {{textDecoration: 'none'}} activeStyle={{'color':'#C7AA7F'}}>Выйти</NavLink> */}
                            </button>
                        
                    </ul>
                </div>
                {CurrentScreen}
                    
                
            </div>
            {(idCurrentScreen == 1 || idCurrentScreen == 2) ?(<div className = 'profile_decoration'>            
                    <img  src={decoration }/>
                </div>): null}
        </div>
    )

}

export default ProfilePage