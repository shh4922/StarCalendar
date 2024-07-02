import axios from "axios"
import WeatherResponse, { Item } from "../../Model/WeatherResponse"
import store from "../../redux/store"
import { RootState } from "../../redux/store"
import { ClassifiedData } from "./model.type";

/**
 * SKY: 하늘상태 (1: 맑음, 3: 구름많음, 4: 흐림)
 * PTY: 강수형태 (0: 없음, 1: 비, 2:비/눈, 3:눈, 4:소나기)
 * REH: 습도 %
 * WSD: 풍속 m/s
 */

const categoriesToFilter = ["SKY", "REH", "PTY", "WSD"];

// API 업데이트 시간 3시간 간격
// 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10

// fetch
export const fetchWeather = async (): Promise<WeatherResponse> => {
    const currentState: RootState = store.getState()
    const coordinator = currentState.region.coordinator
    const dateTime = getNearestPastDateTime()
    if (coordinator === null) {
        throw new Error("coordinator are not seleceted!")
    }
    const params = {
        pageNo : 1,
        numOfRows : 1000,
        dataType : "JSON",
        base_date : dateTime.base_date,
        base_time : dateTime.base_time,
        nx : coordinator.x,
        ny : coordinator.y
    }

    const BaseURL = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${import.meta.env.VITE_WEATHER_KEY}`
    const result = await axios.get<WeatherResponse>(BaseURL, {params})
    
    return result.data
}

// fetch 후 데이터 분류sd
export function filterAndSortedWeather(datas: WeatherResponse): ClassifiedData {
    const filteredData = datas.response.body.items.item.filter(item => categoriesToFilter.includes(item.category));
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

    for (const date in classifiedData) {
        const times = Object.keys(classifiedData[date]).sort();
        const sortedDataByTime: { [time: string]: Item[] } = {};
        times.forEach(time => {
            sortedDataByTime[time] = classifiedData[date][time];
        });
        classifiedData[date] = sortedDataByTime;
    }
    console.log(classifiedData)
    return classifiedData
}

function getNearestPastDateTime(): { base_date: string, base_time: string } {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const timeSlots = [
        { hour: 2, minute: 10, formatted: '0200' },
        { hour: 5, minute: 10, formatted: '0500' },
        { hour: 8, minute: 10, formatted: '0800' },
        { hour: 11, minute: 10, formatted: '1100' },
        { hour: 14, minute: 10, formatted: '1400' },
        { hour: 17, minute: 10, formatted: '1700' },
        { hour: 20, minute: 10, formatted: '2000' },
        { hour: 23, minute: 10, formatted: '2300' }
    ];

    let selectedSlot = timeSlots[timeSlots.length - 1]; // 기본값: 마지막 시간대

    // 현재 시간보다 이전인 가장 가까운 시간대를 찾습니다.
    for (let i = timeSlots.length - 1; i >= 0; i--) {
        const slot = timeSlots[i];
        if (hours > slot.hour || (hours === slot.hour && minutes >= slot.minute)) {
            selectedSlot = slot;
            break;
        }
    }

    // 현재 시간이 지정된 모든 시간대 이전이라면 날짜를 전날로 설정합니다.
    const selectedDate = new Date(now);
    if (selectedSlot === timeSlots[timeSlots.length - 1] && (hours < 2 || (hours === 2 && minutes < 10))) {
        selectedDate.setDate(now.getDate() - 1);
        
    }

    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.getDate()).slice(-2);
    const formattedDate = `${year}${month}${day}`;
    
    return {
        base_date: formattedDate,
        base_time: selectedSlot.formatted
    };
}