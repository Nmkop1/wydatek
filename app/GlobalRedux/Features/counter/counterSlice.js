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
                jedenWydatekMin:  action.payload.jedenWydatekMin,
                jedenWydatekMax: action.payload.jedenWydatekMax, 
                nazwaCzynnosci: action.payload.nazwaCzynnosci, 
                czas:  action.payload.czas   ,
                postawaValue: action.payload.postawaValue,
                partiaCialaValue: action.payload.partiaCialaValue

            };

            return [...state, nowaCzynnosc] 

        },
           deleteCzynnosci(state, action) {
               return state.filter((item) => item.id !== action.payload );
            

        }
    }
})
 
export const { dodawanieCzynnosci, deleteCzynnosci } = counterSlice.actions;
 
export default counterSlice.reducer;