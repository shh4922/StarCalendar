import { useAir } from "../../apis/air/query"
import "./air.scss"
export default function Air() {
    
    const { data: airData } = useAir()
    function formatteRegionStringToAry(data: string) {
        const regionAirAry = data.split(',').map(item => {
            const [region, grade] = item.split(' : ').map(str => str.trim());
            return { region, grade };
        });
        return regionAirAry
    }
    const getGradeClass = (grade:string) => {
        switch (grade) {
            case '좋음':
                return 'blue';
            case '보통':
                return 'green';
            case '나쁨':
                return 'orange';
            case '매우나쁨':
                return 'red'
            default:
                return '';
        }
    };
    
    return (
        <div className="resultInfo">
                {
                    airData && (
                        <>
                        <div className="airBox">
                            <p className="airDate">{airData[0].informData}</p>
                            <div className="infoResults">
                            {
                                formatteRegionStringToAry(airData[0].informGrade).map((date) => {
                                    return (
                                        <div key={`${date.region}${airData[0].informData}`} className="info">
                                            <p className="airRegion">{date.region}</p>
                                            <p className={`airResult ${getGradeClass(date.grade)}`}>{date.grade}</p>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            
                        </div>
                        <hr></hr>
                        <div className="airBox">
                            <p className="airDate">{airData[1].informData}</p>
                            <div className="infoResults">
                            {
                                formatteRegionStringToAry(airData[1].informGrade).map((date) => {
                                    return (
                                        <div key={`${date.region}${airData[1].informData}`} className="info">
                                            <p className="airRegion">{date.region}</p>
                                            <p className={`airResult ${getGradeClass(date.grade)}`}>{date.grade}</p>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            
                        </div>
                        </>
                    )
                }
            </div>
    )
}