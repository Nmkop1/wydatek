'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import userReducer from './Features/counter/userSlice';
export const store = configureStore({
    reducer: {
        tablicaCzynnosci: counterReducer,
        user: userReducer,
    }
})

 