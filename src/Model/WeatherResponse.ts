export default interface WeatherResponse {
    response: responseI
}
interface responseI {
    "header": Header
    "body": Body
}
interface Header {
    "resultCode": string,
    "resultMsg": string
}

interface Body {
    "dataType": string,
    "items": Items
}

interface Items {
    "item": [Item]
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

