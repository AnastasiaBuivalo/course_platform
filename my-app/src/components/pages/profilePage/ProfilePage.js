import { Fragment, useState, useMemo } from "react";
import './profilePage.scss'
import decoration from './decoration.png'
import user from './user.png'

const Courses = ()=>{
    return(
        <div className="profile_current_screen">Courses</div>
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
    const {id, name, urlPhoto} = props;

    const CurrentScreen = useMemo(()=>{
        switch (idCurrentScreen){
            case 1:
                console.log('1');
                return <Courses/>;
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
    console.log(name);
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
                        <button>Выйти</button>
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