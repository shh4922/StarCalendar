import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from "./calendar"
import regionReducer from "./region"

const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        region: regionReducer
    },
  })

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store