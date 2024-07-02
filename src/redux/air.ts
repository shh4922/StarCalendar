import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import regionData from "../assets/region.json"

export interface airInitalProps {
    city: string;
    district: string;
    coordinator: { x: number, y: number } | null
}

const initialState: airInitalProps = {
    city: "",
    district: "",
    coordinator: null
};

export const regionSlice = createSlice({
    name: 'region',
    initialState: initialState,
    reducers: {
        setCity(state, action: PayloadAction<string>) {
            state.city = action.payload
            state.district = ''
            state.coordinator = null
        },
        setDistrict(state, action: PayloadAction<string>) {
            state.district = action.payload
            const selectedDistrictInfo = regionData.region.find(region => region.city === state.city)
                ?.districts.find(district => district.district === state.district)
            if (selectedDistrictInfo) {
                state.coordinator = { x: selectedDistrictInfo.x, y: selectedDistrictInfo.y }
            } else {
                state.coordinator = null
            }
            
        },


    }
})

export const { setCity, setDistrict } = regionSlice.actions
export default regionSlice.reducer;