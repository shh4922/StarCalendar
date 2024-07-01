import "./index.scss"
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useAppDispatch } from '../../redux/hooks'
import { increaseMonth, decreaseMonth } from '../../redux/calendar'
import WeatherBar from '../../Components/WeatherBar/WeatherBar'
import { useMoonData, useMoonShape } from '../../apis/moonShape/query'
import right1 from "../../assets/MoonShapeImg/right1.png"
import right2 from "../../assets/MoonShapeImg/right2.png"
import right3 from "../../assets/MoonShapeImg/right3.png"
import right4 from "../../assets/MoonShapeImg/right4.png"
import right5 from "../../assets/MoonShapeImg/right5.png"
import right6 from "../../assets/MoonShapeImg/right6.png"
import right7 from "../../assets/MoonShapeImg/right7.png"
import left1 from "../../assets/MoonShapeImg/left1.png"
import left2 from "../../assets/MoonShapeImg/left2.png"
import left3 from "../../assets/MoonShapeImg/left3.png"
import left4 from "../../assets/MoonShapeImg/left4.png"
import left5 from "../../assets/MoonShapeImg/left5.png"
import left6 from "../../assets/MoonShapeImg/left6.png"
import left7 from "../../assets/MoonShapeImg/left7.png"
import rightHalf from "../../assets/MoonShapeImg/rightHalf.png"
import leftHalf from "../../assets/MoonShapeImg/leftHalf.png"
import fullMoon from "../../assets/MoonShapeImg/fullMoon.png"
import newMoon from "../../assets/MoonShapeImg/newMoon.png"
import Calendar from "../../Components/Calendar/Calendar"



function Index() {

    return (
        <article className="home">
            <WeatherBar />
            <Calendar/>
        </article>
    );
}
export default Index