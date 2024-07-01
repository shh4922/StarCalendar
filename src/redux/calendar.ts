import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface calendarInitalProps {
    year: number;
    month: number;
}

const initialState: calendarInitalProps = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: initialState,
    reducers: {
        setYear(state, action: PayloadAction<number>) {
            state.year = action.payload;
        },
        increaseMonth(state) {
            
            const newMonth = state.month + 1
            console.log(`올리기 이전 상태 ${state.month} 올린후상태:${newMonth}`)
            if (newMonth === 12) {
                state.month = 0
                state.year += 1
            } else {
                state.month = newMonth
            }
        },
        decreaseMonth(state) {
            const newMonth = state.month - 1
            if (newMonth === -1) {
                state.month = 11
                state.year -= 1
            } else {
                state.month = newMonth
            }
        },
        // setMonth(state, action: PayloadAction<number>) {
        //     state.month = action.payload;
        // },
    }
})

export const {setYear, increaseMonth, decreaseMonth} = calendarSlice.actions
export default calendarSlice.reducer;