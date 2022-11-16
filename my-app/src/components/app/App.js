import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import {lazy, Suspense} from "react"

import AppHeader from "../appHeader/AppHeader";

import Spinner from '../spinner/Spinner'

import './App.css';

const Page404 = lazy(()=>import('../pages/404'));
const MainPage = lazy(()=>import('../pages/mainPage/MainPage'));

function App() {
  return (
    <Router>
       <div className="app">
           <AppHeader/>
           {/* <main>
               <Suspense fallback = {<Spinner/>}>
                   <Switch>
                       <Route exact path = "/" component={MainPage} /> 
                        <Route exact path = "/comics" component={}/>
                       <Route exact path="/comics/:comicId" component={}/>
                       <Route path="*">
                           <Page404/>
                       </Route>
                   </Switch>
               </Suspense>
            </main>  */}
        </div>
   </Router>
  
)
}

export default App;
