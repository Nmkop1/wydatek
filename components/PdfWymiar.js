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
    const { liczenieWymiaru, wyliczenie, wGodzinach, etat1, etat2, hourDay, niepelnosprawni, firstJob, dataPocz, dataKon, wymiar, firstJobTime, etat, miesiace, normaCzasu } = useSelector(state => state.wymiar)



    return (
        <PDFViewer style={styles.viewer}>
            <Document >
                <Page size="A4"  >
                    {liczenieWymiaru && etat1 && etat2 && hourDay ?
                        <View style={styles.table}>
                            <View style={{ fontSize: "12px", width: "100%", display: "flex", alignItems: "flex-end", }}>
                                <Text>Data: {day}.{month}.{year}</Text>
                            </View>
                            <View >
                                <View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Roboto", fontSize: "24px", paddingTop: "50px", paddingBottom: "30px" }}>
                                    <Text style={styles.page}>Kalkulator wymiaru urlopu</Text>
                                </View>
                                <View style={{ padding: "0 0 0 24", }} >


                                    <Text style={{ padding: "8 0 8 0", fontFamily: "Roboto", }}>Roczny wymiar: {wymiar} </Text>
                                    <Text style={{ padding: "8 0 8 0", fontFamily: "Roboto" }}>Data początkowa: {dataPocz.nowDay}.{dataPocz.nowMonth + 1}.{dataPocz.nowYear} r. </Text>
                                    <Text style={{ padding: "8 0 8 0", fontFamily: "Roboto" }}>Data końcowa:  {dataKon.endDay}.{dataKon.endMonth + 1}.{dataKon.endYear} r.</Text>
                                    <Text style={{ padding: "8 0 8 0", fontFamily: "Roboto" }}>Etat: {etat1}/{etat2}  </Text>
                                    <Text style={{ padding: "8 0 8 0", fontFamily: "Roboto" }}>Wymiar czasu pracy: {hourDay} godz. </Text>
                                    <Text style={{ padding: "8 0 8 0", fontFamily: "Roboto" }}>Pierwsza praca: {firstJob ? "TAK" : "NIE"}  </Text>
                                </View>
                            </View>

                            <View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Roboto", fontSize: "24px", paddingTop: "50px", paddingBottom: "30px" }}>
                                {firstJob ?
                                    <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap:"wrap" }}>
                                        {etat === 1 ?
                                            <Text>
                                                {wGodzinach ? `1/12 x ${wymiar} dni x ${firstJobTime} mies. x ${hourDay} godzin =` : ` 1/12 x ${wymiar} dni x ${firstJobTime} mies. = `}
                                            </Text>
                                            :
                                            <Text>

                                                {wGodzinach ? `1/12 x ${wymiar} dni x ${etat1}/${etat2} etatu x ${firstJobTime} mies. x ${hourDay} godzin  = ` : `1/12 x ${wymiar} dni x ${etat1}/${etat2} etatu x ${firstJobTime} mies.  = `}
                                            </Text>
                                        }
                                   
                                            <Text>
                                                {` ${wyliczenie} ${wGodzinach ? "godzin" : "dni"} urlopu`}
                                            </Text>
                                        

                                    </View>
                                    :
                                    <View style={{ width: "100%", display: "flex", flexDirection:"row" ,justifyContent: "center", alignItems: "center",    }}>
                                        {etat === 1 ?
                                          
                                                <Text>
                                                    {wGodzinach ? ` ${wyliczenie / normaCzasu}  dni x ${normaCzasu} godzin (norma) =` : `${miesiace}/12 x ${wymiar} dni = `}
                                                </Text>
                                          

                                            :
                                            <Text>
                                                {wGodzinach ? `${(Math.ceil((wymiar) * (miesiace / 12)))} dni x ${etat1}/${etat2} etatu  x ${normaCzasu} godz. (norma) =  ` : `${wymiar} dni x ${etat1}/${etat2} etatu x  ${miesiace}/12  =  `}
                                            </Text>
                                        }


                                        {etat === 1
                                            ?
                                        
                                            <Text style={{ fontSize:"26px" ,   fontWeight:'bold'}}>
                                                {`${wyliczenie} ${wGodzinach ? "godzin" : "dni"} urlopu `}
                                            </Text>
                                          


                                            :

                                            wGodzinach ?
                                                
                                                    <Text>{
                                                        `${wyliczenie} ${wGodzinach ? "godzin" : "dni"}  urlopu  `}
                                                    </Text>
                                               

                                                :
                                                <View  >
                                                    <Text>
                                                        {`${wyliczenie} dni urlopu `}
                                                    </Text>
                                                    <Text>{`(po ${hourDay} godzin)`}  </Text>
                                                </View>

                                        }


                                    </View>
                                }
                            </View>







                        </View> :
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <Text style={{ fontSize: 36, fontWeight: 600, }}>Brak danych</Text>
                        </View>
                    }
                    <View style={{ fontFamily: "Roboto", fontSize: "12px", position: "absolute", bottom: "10px", left: "45%", flexDirection: 'row', width: "100%", }}>
                        <Text>praca-info</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>

    )
};
export default Pdf

