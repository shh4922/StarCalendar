export default interface WeatherResponse {
    response: responseI
}
interface responseI {
    header: {
        "resultCode": string,
        "resultMsg": string
    }
    body: {
        "dataType": string,
        "items": {
            "item": [Item]
        }
    }
}

export interface Item {
    "baseDate": string
    "baseTime": string
    "category": string
    "fcstDate": string
    "fcstTime": string
    "fcstValue": string
    "nx": number
    "ny": number
}

export interface ClassifiedData {
    [date: string]: {
        [time: string]: Item[];
    };
}