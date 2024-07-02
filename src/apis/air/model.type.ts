export interface AirResponse {
    response: {
        header: {
            "resultCode": string,
            "resultMsg": string
        }
        body: {
            "items": [AirDetail]
        }
    }
}


export interface AirDetail {
    "informData": string
    "informGrade": string
    
}
