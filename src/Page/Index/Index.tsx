import { ChangeEvent, useEffect, useState } from 'react'
import "./index.scss"
import axios from 'axios'
import regionData from "../../assets/region.json"
import WeatherResponse, { Item } from '../../Model/WeatherResponse'
import WeatherCard from '../../Components/WeatherCard/WeatherCard'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useAppDispatch } from '../../redux/hooks'
import { setYear, setMonth, increaseMonth, decreaseMonth } from '../../redux/calendar'
import WeatherBar from '../../Components/WeatherBar/WeatherBar'

// 데이터를 날짜와 시간별로 분류할 객체 타입 정의
interface ClassifiedData {
    [date: string]: {
        [time: string]: Item[];
    };
}

function Index() {
    const dispatch = useAppDispatch<AppDispatch>()
    const year = useSelector((state: RootState) => state.calendar.year);
    const month = useSelector((state: RootState) => state.calendar.month);


    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const cities = [...new Set(regionData.region.map(item => item.city))];
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedCoordinates, setSelectedCoordinates] = useState<{ x: number, y: number } | null>(null)
    const [districts, setDistricts] = useState<string[]>([]);

    const [fD, setFD] = useState<ClassifiedData>({})

    const categoriesToFilter = ["TMP", "SKY", "POP", "PTY", "PCP", "SNO"];

    // useEffect(() => {
    //     fetchWeather()

    // }, [selectedCoordinates])

    

    function filterWeather(datas: WeatherResponse) {
        const filteredData = datas.response.body.items.item.filter(item => categoriesToFilter.includes(item.category));

        // 날짜별로 필터링 한번
        // 시간별로 필터링 한번
        // 해당 시간에있는, 날씨, 온도, 강수, 눈여부등 체그하여 리턴
        const classifiedData: ClassifiedData = {};

        filteredData.forEach(item => {
            if (!classifiedData[item.fcstDate]) {
                classifiedData[item.fcstDate] = {};
            }
            if (!classifiedData[item.fcstDate][item.fcstTime]) {
                classifiedData[item.fcstDate][item.fcstTime] = [];
            }
            classifiedData[item.fcstDate][item.fcstTime].push(item);
        });

        // 각 날짜에 대해 시간별로 정렬
        for (const date in classifiedData) {
            const times = Object.keys(classifiedData[date]).sort();
            const sortedDataByTime: { [time: string]: Item[] } = {};
            times.forEach(time => {
                sortedDataByTime[time] = classifiedData[date][time];
            });
            classifiedData[date] = sortedDataByTime;
        }

        setFD(classifiedData)
        // console.log(Object.keys(classifiedData))
        // return classifiedData;
    }

    const createCalendarGrid = () => {
        let days = [];

        // 이전달의 총 일수
        const prevDaysInMonth = new Date(year, month, 0).getDate();

        // 이전달 날짜 추가
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            // days.push(prevDaysInMonth - i);
            days.push(<div className="prevDays">{prevDaysInMonth - i}</div>);
        }

        // 현재 월 날짜 추가
        for (let d = 1; d <= daysInMonth; d++) {
            // days.push(d);
            days.push(<div className="days">{d}</div>);
        }

        // 마지막 주가 7일이 되도록 빈 칸 추가
        if (days.length % 7 === 0) {
            return days
        }

        for (let i = 1; i < 7; i++) {
            if (days.length % 7 !== 0) {
                // days.push(i)
                days.push(<div className="nextDays">{i}</div>);
            } else {
                break
            }
        }

        return days;
    };

    return (
        <article className="home">
            <WeatherBar />

            <section className="homeLight">
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

                <div className="resultInfo">
                    <p>현재 <strong>"광주"</strong> 의 관측가능 날짜는</p>
                    <p>29, 30, 31 로 예상됩니다.</p>
                </div>
            </section>

        </article>
    );
}
export default Index