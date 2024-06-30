import { ChangeEvent } from "react";
import { setYear } from "../../redux/calendar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppDispatch, RootState } from "../../redux/store";
import regionData from "../../assets/region.json"
import WeatherCard from "../WeatherCard/WeatherCard";
import { useSelector } from "react-redux";
import { setCity, setDistrict } from "../../redux/region";
import { useWeather } from "../../apis/weather/query";

export default function WeatherBar() {
    const dispatch = useAppDispatch<AppDispatch>()
    const year = useAppSelector((state: RootState) => state.calendar.year);
    const city = useSelector((state: RootState) => state.region.city);
    const district = useSelector((state: RootState) => state.region.district);
    
    const { data: weathers } = useWeather()
    console.log(weathers)
    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const city = event.target.value;
        dispatch(setCity(city))
    };

    const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const districtName = event.target.value;
        dispatch(setDistrict(districtName))
    };

    return (
        <section className="homeLeft">
            <div className="leftHead">
                <button onClick={() => dispatch(setYear(year + 1))}>{"<"}</button>
                <p>{year}</p>
                <button onClick={() => dispatch(setYear(year - 1))}>{">"}</button>
            </div>
            <div className="leftBody">
                <div>
                    <label>
                        시:
                        <select onChange={handleCityChange } value={city}>
                            <option value="">선택하세요</option>
                            {regionData.region.map(region => (
                                <option key={region.city} value={region.city}>{region.city}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        구:
                        <select onChange={handleDistrictChange} value={district}>
                            <option value="">선택하세요</option>
                            {city &&
                                regionData.region.find(region => region.city === city)?.districts.map(district => (
                                    <option key={district.district} value={district.district}>{district.district}</option>
                                ))
                            }
                        </select>
                    </label>
                </div>
            </div>
            <div className='weatherContent'>
                {
                    weathers && Object.keys(weathers).map((date) => {
                        return (
                            <WeatherCard fcstDate={date} weatherData={weathers[date]} />
                        )
                    })
                }
            </div>
        </section>
    )
}
