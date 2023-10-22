'use client';

import { createSlice } from '@reduxjs/toolkit';





export const wymiarSlice = createSlice({
    name: 'wymiar',
    initialState: {
        liczenieWymiaru: null,
        wGodzinach: null,
        etat1: null,
        etat2: null,
        hourDay: 8,
        niepelnosprawni: null,
        firstJob: false,
        dataPocz:null,
        dataKon:null,
       wymiar:null,
        firstJobTime:null,
        etar:1,
        miesiace: null,
        wyliczenie:null,
        normaCzasu:8

    },


    reducers: {
        daneWymiaru: (state, action) => {
            state.liczenieWymiaru = action.payload.liczenieWymiaru
            state.wGodzinach = action.payload.wGodzinach
            state.etat1 = action.payload.etat1
            state.etat2 = action.payload.etat2
            state.hourDay = action.payload.hourDay
            state.niepelnosprawni = action.payload.niepelnosprawni
            state.firstJob = action.payload.firstJob
            state.dataPocz = action.payload.dataPocz
            state.dataKon = action.payload.dataKon
            state.wymiar = action.payload.wymiar
            state.firstJobTime = action.payload.firstJobTime
            state.etat = action.payload.etat
            state.miesiace = action.payload.miesiace
            state.wyliczenie = action.payload.wyliczenie
            state.normaCzasu = action.payload.normaCzasu
        },
    }
})

export const { daneWymiaru } = wymiarSlice.actions;
export default wymiarSlice.reducer;