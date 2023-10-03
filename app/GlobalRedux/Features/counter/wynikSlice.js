'use client';
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';





export const wynikSlice = createSlice({
    name: 'wynik',
    initialState: {
        sumaWydatkuMin: null,
        sumaWydatkuMax: null,
        sumaCzasu: null,
        formData: null

    },


    reducers: {
        daneDoWyniku: (state, action) => {
 
             state.sumaWydatkuMin = action.payload.sumaWydatkuMin
            state.sumaWydatkuMax = action.payload.sumaWydatkuMax 
            state.sumaCzasu = action.payload.sumaCzasu
            state.formData = action.payload.formData
        },
    }
})

export const { daneDoWyniku } = wynikSlice.actions;
export default wynikSlice.reducer;