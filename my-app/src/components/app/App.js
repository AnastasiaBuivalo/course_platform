import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import {lazy, Suspense, useState} from "react"

import AppHeader from "../appHeader/AppHeader";

import Spinner from '../spinner/Spinner'

import './App.css';

const Page404 = lazy(()=>import('../pages/404'));
const MainPage = lazy(()=>import('../pages/mainPage/MainPage'));
const Profile = lazy(()=>import('../pages/profilePage/ProfilePage'));
const FormLogin = lazy(()=>import('../pages/formPage/FormLogin'));
const FormRegistration = lazy(()=>import('../pages/formPage/FormRegistration'));
const CoursePage= lazy(()=>import('../pages/cousePage/CoursePage'));
const CourseList= lazy(()=>import('../courseList/CourseList'));



function App() {

    const [selectedCourse, setSelectedCourse] = useState(null);
    const onCourseSelected = (id) => {
        setSelectedCourse(id);
    }
    let [userId, setUserId] = useState();
  return (
    <Router>
       <div className="app" >
           <AppHeader userId = {userId} setUserId={setUserId}/>
           <main style = {{paddingBottom: '55px'}}>
               <Suspense fallback = {<Spinner/>}>
                   <Switch>
                       <Route exact path = "/" component={MainPage}/> 
                       <Route exact path = "/profile:user_id" 
                              component={()=>
                              <Profile name = 'Вася Ученик' userId = {userId} setUserId = {setUserId} urlPhoto = './user.png'/>}/>

                        <Route exact path="/login"
                        component={()=>
                        <FormLogin userId = {userId} setUserId = {setUserId}/>}/>

                        <Route exact path="/registration"
                        component={()=>
                        <FormRegistration userId = {userId} setUserId = {setUserId}/>}/>

                        <Route exact path="/catalog"
                        component={()=><CourseList selectedId = {selectedCourse} onCorseSelected = {onCourseSelected} />}/>

                        <Route exact path = "/course:course_id" component={CoursePage}/> 
                       <Route path="*">
                           <Page404/>
                       </Route>
                   </Switch>
               </Suspense>
            </main> 
        </div>
   </Router>
  
)
}

export default App;
