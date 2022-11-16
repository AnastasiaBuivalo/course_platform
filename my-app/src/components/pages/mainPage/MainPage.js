import './MainPage.css'
import banner from './banner.png';

const MainBlock = {
    position: "absolute",
    width: "921px",
    height: "664px",
    left: "130px",
    top: "256px",
}

const MainText = {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "100px",
    lineHeight: "136px",

    color: "#000000",
}

const MainImg = {
    width: "775px",
    height: "778px",
    left: "1025px",
    top: "256px",
    borderRadius: "518.5px",
}


const MainPage = ()=>{

    return(
        <div style = {MainBlock} className="main_block">
            <h1 style={MainText} >Освой востребованную профессию</h1>
            <img  style ={MainImg} src = {banner} alt = 'banner'/>
        </div>
    )
}

export default MainPage;