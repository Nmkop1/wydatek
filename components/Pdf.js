'use client'
import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Font
} from "@react-pdf/renderer";
import { useSelector } from 'react-redux';
Font.register({
    family: "Roboto",
    fonts: [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf", fontWeight: 300 },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf", fontWeight: 500 },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 600 },
    ],
})

// Create styles
const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        backgroundColor: "#ffffff",
        padding: "24 0 8 0",
        fontWeight: 600,
    },
    table: {
        width: '100%',

        padding: "10px"
    },
    rowPasek: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: "14px",
        fontFamily: "Roboto",
        fontWeight: 600,
        color: "#fff",
        backgroundColor: "#757575"
    },
    rowPasekDolny: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: "14px",
        fontFamily: "Roboto",
        fontWeight: 400,
        backgroundColor: "#EEEEEE"
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: "14px",
        fontFamily: "Roboto",
        fontWeight: 600
    },
    header: {
        borderTop: 'none',
    },
    noBold: {
        fontWeight: 400
    },

    // So Declarative and unDRY 👌
    row1: {
        width: '20%',
        paddingLeft: "1%"
    },
    row2: {
        width: '7%',
        textAlign: "center"
    },
    row3: {
        width: '10%',
        textAlign: "center"
    },
    row4: {
        width: '10%',
        textAlign: "center"
    },
    row5: {
        width: '19%',
        paddingRight: "10px",
        textAlign: "center"
    },
    row6: {
        width: '7%',
        textAlign: "center"
    },
    row7: {
        width: '7%',
        textAlign: "center"
    },
    row8: {
        width: '10%',
        textAlign: "center"
    },
    row9: {
        width: '10%',
        textAlign: "center"
    },
    // viewer: {
    //     width: window.innerWidth, //the pdf viewer will take up all of the width and height
    //     height: window.innerHeight,
    // },
    viewer: {
        width: "100%", //the pdf viewer will take up all of the width and height
        height: "100%",
    },
})


// Create Document Component
const Pdf = () => {

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    const { sumaCzasu, sumaWydatkuMin, sumaWydatkuMax, formData } = useSelector(state => state.wynik)
    const tablicaCzynnosci = useSelector(state => state.tablicaCzynnosci)


    return (
        <PDFViewer style={styles.viewer}>
            <Document >
                <Page size="A4" orientation="landscape">
                    {sumaCzasu && sumaWydatkuMin && sumaWydatkuMax && formData && tablicaCzynnosci ?
                        <View style={styles.table}>
                            <View style={{ fontSize: "12px", width: "100%", display: "flex", alignItems: "flex-end", }}>
                                <Text>Data: {day}.{month}.{year}</Text>
                            </View>
                            <View >
                                <Text style={styles.page}>Pomiar wydatku energetycznego metodą G. Lehmanna</Text>
                                <Text style={{ padding: "8 0 8 0" }}>Firma: {formData?.firma} </Text>
                                <Text style={{ padding: "8 0 8 0" }}>Stanowisko: {formData?.stanowisko} </Text>
                                <Text style={{ padding: "8 0 32 0" }}>Opis: {formData?.opis}</Text>
                            </View>
                            {/* ////////// */}
                            <View style={styles.rowPasek}>
                                <Text style={styles.row1}  >Nazwa czynności</Text>
                                <View style={styles.row2}>
                                    <Text >Czas </Text>
                                    <Text style={{ fontSize: "9px", fontWeight: 400 }}>
                                        [min]</Text>
                                </View>
                                <Text style={styles.row3}>Postawa</Text>
                                <View style={styles.row4}>
                                    <Text >Postawa </Text>
                                    <Text style={{ fontSize: "9px", fontWeight: 400 }}>
                                        [kJ/min]</Text>
                                </View>
                                <View style={styles.row5}>
                                    <Text >Partia ciała </Text>
                                    <Text > Ciężkość pracy</Text>
                                </View>
                                <View style={styles.row6}>
                                    <Text >Partia</Text>
                                    <Text style={{ fontSize: "12px" }}>min</Text>
                                    <Text style={{ fontSize: "9px", fontWeight: 400 }}>
                                        [kJ/min]</Text>
                                </View>
                                <View style={styles.row7}>
                                    <Text >Partia
                                    </Text>
                                    <Text style={{ fontSize: "12px" }}>
                                        max</Text>
                                    <Text style={{ fontSize: "9px", fontWeight: 400 }}>
                                        [kJ/min]</Text>
                                </View>
                                <View style={styles.row8}>
                                    <Text >Wydatek
                                    </Text>
                                    <Text style={{ fontSize: "12px" }}>
                                        min</Text>
                                    <Text style={{ fontSize: "9px", fontWeight: 400 }}>
                                        [kJ]</Text>
                                </View>
                                <View style={styles.row9}>
                                    <Text >Wydatek
                                    </Text>
                                    <Text style={{ fontSize: "12px" }}>
                                        max</Text>
                                    <Text style={{ fontSize: "9px", fontWeight: 400 }}>
                                        [kJ]</Text>
                                </View>
                            </View>
                            {/* /////// */}
                            {tablicaCzynnosci?.map((item, i) => (
                                <View key={i} style={styles.row} wrap={false}>
                                    <Text style={styles.row1}>
                                        <Text style={styles.noBold}>
                                            {item.nazwaCzynnosci}
                                        </Text>
                                    </Text>
                                    <Text style={styles.row2}>
                                        <Text style={styles.noBold}>
                                            {item.czas}</Text>
                                    </Text>
                                    <Text style={styles.row3}>
                                        <Text style={styles.noBold}>{item.postawaValue[1]}</Text>
                                    </Text>
                                    <Text style={styles.row4}>
                                        <Text style={styles.noBold}>
                                            {item.postawaValue[0]}
                                        </Text>
                                    </Text>
                                    <Text style={styles.row5}>
                                        <Text style={styles.noBold}>{item.partiaCialaValue[2]}</Text>
                                    </Text>
                                    <Text style={styles.row6}>
                                        <Text style={styles.noBold}>{item.partiaCialaValue[0]}</Text>
                                    </Text>
                                    <Text style={styles.row7}>
                                        <Text style={styles.noBold}>{item.partiaCialaValue[1]}</Text>
                                    </Text>
                                    <Text style={styles.row8}>
                                        <Text style={styles.noBold}>{item.jedenWydatekMin}</Text>
                                    </Text>
                                    <Text style={styles.row9}>
                                        <Text style={styles.noBold}>{item.jedenWydatekMax}</Text>
                                    </Text>
                                </View>
                            ))}
                            {/* ///////// */}
                            <View style={styles.rowPasekDolny}>
                                <View style={{ width: "17%" }}  > </View>
                                <View style={{ width: "13%", textAlign: "center", padding: "2px" }}  >
                                    <Text >{sumaCzasu[0] == 0 ? `${sumaCzasu[1]} min` : `${sumaCzasu[0]} godz ${sumaCzasu[1]} min`}
                                    </Text>
                                </View>
                                <View style={{ width: "7%" }}>   </View>
                                <View style={{ width: "7%" }}>   </View>

                            </View>
                            {/* ///////// */}
                            <View style={{ fontFamily: "Roboto", display: "flex", flexDirection: 'row', width: "100%", paddingTop: "20px" }}>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", width: "60%", }}>
                                    <Text style={{ fontSize: 30, fontWeight: 600, paddingRight: "6%", }}>Wydatek energetyczny</Text>
                                </View>
                                <View style={{ width: "40%", }}>
                                    <View style={{ display: "flex", flexDirection: 'row', width: "100%", }}>
                                        <View style={{ display: "flex", flexDirection: 'row', width: "35%", padding: "5 0 5 0 " }}>
                                            <Text style={{ fontSize: 14 }} >dla meżczyzn</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between", width: "65%", padding: "5 0 5 0 " }}>
                                            <Text style={{ fontSize: 10 }}>   min
                                                <Text style={{ fontSize: 15, fontWeight: 600 }} >  {sumaWydatkuMin} kJ
                                                </Text>
                                            </Text>
                                            <Text style={{ fontSize: 10 }}>max
                                                <Text style={{ fontSize: 15, fontWeight: 600 }} >  {sumaWydatkuMax} kJ
                                                </Text>
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: 'row', width: "100%", }}>
                                        <View style={{ display: "flex", flexDirection: 'row', width: "35%", padding: "5 0 5 0 " }}>
                                            <Text style={{ fontSize: 14 }} >dla kobiet</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between", width: "65%", padding: "5 0 5 0 " }}>
                                            <Text style={{ fontSize: 10 }}> min
                                                <Text style={{ fontSize: 15, fontWeight: 600 }} >  {(sumaWydatkuMin * .8).toFixed(1)} kJ
                                                </Text>
                                            </Text>
                                            <Text style={{ fontSize: 10 }}>max
                                                <Text style={{ fontSize: 15, fontWeight: 600 }} >  {(sumaWydatkuMax * .8).toFixed(1)} kJ
                                                </Text>
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        
                        </View> :
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <Text style={{ fontSize: 36, fontWeight: 600, }}>Brak danych</Text>
                        </View>
                    }
                    <View style={{ fontFamily: "Roboto", fontSize:"12px",  position: "absolute", bottom: "10px", left:"45%", flexDirection: 'row', width: "100%",   }}>
                        <Text>praca-info</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>

    )
};
export default Pdf

