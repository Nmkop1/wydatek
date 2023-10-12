'use client';
 
import { createSlice } from '@reduxjs/toolkit';





export const wynikSlice = createSlice({
    name: 'wynik',
    initialState: {
        sumaWydatkuMin: null,
        sumaWydatkuMax: null,
        sumaCzasu: null,
        formDataRedux: null,
        kcal :true

    },


    reducers: {
        daneDoWyniku: (state, action) => { 
            state.sumaWydatkuMin = action.payload.sumaWydatkuMin
            state.sumaWydatkuMax = action.payload.sumaWydatkuMax 
            state.sumaCzasu = action.payload.sumaCzasu
            state.formDataRedux = action.payload.formData
            state.kcal  = action.payload.kcal 
        },
    }
})

export const { daneDoWyniku } = wynikSlice.actions;
export default wynikSlice.reducer;