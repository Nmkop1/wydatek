'use client';
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';



 

export const counterSlice = createSlice({
    name: 'tablicaCzynnosci',
    initialState: [],
 
    reducers: {
        dodawanieCzynnosci(state, action) {          
            const nowaCzynnosc = {
                id: uuidv4(),
                jedenWydatek: action.payload.jedenWydatek,
                czas: action.payload.czas,
                postawaValue: action.payload.postawaValue,
                partiaCialaValue: action.payload.partiaCialaValue

            };

            return [...state, nowaCzynnosc];

        }
    }
})

export const { dodawanieCzynnosci } = counterSlice.actions;

export default counterSlice.reducer;