import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
    table: {
        width: '100%',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
    },
    header: {
        borderTop: 'none',
    },
    bold: {
        fontWeight: 'bold',
    },
    // So Declarative and unDRY 👌
    row1: {
        width: '27%',
    },
    row2: {
        width: '15%',
    },
    row3: {
        width: '15%',
    },
    row4: {
        width: '20%',
    },
    row5: {
        width: '27%',
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
})


// Create Document Component
const Pdf = ({ tablicaCzynnosci }) => {
    return (
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size="A4" >
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.row1}>Name</Text>
                            <Text style={styles.row2}>Start Date</Text>
                            <Text style={styles.row3}>End Date</Text>
                            <Text style={styles.row4}>Days</Text>
                            <Text style={styles.row5}>Info</Text>
                        </View>
                        {tablicaCzynnosci.map((row, i) => (
                            <View key={i} style={styles.row} wrap={false}>
                                <Text style={styles.row1}>
                                    <Text style={styles.bold}>sdf</Text>, sdf
                                </Text>
                                <Text style={styles.row2}>ew</Text>
                                <Text style={styles.row3}>rwer</Text>
                                <Text style={styles.row4}>
                                    <Text style={styles.bold}>wer</Text> of{' '}
                                    wer
                                </Text>
                                <Text style={styles.row5}>wer</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            </Document>
        </PDFViewer>

    )
};
export default Pdf


// import React, { Fragment, useEffect, useState } from "react";
// import {
//     Document,
//     Page,
//     Text,
//     View,
//     StyleSheet,
//     PDFViewer,
// } from "@react-pdf/renderer";
// // Create styles
// const styles = StyleSheet.create({
//     page: {


//     },
//     section: {
//         margin: 10,
//         padding: 10,

//     },
//     viewer: {
//         width: window.innerWidth, //the pdf viewer will take up all of the width and height
//         height: window.innerHeight,
//     },
// });
// const tableData = {
//     column: [
//         "price",
//         "email",
//         "time"
//     ],
//     data: [
//         {
//             price: "fdgd",
//             email: 3,
//             time: 54
//         },
//         {
//             price: 44,
//             email: 44,
//             time: 44
//         }
//     ]
// }


// // Create Document Component
// const Pdf = ({ sumaWydatku, tablicaCzynnosci }) => {

//     const styles = StyleSheet.create({
//         rowView: {
//             display: 'flex', flexDirection: 'row', borderTop: '1px solid #EEE', paddingTop: 8, paddingBottom: 8, textAlign: "center"
//         }
//     });

//     // useEffect(() => {
//     //     if (tablicaCzynnosci !== undefined) setTableData(tablicaCzynnosci);
//     // }, []);
//     return (
//         <PDFViewer style={styles.viewer}   >
//             {/* Start of the document*/}
//             <Document>
//                 {/*render a single page*/}
//                 <Page size="A4" style={styles.page}>

//                     <>
//                         {tableData &&
//                             (
//                                 <Fragment  >
//                                     <View style={styles.rowView}>
//                                         {tableData["column"].map((c) => <Text style={{
//                                             width: `${100 / tableData["column"].length}%`
//                                         }}>{c}</Text>)}
//                                     </View>
//                                     {tableData["data"].map((rowData) => <>
//                                         <View style={styles.rowView}>
//                                             {tableData["column"].map((c) =>
//                                                 <Text style={{ width: `${100 / tableData["column"].length}%` }}>{rowData[c]}</Text>
//                                             )}
//                                         </View>
//                                     </>)}
//                                 </Fragment>
//                             )}
//                     </>

//                 </Page>
//             </Document>
//         </PDFViewer>)
// };
// export default Pdf