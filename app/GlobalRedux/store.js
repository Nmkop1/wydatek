'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import userReducer from './Features/counter/userSlice';
import wynikReducer from './Features/counter/wynikSlice';
import loadingReducer from './Features/counter/loadingSlice';
export const store = configureStore({
    reducer: {
        tablicaCzynnosci: counterReducer,
        user: userReducer,
        wynik: wynikReducer,
        loading: loadingReducer
    }
})

 