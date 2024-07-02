import "./calendar.scss"
import { useSelector } from "react-redux";
import { decreaseMonth, increaseMonth } from "../../redux/calendar"
import { useAppDispatch } from "../../redux/hooks"
import { AppDispatch, RootState } from "../../redux/store"
import { useMoonData } from "../../apis/moonShape/query";
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
import dummyMoon from "../../assets/MoonShapeImg/dummyMoon.png"

function Calendar() {
    const dispatch = useAppDispatch<AppDispatch>()
    const year = useSelector((state: RootState) => state.calendar.year);
    const month = useSelector((state: RootState) => state.calendar.month);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const { moonShape, moonRise } = useMoonData()

    const moonPhases = [
        { min: 0, max: 1.59, phase: newMoon },
        { min: 1.59, max: 3.18, phase: right1 },
        { min: 3.18, max: 4.77, phase: right2 },
        { min: 4.77, max: 6.36, phase: right3 },
        { min: 6.36, max: 7.95, phase: right4 },
        { min: 7.95, max: 9.54, phase: rightHalf },
        { min: 9.54, max: 11.13, phase: right5 },
        { min: 11.13, max: 12.72, phase: right6 },
        { min: 12.72, max: 14.31, phase: right7 },
        { min: 14.31, max: 15.90, phase: fullMoon },
        { min: 15.90, max: 17.49, phase: left7 },
        { min: 17.49, max: 19.08, phase: left6 },
        { min: 19.08, max: 20.67, phase: left5 },
        { min: 20.67, max: 22.26, phase: leftHalf },
        { min: 22.26, max: 23.85, phase: left4 },
        { min: 23.85, max: 25.44, phase: left3 },
        { min: 25.44, max: 27.03, phase: left2 },
        { min: 27.03, max: 30.00, phase: left1 }
    ];
    const getCurrentDate = () => {
        const today = new Date();
        return {
            year: today.getFullYear(),
            month: today.getMonth(),
            date: today.getDate()
        };
    };
    function getMoonPhase(lunAge: string) {
        const age = parseFloat(lunAge);
        const phase = moonPhases.find(phase => age >= phase.min && age < phase.max);
        return phase ? phase.phase : dummyMoon;
    };

    function createCalendarGrid() {
        let days = [];
        const currentDate = getCurrentDate();

        // 이전달의 총 일수
        const prevDaysInMonth = new Date(year, month, 0).getDate();

        // 이전달 날짜 추가
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push(<div key={`prev${i}`} className="day prevDays"><p>{prevDaysInMonth - i}</p></div>);
        }

        // 현재 월 날짜 추가
        for (let d = 1; d <= daysInMonth; d++) {
            const isToday = (year === currentDate.year && month === currentDate.month && d === currentDate.date);
            const dayClassName = `day currentMonth ${isToday ? 'today' : ''}`;
            days.push(
                <div key={d} className={dayClassName}>
                    {moonShape && moonRise ? (
                        <>
                            <p >{d}</p>
                            <img className='moonShape' src={getMoonPhase(moonShape[d - 1].lunAge)} alt={`Moon phase for day ${d}`} />
                            <div className="moonRise">
                                <p>월출: <strong>{moonRise[d - 1].moonrise}</strong></p>
                                <p>월몰: <strong>{moonRise[d - 1].moonset}</strong></p>
                            </div>
                        </>
                    ) : (
                        <p>{d}</p>
                    )}
                </div>
            );
        }

        // 마지막 주가 7일이 되도록 빈 칸 추가
        if (days.length % 7 === 0) {
            return days
        }
        for (let i = 1; i < 7; i++) {
            if (days.length % 7 !== 0) {
                days.push(<div key={`next${i}`} className="day nextDays"><p>{i}</p></div>);
            } else {
                break
            }
        }
        return days;
    };
    
    return (
        <div className="calendar">
            <div className="calendarMonth">
                <p onClick={() => dispatch(decreaseMonth())}>{"<"}</p>
                <p>{month + 1}월</p>
                <p onClick={() => dispatch(increaseMonth())}>{">"}</p>
            </div>

            <div className="calendarHead">
                <div className="red">Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div className="blue">Sat</div>
            </div>

            <div className="calendarBody">
                {
                    createCalendarGrid()
                }
            </div>
        </div>
    )
}

export default Calendar
