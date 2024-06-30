import { Item } from "../../Model/WeatherResponse";
import "./weatherCard.scss"
interface WeatherCardProps {
    date: string;
    data: { [time: string]: Item[] };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ date, data }) => {
    // const filteredData = data[date];
    // const sortedTimes = Object.keys(filteredData).sort((a, b) => parseInt(a) - parseInt(b));
    const sortedData = Object.keys(data).sort()
    console.log(sortedData)
    return (
        <div className="weatherCard">
            <h2>{date}</h2>
            {
                sortedData.map((d) => {
                    return (
                        <div key={d}>
                            <h3>{d}</h3>
                            {data[d].map((item, index) => (
                                <div key={index}>
                                    <p>{item.category}: {item.fcstValue}</p>
                                </div>
                            ))}
                        </div>
                        
                    )
                })
            }


        </div>
    );
};


export default WeatherCard;