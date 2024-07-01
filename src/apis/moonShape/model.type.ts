export interface MoonShapeResponse {
    response: ShapeResponse
}
export interface MoonRiseResponse {
    response: MoonRise
}

interface ShapeResponse {
    header: {
        "resultCode": string,
        "resultMsg": string
    }
    body: {
        "items": {
            "item": [MoonShapeItem]
        }
    }
}
interface MoonRise {
    header: {
        "resultCode": string,
        "resultMsg": string
    }
    body: {
        "items": {
            "item": [MoonRiseInfo]
        }
    }
}

export interface MoonShapeItem {
    "lunAge": string
    "solDay": string
    "solMonth": string
}


export interface MoonRiseInfo {
    "moonrise": string
    "moonset": string
    
}
