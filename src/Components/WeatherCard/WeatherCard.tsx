import { Item } from "../../Model/WeatherResponse";
import "./weatherCard.scss"
import sun from "../../assets/WeatherImg/sun.png"
import cloud from "../../assets/WeatherImg/cloud.png"
import clouds from "../../assets/WeatherImg/clouds.png"
import rain from "../../assets/WeatherImg/rain.png"
import snow from "../../assets/WeatherImg/snow.png"
import snowAndRain from "../../assets/WeatherImg/snowAndRain.png"

/**
 * SKY: 하늘상태 (1: 맑음, 3: 구름많음, 4: 흐림)
 * PTY: 강수형태 (0: 없음, 1: 비, 2:비/눈, 3:눈, 4:소나기)
 * REH: 습도 %
 * WSD: 풍속 m/s
 */

interface WeatherCardProps {
    fcstDate: string;
    weatherData: { [time: string]: Item[] };
}

/**
 * 하늘상태, 강수, 습도, 풍속이 들어있는 배열 
 * 0: 풍속
 * 1: 하늘상태
 * 2: 강수형태
 * 3: 습도
 */

const renderWeatherItem2 = ( item: Item[]) => {
    // 강수
    switch (item[2].fcstValue) {
        case '0':
            if(item[1].fcstValue === '1') {
                return <img src={sun}></img>
            }
            if(item[1].fcstValue === '3') {
                return <img src={cloud}></img>
            }
            if(item[1].fcstValue === '4') {
                return <img src={clouds}></img>
            }
            return <img src={cloud}></img>
            break

        case "1":
            return <img src={rain}></img>
            break

        case "2":
            return <img src={snowAndRain}></img>
            break

        case "3":
            return <img src={snow}></img>
            break
        case "4":
            return <img src={rain}></img>
            break
        default:
            return <img src={sun}></img>
    }
}

/**
 * fcstDate = 20240630 
 * data = [{1000: [1,2,3,4]}, {1100}]
 */
const WeatherCard: React.FC<WeatherCardProps> = ({ fcstDate, weatherData }) => {
    const sortedData = Object.keys(weatherData).sort()

    return (
        <div className="weatherCard">
            <p className="date">{fcstDate}</p>

            <div className="weatherContent">
                {
                    sortedData.map((fcstTime,index) => {

                        return (
                            <div className="weather" key={index}>
                                <p>{`${fcstTime.slice(0, 2)}:${fcstTime.slice(2, 4)}`}</p>
                                {
                                    renderWeatherItem2(weatherData[fcstTime])
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};


export default WeatherCard;