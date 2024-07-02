import axios from "axios";
import { AirResponse } from "./model.type";

export const fetchAir = async (): Promise<AirResponse> => {
    
    const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${import.meta.env.VITE_AIR_KEY}`
    const params = {
        returnType: "json",
        numOfRows: 100,
        pageNo: 1,
        searchDate: getCurrentDate(),
        informCode: "PM10"
    }
    const result = await axios.get(url, { params })
    return result.data
}

export function getCurrentDate():string {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2,'0');
    const formattedDate = `${year}-${month}-${day}`    
    return formattedDate
}