'use client';
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';





export const counterSlice = createSlice({
    name: 'tablicaCzynnosci',
    // initialState: [],
    initialState: [{
        id: '0f0dd695-c298-4375-9214-da5f01f7bbd8',
        jedenWydatekMin: '231.0',
        jedenWydatekMax: '351.1',
        nazwaCzynnosci: 'sdsd',
        czas: '44',
        partiaCialaValue: [2.5, 3.8, 'palce, ręce, przedramiona, średnia'],
        postawaValue: [2.1, 'klęcząca']
    }],


    reducers: {
        dodawanieCzynnosci(state, action) {

            const nowaCzynnosc = {
                id: uuidv4(),
                jedenWydatekMin: action.payload.jedenWydatekMin,
                jedenWydatekMax: action.payload.jedenWydatekMax,
                nazwaCzynnosci: action.payload.nazwaCzynnosci,
                czas: action.payload.czas,
                postawaValue: action.payload.postawaValue,
                partiaCialaValue: action.payload.partiaCialaValue

            };

            return [...state, nowaCzynnosc]

        },
        deleteCzynnosci(state, action) {
            return state.filter((item) => item.id !== action.payload);


        }
    }
})

export const { dodawanieCzynnosci, deleteCzynnosci } = counterSlice.actions;

export default counterSlice.reducer;