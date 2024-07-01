import axios from "axios"
import store, { RootState } from "../../redux/store"
import { MoonRiseResponse, MoonShapeResponse } from "./model.type"

export const fetchMoonShape = async (): Promise<MoonShapeResponse> => {
    const state: RootState = store.getState()
    const selectedYear = state.calendar.year
    const selectedMonth = String(state.calendar.month + 1).padStart(2, '0');
    
    const url = `https://apis.data.go.kr/B090041/openapi/service/LunPhInfoService/getLunPhInfo?serviceKey=${import.meta.env.VITE_MOONSHAPE_KEY}`
    const params = {
        solYear: `${selectedYear}`,
        solMonth: `${selectedMonth}`,
        numOfRows: "31"
    }
    const result = await axios.get(url, { params })
    return result.data
}

export const fetchMoonRise = async (): Promise<MoonRiseResponse> => {
    const state: RootState = store.getState()
    const selectedYear = state.calendar.year
    const selectedMonth = String(state.calendar.month + 1).padStart(2, '0');

    const url = `https://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getAreaRiseSetInfo?ServiceKey=${import.meta.env.VITE_MOONRISE_KEY}`
    const params = {
        locdate: `${selectedYear}${selectedMonth}`,
        location: "서울",
        numOfRows: "31"
    }
    const result = await axios.get(url,{params})
    return result.data
}