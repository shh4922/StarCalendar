import { ChangeEvent, useState } from "react";
import { setYear } from "../../redux/calendar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppDispatch, RootState } from "../../redux/store";
import regionData from "../../assets/region.json"
import WeatherCard from "../WeatherCard/WeatherCard";
import WeatherResponse, { Item } from "../../Model/WeatherResponse";
import axios from "axios";

// 데이터를 날짜와 시간별로 분류할 객체 타입 정의
interface ClassifiedData {
    [date: string]: {
        [time: string]: Item[];
    };
}

export default function WeatherBar() {
    
    const dispatch = useAppDispatch<AppDispatch>()
    const year = useAppSelector((state:RootState) => state.calendar.year);
    
    const cities = [...new Set(regionData.region.map(item => item.city))];
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedCoordinates, setSelectedCoordinates] = useState<{ x: number, y: number } | null>(null)
    const [districts, setDistricts] = useState<string[]>([]);
    const [fD, setFD] = useState<ClassifiedData>({})

    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const city = event.target.value;
        setSelectedCity(city);
        const filteredDistricts = regionData.region.filter(item => item.city === city).map(item => item.district);
        setDistricts(filteredDistricts);
    };

    const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const dist = event.target.value
        setSelectedDistrict(dist)
        const selectedRegion = regionData.region.find(item => item.city === selectedCity && item.district === dist);
        if (selectedRegion) {
            const coordinate = { x: selectedRegion.x, y: selectedRegion.y }
            setSelectedCoordinates(coordinate)
        }
    }

    const fetchWeather = async () => {
        if (selectedCoordinates === null) {
            return
        }
        const key = import.meta.env.VITE_WEATHER_KEY
        const pageNo = 1
        const numOfRows = 1000
        const dataType = "JSON"
        const baseDate = 20240629
        const baseTime = "0500"
        const nx = selectedCoordinates.x
        const ny = selectedCoordinates.y
        const BaseURL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${key}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`
        const result = await axios.get<WeatherResponse>(BaseURL)
        return result
    }

    return (
        
        <section className="homeLeft">
                <div className="leftHead">
                    <button onClick={()=>dispatch(setYear(year+1))}>{"<"}</button>
                    <p>{year}</p>
                    <button onClick={()=>dispatch(setYear(year-1))}>{">"}</button>
                </div>
                <div className="leftBody">
                    <div>
                        <label>
                            시:
                            <select onChange={handleCityChange} value={selectedCity}>
                                <option value="">선택하세요</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            구:
                            <select onChange={handleDistrictChange} value={selectedDistrict}>
                                <option value="">선택하세요</option>
                                {
                                    selectedCity && (
                                        districts.map(district => (
                                            <option key={district} value={district}>{district}</option>
                                        ))
                                    )
                                }
                            </select>
                        </label>
                    </div>
                </div>
                <div className='weatherContent'>
                    {
                        Object.keys(fD).map((date) => {
                            return (
                                <WeatherCard date={date} data={fD[date]}/>
                            )
                        })
                    }

                </div>
            </section>
    )
}
