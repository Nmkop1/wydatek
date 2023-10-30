"use client"
import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from 'react-redux';
import Datepicker from "react-tailwindcss-datepicker";
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { daneWymiaru } from '../GlobalRedux/Features/counter/wymiarSlice';

export default function Wymiar(props) {
    const router = useRouter()
    const dispatch = useDispatch();
    let months = 0
    let liczenieWymiaru = 0
    let etat = 1
    const obliczEkwiwalent = true
    const wymiarDobowyRef = useRef()
    const [state, setState] = useState({
        wGodzinach: false,
        flagaPrzekazanieEtatu: false,
        firstJob: false,
        wymiar: months,
        etat1: 1,
        etat2: 1,
        niepelnosprawni: false,
        hourDay: 8
    });
    const [value, setValue] = useState({ startDate: new Date(), endDate: new Date() });
    const selectedNowDate = new Date(value.startDate)
    const [valueEnd, setValueEnd] = useState({ startDate: new Date(), endDate: new Date() });
    const selectedEndDate = new Date(valueEnd.startDate)
    const normaCzasu = state.niepelnosprawni ? 7 : 8
    const handleChange = e => {// uzuskiwanie value uniwersalne
        const name = e.target.name;
        const type = e.target.type;

        setWidok(false)
        if (type === "text" || type === "select-one" || type === "number") {
            setState({ ...state, [name]: e.target.value });
        } else if (type === "checkbox") {
            setState({ ...state, [name]: e.target.checked });
        }
    };
    const [dodatkoweUstawienia, setDodatkoweUstawienia] = useState(false)
    const [widok, setWidok] = useState(false)
    const [miesiace, setMiesiace] = useState()
    const [wyliczenie, setWyliczenie] = useState(0)

    // const [selectedNowDate, setSelectedNowDate] = useState(new Date());
    // const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const nowYear = new Date(selectedNowDate).getFullYear();
    const endYear = new Date(selectedEndDate).getFullYear();
    const nowMonth = new Date(selectedNowDate).getMonth()

    const endMonth = new Date(selectedEndDate).getMonth()
    const nowDay = new Date(selectedNowDate).getDate()
    const endDay = new Date(selectedEndDate).getDate()
    const year = (endYear - nowYear)

    const firstJobTime = new Date(Math.abs(selectedEndDate.getTime() - selectedNowDate.getTime())).getMonth()

    const error = selectedEndDate.getTime() < selectedNowDate.getTime()

    useEffect(() => {

        if (year === 0) {
            months = (endMonth - nowMonth) + 1
            setMiesiace(months)
            setWidok(false)
        }
        else if (year > 0) {
            months = (((year - 1) * 12) + endMonth + (12 - nowMonth)) + 1
            setMiesiace(months)
            setWidok(false)
        }
    }, [value, valueEnd])

    etat = (parseFloat(state.etat1) / parseFloat(state.etat2).toFixed(2))
    useEffect(() => {
        if (wymiarDobowyRef.current) {
            wymiarDobowyRef.current.focus()
        }
    }, [etat])
    useEffect(() => {
        if (state.niepelnosprawni) {
            setState({
                ...state,
                hourDay: 7,

            })
        } else {
            setState({
                ...state,
                hourDay: 8,
                wymiar: ""
            })

        }
    }, [state.niepelnosprawni])



    const wylicz = () => {
        if (state.wGodzinach) {
            if (state.firstJob) {
                (liczenieWymiaru = (((1 / 12 * state.wymiar * firstJobTime) * etat) * normaCzasu).toFixed(2)) 
                 
            } else {
                liczenieWymiaru = ((Math.ceil((state.wymiar * etat) * (miesiace / 12))) * normaCzasu)
            }
        }

        else {
            if (state.firstJob) {
                if (state.hourDay !== 8) {
                    liczenieWymiaru = ((((1 / 12 * state.wymiar * firstJobTime) * etat) * normaCzasu) / state.hourDay).toFixed(2)  
                  
                } else {
                    liczenieWymiaru = ((1 / 12 * state.wymiar * firstJobTime)  * etat).toFixed(2)
                
                }
            } else {
                if (state.hourDay !== 8) {
                    liczenieWymiaru = Math.ceil(miesiace / 12 * state.wymiar * etat * normaCzasu / state.hourDay)

                } else {
                    liczenieWymiaru = (Math.ceil((state.wymiar * etat) * (miesiace / 12)))

                }
            }
        }
        setWyliczenie(liczenieWymiaru)
        dispatch(daneWymiaru({
            liczenieWymiaru,
            wGodzinach: state.wGodzinach,
            etat1: state.etat1,
            etat2: state.etat2,
            hourDay: state.hourDay,
            firstJob: state.firstJob,
            niepelnosprawni: state.niepelnosprawni,
            dataPocz: { nowDay, nowMonth, nowYear },
            dataKon: { endDay, endMonth, endYear },
            wymiar: state.wymiar,
            firstJobTime,
            etat,
            miesiace,
            normaCzasu,
            wyliczenie: liczenieWymiaru,
        }))
        setWidok(true)

    }
    // const handleChangePrzekazanieDanych = () => {
    //     dispatch(values.wymiar(
    //         liczenieWymiaru,
    //         state.wGodzinach,
    //         state.etat1,
    //         state.etat2,
    //         state.hourDay,
    //         state.niepelnosprawni,
    //         selectedEndDate
    //     ))

    // }

    const reset = () => {
        setState({
            ...state,
            wGodzinach: false,
            wGodzinach: false,
            flagaPrzekazanieEtatu: false,
            firstJob: false,
            etat1: 1,
            etat2: 1,
            niepelnosprawni: false,
            hourDay: 8,
            wymiar: months,
        })
        setValue({ startDate: new Date(), endDate: new Date() })
        setValueEnd({ startDate: new Date(), endDate: new Date() })
        setWyliczenie(0)
        // dispatch(values.wymiar(
        //     liczenieWymiaru = '',
        //     state.wGodzinach = false,
        //     state.etat1,
        //     state.etat2,
        //     state.hourDay,
        //     state.niepelnosprawni
        // ))

    }

    // const handleChangeDodatkoweUstawienia = () => {
    //     setDodatkoweUstawienia(!dodatkoweUstawienia)
    //     setWidok(false)
    // }






    // const classes = useStyles();
    // const [anchorEl, setAnchorEl] = React.useState(null);

    // const handlePopoverOpen = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handlePopoverClose = () => {
    //     setAnchorEl(null);
    // };
 

    const Wynik = ({ wyliczenie }) => {
        return (
            <>
                {state.firstJob ?
                    <div className="  flex items-center flex-col">
                        {etat === 1 ?
                            <p className="text-xl">
                                {state.wGodzinach ? `1/12 x ${state.wymiar} dni x ${firstJobTime} mies. x ${state.hourDay} godzin =` : ` 1/12 x ${state.wymiar} dni x ${firstJobTime} mies. `}
                            </p>
                            :
                            <p className="text-xl">

                                {state.wGodzinach ? `1/12 x ${state.wymiar} dni x ${state.etat1}/${state.etat2} etatu x ${firstJobTime} mies. x ${state.hourDay} godzin  = ` : `1/12 x ${state.wymiar} dni x ${state.etat1}/${state.etat2} etatu x ${firstJobTime} mies.  = `}
                            </p>
                        }
                        <h1 className="text-4xl font-bold text-zielony-1 pt-1">
                            {` ${wyliczenie} ${state.wGodzinach ? "godzin" : "dni"}  urlopu`}
                        </h1>
                    </div>
                    :
                    <div className="  flex items-center flex-col">
                        {etat === 1 ?
                            <p className="text-xl">
                                {state.wGodzinach ? ` ${wyliczenie / normaCzasu}  dni x ${normaCzasu} godzin (norma) =` : `${miesiace}/12 x ${state.wymiar} dni = `}
                            </p>
                            :
                            <p className="text-xl">
                                {state.wGodzinach ? `${(Math.ceil((state.wymiar) * (miesiace / 12)))} dni x ${state.etat1}/${state.etat2} etatu  x ${normaCzasu} godz. (norma) =  ` : `${state.wymiar} dni x ${state.etat1}/${state.etat2} etatu x  ${miesiace}/12  =  `}
                            </p>
                        }


                        {etat === 1
                            ?
                            <h1 className="text-2xl md:text-5xl font-bold text-zielony-1 pt-1">
                                {` ${wyliczenie} ${state.wGodzinach ? "godzin" : "dni"}  urlopu `}
                            </h1>

                            :

                            state.wGodzinach ?
                                <h1 className="text-2xl md:text-5xl font-bold text-zielony-1 pt-1 ">{
                                    `${wyliczenie} ${state.wGodzinach ? "godzin" : "dni"}  urlopu  `}
                                </h1>
                                :
                                <div>
                                    <h1 className="text-2xl md:text-5xl font-bold text-zielony-1 pt-1">
                                        {`${wyliczenie} dni urlopu `}
                                        <span className="text-niebieski-10 text-xl font-normal">{`(po ${state.hourDay} godzin)`}</span>
                                    </h1>

                                </div>

                        }


                    </div>
                }
            </>
        )
    }
    return (
        <>
            <div className=" flex    md:h-[calc(100vh_-_85px)] flex-col  w-full  p-4 md:p-8">
                <div className="flex w-full  flex-col ">
                    <div className="hidden md:flex w-[100%]  flex-col   text-niebieski-10 font-bold pr-16">
                        <h1 className="text-5xl pb-4 text-zielony-1">Kalkulator wymiaru urlopu</h1>
                        <h2 className=" text-2xl leading-9 pb-2">Kalkulator wylicza urlop wypoczynkowy za wyznaczony okres.</h2>
                    </div>
                </div>
                <div className="w-full flex flex-col py-4 bg-niebieski-4 border border-niebieski-6 border-opacity-50 rounded-lg px-4 shadow-lg" >
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <div className="  w-[80%] flex flex-col md:flex-row  md:items-end  justify-between">
                                    {/*  */}
                                    <div className="flex flex-col md:flex-row w-3/4 justify-between">
                                        <div className="flex flex-col  ">
                                            <h2 className="  pb-1 text-sm font-medium text-gray-900 dark:text-white">Roczny wymiar</h2>
                                            <select
                                                value={state.wymiar}

                                                className="rounded-md w-full px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                                type="select-one"
                                                onChange={handleChange}
                                                label="Wymiar urlopu"
                                                name="wymiar"

                                            >
                                                <option aria-label="None" value="" />
                                                <option value={20}>20 dni</option>
                                                <option value={26}>26 dni</option>
                                                <option disabled={state.niepelnosprawni ? false : true} value={30}>30 dni</option>
                                                <option disabled={state.niepelnosprawni ? false : true} value={36}>36 dni</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col pt-4 md:pt-0 ">
                                            <h2 className="block pb-1 text-sm font-medium text-gray-900 dark:text-white">Data początkowa</h2>
                                            <Datepicker
                                                i18n={"pl"}
                                                startWeekOn="mon"
                                                // minDate={new Date("2023-01-05")}
                                                // maxDate={new Date("2023-01-30")} 
                                                minDate={state.firstJob ? new Date(`1.1.${nowYear}`) : new Date(`12.31.2000`)}
                                                maxDate={state.firstJob ? new Date(`12.31.${nowYear}`) : new Date(`12.31.2050`)}
                                                value={value}
                                                onChange={setValue}
                                                primaryColor={"green"} 
                                                asSingle={true}
                                                useRange={false}
                                                displayFormat={"DD-MM-YYYY"}
                                                readOnly={true}
                                                inputClassName=" rounded-md   w-full px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1    "
                                                containerClassName=" "
                                                toggleClassName="hidden bg-blue-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"


                                            />
                                        </div>
                                        <div className="flex flex-col pt-4 md:pt-0 ">
                                            <h2 className="  pb-1 text-sm font-medium text-gray-900  ">Data końcowa</h2>
                                            <Datepicker
                                                i18n={"pl"}
                                                startWeekOn="mon"
                                                minDate={state.firstJob ? new Date(`1.1.${nowYear}`) : new Date(`12.31.2000`)}
                                                maxDate={state.firstJob ? new Date(`12.31.${nowYear}`) : new Date(`12.31.2050`)}
                                                value={valueEnd}
                                                onChange={setValueEnd}
                                                primaryColor={"green"} 
                                                asSingle={true}
                                                useRange={false}
                                                displayFormat={"DD-MM-YYYY"}
                                                readOnly={true}
                                                inputClassName=" rounded-md   w-full px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1    "
                                                toggleClassName="hidden absolute bg-blue-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                                            />
                                            {error && <p style={{
                                                color: "#f51e3b", fontSize: "10px",
                                            }}
                                            >Data końcowa jest wcześniejsza niż początkowa.</p>}
                                        </div>
                                    </div>


                                    <div className="md:w-1/4 flex md:justify-end pt-4 md:pt-0">
                                        <Disclosure.Button>
                                            <div className="flex items-center">
                                                <h2 className="text-lg ">{!open ? `Więcej ustawień` : "Mniej ustawień"}</h2>
                                                <ChevronRightIcon className={open ? ' w-9 rotate-90 transform text-zielony-1 ' : 'w-9 text-zielony-1  '} />
                                            </div>


                                        </Disclosure.Button>
                                    </div>


                                </div>
                                <Disclosure.Panel>
                                    <div className="flex w-full md:w-[90%]  flex-col       text-niebieski-10 pt-2  ">
                                        <div className="  flex flex-col  md:flex-row w-full  text-niebieski-10  pt-8  gap-4   ">
                                            <div className="flex flex-col  md:w-[20%] pr-6">
                                                <h2 className="  pb-1 text-sm font-medium text-gray-900  ">Dobowy wymir czasu pracy</h2>
                                                <input
                                                    className="rounded-md  w-1/3   py-2 transition duration-300 border bg-itemTlo border-niebieski-7 focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                                    name="hourDay"
                                                    type="number"
                                                    value={state.hourDay}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    ref={wymiarDobowyRef}
                                                    disabled={state.wGodzinach ? true : false}
                                                />
                                            </div>
                                            <div className="flex flex-col md:w-[20%] pr-6   ">
                                                <h2 className="  pb-1 text-sm font-medium text-gray-900  ">Część etatu</h2>
                                                <div className="flex w-full   ">
                                                    <select
                                                        className="rounded-md w-1/3  px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                                        value={state.etat1}
                                                        type="select-one"
                                                        onChange={handleChange}
                                                        name="etat1"
                                                    >
                                                        <option value={1}>1 </option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                        <option value={4}>4</option>
                                                        <option value={5}>5</option>
                                                        <option value={6}>6</option>
                                                        <option value={7}>7</option>
                                                        <option value={8}>8</option>
                                                    </select>

                                                    <p className="text-2xl pt-1 px-1">  /</p>
                                                    <select
                                                        className="rounded-md w-1/3  px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                                        value={state.etat2}
                                                        type="select-one"
                                                        onChange={handleChange}
                                                        name="etat2"
                                                    >
                                                        {state.etat1 < 2 ? <option value={1}>1 </option> : <option disabled value={1}>1 </option>}
                                                        {state.etat1 < 3 ? <option value={2}>2 </option> : <option disabled value={2}>2 </option>}
                                                        {state.etat1 < 4 ? <option value={3}>3 </option> : <option disabled value={3}>3 </option>}
                                                        {state.etat1 < 5 ? <option value={4}>4 </option> : <option disabled value={4}>4 </option>}
                                                        {state.etat1 < 6 ? <option value={5}>5 </option> : <option disabled value={5}>5 </option>}
                                                        {state.etat1 < 7 ? <option value={6}>6 </option> : <option disabled value={6}>6 </option>}
                                                        {state.etat1 < 8 ? <option value={7}>7 </option> : <option disabled value={7}>7 </option>}
                                                        <option value={8}>8</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex flex-col md:items-center   mr-6    ">
                                                <h2 className="  pb-1 text-sm font-medium text-gray-900   ">Pierwsza praca</h2>
                                                <input

                                                    type="checkbox"
                                                    checked={state.firstJob}
                                                    onChange={handleChange}
                                                    name="firstJob"
                                                    className="  w-6  h-6 text-zielony-1 bg-niebieski-2 border-niebieski-9 rounded focus:ring-zielony-1    focus:ring-2    " />
                                            </div>
                                            <div className="flex flex-col md:items-center   mr-6    ">
                                                <h2 className="  pb-1 text-sm font-medium text-gray-900  ">Wylicz w godzinach</h2>
                                                <input

                                                    type="checkbox"
                                                    checked={state.wGodzinach}
                                                    onChange={handleChange}
                                                    name="wGodzinach"
                                                    className="md:w-6 md:h-6 text-zielony-1 bg-niebieski-2 border-niebieski-9 rounded focus:ring-zielony-1    focus:ring-2    " />
                                            </div>
                                            <div className="flex flex-col md:items-center   mr-6    ">
                                                <h2 className="  pb-1 text-sm font-medium text-gray-900  ">Niepełnosprawni</h2>
                                                <input

                                                    type="checkbox"
                                                    checked={state.niepelnosprawni}
                                                    onChange={handleChange}
                                                    name="niepelnosprawni"
                                                    className="md:w-6 md:h-6 text-zielony-1 bg-niebieski-2 border-niebieski-9 rounded focus:ring-zielony-1    focus:ring-2    " />
                                            </div>
                                        </div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                <div className="w-full h-1/3 flex-col md:flex-row mt-6  md:mt-0 flex ">

                    <div className="md:w-[60%] mb-6 md:mb-0 py-8 md:py-0 bg-niebieski-4 border border-niebieski-6 border-opacity-50 rounded-lg flex justify-center items-center mt-[2%] shadow-lg">
                        {widok && <Wynik wyliczenie={wyliczenie} />}
                    </div>


                    <div className="md:w-[40%]   h-full flex justify-around items-center">
                        <div className=" w-[40%]   h-1/3   flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-zielony-1 bg-niebieski-6  text-white cursor-pointer tracking-wider transition duration-300  "
                            onClick={() => reset()}>
                            <h2 className="transition duration-300  ">RESET</h2>
                        </div>
                        {state.wymiar === 0 || state.wymiar === "" || error ?

                            <div className="disabled w-[40%] h-1/3 flex justify-center items-center  py-3   text-xl rounded-md font-bold   bg-szary-4  text-white tracking-wider transition duration-300  "
                            >
                                <h2 className="transition duration-300">WYLICZ</h2>
                            </div> :
                            <div
                                className=" w-[40%]  h-1/3   flex justify-center items-center  py-3   text-xl rounded-md font-bold bg-zielony-1 hover:bg-niebieski-6  text-white cursor-pointer tracking-wider transition duration-300  "

                                onClick={wylicz}>
                                <h2 className="transition duration-300">WYLICZ</h2>



                            </div>}
                        {widok > 0 ?
                            <div className={`hidden  outline-none absolute -bottom-2 -right-3 md:bottom-2  md:right-2 w-16 h-16   rounded-full md:flex justify-center items-center hover:bg-niebieski-10 bg-zielony-1 text-niebieski-6  hover:text-white hover:border    cursor-pointer tracking-wider transition duration-300  `}  >
                                <Link href={
                                    {
                                        pathname: '/wydruk',
                                        query: { pdf: JSON.stringify("wymiar") }

                                    }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                                    </svg>
                                </Link>
                            </div >
                            : null}



                    </div>
                </div>


            </div>
            <section className='w-full flex justify-center py-8 gradient-05 backdrop-blur-sm '>
                <div className='flex max-w-[90%] md:max-w-[80%] flex-col'>

                    <h1 className="h1Text">Kalkulator wymiaru urlopu</h1>
                    <h2 id='Roczny wymiar urlopu' className="h2Text">Roczny wymiar urlopu</h2>
                    <h4 className="h4Text">Roczny wymiar urlopu wypoczynkowego wynosi:</h4>
                    <li className="liText"><span>20 dni</span> - gdy łączny  staż urlopowy  jest krótszy niż 10 lat,</li>
                    <li className="liText"><span>26 dni</span> - gdy łączny  staż urlopowy  wynosi co najmniej 10 lat. </li>
                   

                    <h2 id="Część etatu" className="h2Text">Część etatu</h2>
                    <h4 className="h4Text">Wymiar urlopu dla pracownika zatrudnionego w niepełnym wymiarze czasu pracy ustala się proporcjonalnie do wymiaru czasu pracy tego pracownika, biorąc za podstawę wymiar urlopu 20 lub 26 dni; niepełny dzień urlopu zaokrągla się w górę do pełnego dnia.</h4>

                    <h2 id="Wymiar czasu pracy" className="h2Text">Dobowy wymiar czasu pracy </h2>
                    <h4 className="h4Text">Urlopu udziela się w dni, które są dla pracownika dniami pracy, zgodnie z obowiązującym go rozkładem czasu pracy, w wymiarze godzinowym, odpowiadającym dobowemu wymiarowi czasu pracy pracownika w danym dniu.</h4>
                    <h4 className="h4Text"> Dobowy wymiar czasu pracy jest to faktyczna liczba godzin, którą w dobie powinien przepracować pracownik zgodnie z obowiązującym go rozkładem czasu pracy.</h4>

                    <h2 id="Pierwsza praca" className="h2Text">Pierwsza praca</h2>
                    <h4 className="h4Text">Pracownikowi podejmującemu pracę po raz pierwszy w swej karierze zawodowej, w roku kalendarzowym, w którym podjął pracę, przysługuje urlop wypoczynkowy w wymiarze 1/12 wymiaru urlopu przysługującego mu po przepracowaniu roku.</h4>
                    <h4 className="h4Text">Prawo do urlopu w ułamkowym wymiarze powstaje z upływem każdego miesiąca pracy do końca roku kalendarzowego, w którym pracownik rozpoczął pierwszą pracę.</h4>
                    <h4 className="h4Text">Wymiar pierwszego urlopu stanowi ułamek 1/12 z wymiaru przysługującego pracownikowi po przepracowaniu roku.</h4>
                    <h4 className="h4Text">Otrzymany wynik nie jest liczbą całkowitą, brak jest jednak przepisów, które wskazywałyby, że taki niepełny wymiar urlopu należy zaokrąglać do pełnego dnia.</h4>
                    <h4>Prawo do kolejnych urlopów wypoczynkowych pracownik nabywa w każdym następnym roku kalendarzowym</h4>


                    <h2 id="Osoby niepełnosprawne" className="h2Text">Osoby niepełnosprawne</h2>
                    <h4 className="h4Text">Osobie zaliczonej do znacznego lub umiarkowanego stopnia niepełnosprawności przysługuje dodatkowy urlop wypoczynkowy w wymiarze 10 dni roboczych w roku kalendarzowym.</h4>     
                    <h4 className="h4Text">Prawo do pierwszego urlopu dodatkowego osoba zaliczona do znacznego lub umiarkowanego stopnia niepełnosprawności nabywa po przepracowaniu jednego roku po dniu zaliczenia jej do jednego ze wskazanych stopni niepełnosprawności.</h4>
                    <h4 className="h4Text">Dostęp do dodatkowych dni urlopu wypoczynkowego dla osoby niepełnosprawnej uzyskasz po zaznaczeniu &#34;osoby niepełnosprawne&#34;  w zakładce  &#34;więcej ustawień&#34;  </h4>




                </div>
            </section>

        </>



    )
}



