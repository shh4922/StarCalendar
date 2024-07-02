import { ChangeEvent } from "react";
import { setCueentDate, setYear } from "../../redux/calendar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppDispatch, RootState } from "../../redux/store";
import regionData from "../../assets/region.json"
import WeatherCard from "../WeatherCard/WeatherCard";
import { useSelector } from "react-redux";
import { setCity, setDistrict } from "../../redux/region";
import { useWeather } from "../../apis/weather/query";
import "./weatherBar.scss"
import { SyncLoader } from "react-spinners";




export default function WeatherBar() {
    const dispatch = useAppDispatch<AppDispatch>()
    const year = useAppSelector((state: RootState) => state.calendar.year);
    const city = useSelector((state: RootState) => state.region.city);
    const district = useSelector((state: RootState) => state.region.district);

    const { data: weathers, isLoading } = useWeather()
    
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
                <section className="yearSection">
                    <button onClick={() => dispatch(setYear(year - 1))}>{"<"}</button>
                    <p onClick={()=>dispatch(setCueentDate())}>{year}</p>
                    <button onClick={() => dispatch(setYear(year + 1))}>{">"}</button>
                </section>
                <section className="regionSection">

                    <select onChange={handleCityChange} value={city}>
                        <option value="">선택하세요</option>
                        {regionData.region.map(region => (
                            <option key={region.city} value={region.city}>{region.city}</option>
                        ))}
                    </select>



                    <select onChange={handleDistrictChange} value={district}>
                        <option value="">선택하세요</option>
                        {city &&
                            regionData.region.find(region => region.city === city)?.districts.map(district => (
                                <option key={district.district} value={district.district}>{district.district}</option>
                            ))
                        }
                    </select>

                </section>
            </div>
            <div className="leftBody">
                {isLoading ? (
                    <div className="loading">
                        <SyncLoader
                            loading={isLoading}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <p>날씨 지금 가고있어요~</p>
                    </div>

                ) : (!city || !district) ? (
                    <p className="requetSelect">지역을 설정하면 날씨를 확인 가능합니다!</p>
                ) : (
                    weathers && Object.keys(weathers).map((date) => (
                        <WeatherCard key={date} fcstDate={date} weatherData={weathers[date]} />
                    ))
                )}
            </div>

        </section>
    )
}
