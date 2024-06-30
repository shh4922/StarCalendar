import { Item } from "../../Model/WeatherResponse";
import "./weatherCard.scss"

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

const renderWeatherItem = (item: {category: string, fcstValue: string}) => {
    
    switch (item.category) {
        case 'SKY':
            return <p>하늘 상태: {item.fcstValue === '1' ? '맑음' : item.fcstValue === '3' ? '구름 많음' : '흐림'}</p>;
        case 'PTY':
            return <p>강수 형태: {item.fcstValue === '0' ? '없음' : item.fcstValue === '1' ? '비' : item.fcstValue === '2' ? '비/눈' : '눈'}</p>;
        case 'REH':
            return <p>습도: {item.fcstValue}%</p>;
        case 'T1H':
            return <p>기온: {item.fcstValue}°C</p>;
        // 필요한 카테고리에 대한 추가 로직을 여기에 작성
        default:
            return <p>{item.category}: {item.fcstValue}</p>;
    }
}
const renderWeatherItem2 = (item:[]) => {
    
    
}

/**
 * fcstDate = 20240630 
 * data = [{1000: [1,2,3,4]}, {1100}]
 */
const WeatherCard: React.FC<WeatherCardProps> = ({ fcstDate, weatherData }) => {
    const sortedData = Object.keys(weatherData).sort()
    console.log(weatherData)
    console.log(sortedData)
    
    return (
        <div className="weatherCard">
            <p className="date">{fcstDate}</p>
            
            <div className="weatherContent">
                
                {
                    
                    
                    sortedData.map((fcstTime) => {
                        
                        return (
                            <div className="weather" key={fcstTime}>
                                <p>{fcstTime}</p>
                                
                            </div>
                        )
                        
                    })
                }
            </div>
        </div>
    );
};


export default WeatherCard;