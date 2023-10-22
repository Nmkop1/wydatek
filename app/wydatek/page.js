'use client'
import { useRef, useState, useEffect } from "react";
import { login, logout, } from '../../app/GlobalRedux/Features/counter/userSlice';
import { auth, onAuthStateChanged } from '../../firebase/config';
import DaneDoWydatku from "../../components/DaneDoWydatku"
import Tabela from "../../components/Tabela";
import { useSelector, useDispatch } from 'react-redux';
import { dodawanieCzynnosci, deleteCzynnosci } from '../GlobalRedux/Features/counter/counterSlice';
import { daneDoWyniku } from '../GlobalRedux/Features/counter/wynikSlice';
import OcenaWydatkuMan from "../../components/OcenaWydatkuMan"
import OcenaWydatkuWomen from "../../components/OcenaWydatkuWomen"
import OcenaWydatkuManKcal from "../../components/OcenaWydatkuManKcal"
import OcenaWydatkuWomenKcal from "../../components/OcenaWydatkuWomenKcal"
import TransitionWraper from "../../components/TransitionWraper";
import { useRouter } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import SectionText from "../../components/SectionText"
function Home() {

    const refStanowisko = useRef(null)
    const refFirma = useRef(null);
    const refOpis = useRef(null);
    const dispatch = useDispatch();
    const router = useRouter()
    const [isFocusedFirma, setIsFocusedFirma] = useState(false);
    const [isFocusedOpis, setIsFocusedOpis] = useState(false);
    const [isFocusedStanowisko, setIsFocusedStanowisko] = useState(false);
    const [openDaneDoWydatku, setOpenDaneDoWydatku] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [openWynik, setOpenWynik] = useState(false)
    let [postawaValue, setPostawaValue] = useState([])
    let [partiaCialaValue, setPartiaCialaValue] = useState([])

    let [sumaWydatkuMin, setSumaWydatkuMin] = useState(null)
    let [sumaWydatkuMax, setSumaWydatkuMax] = useState(null)
    let [sumaCzasu, setSumaCzasu] = useState([])
    const [openDrukuj, setOpenDrukuj] = useState(true);

    const { formDataRedux, kcal } = useSelector(state => state.wynik)
    let przerwa = null
    const [formData, setFormData] = useState({
        stanowisko: formDataRedux?.stanowisko,
        nazwaCzynnosci: "",
        czas: "",
        firma: formDataRedux?.firma,
        opis: formDataRedux?.opis

    });
    const [errors, setErrors] = useState({
        nazwaCzynnosci: false,
        czas: false,
        czas1: false,
        postawaValue: false,
        partiaCialaValue: false
    });

    const messages = {
        czas_incorrect: 'Musi być wypełnione',
        czas1_incorrect: 'za duży czas',
        nazwaCzynnosci_incorrect: 'Musi być wypełnione',
        postawaValue_incorrect: 'Musi być zaznaczone',
        partiaCialaValue_incorrect: 'Musi być zaznaczone',
    }
    const {
        stanowisko,
        nazwaCzynnosci,
        czas,
        firma,
        opis
    } = formData;


    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                dispatch(
                    login({
                        email: userAuth.email,
                        uid: userAuth.uid,
                    })
                );
            } else {
                dispatch(logout());
            }
        });
        console.log('page loaded');
    }, []);

    if (postawaValue && postawaValue[1] === "przerwa") {
        przerwa = true
    }

    const tablicaCzynnosci = useSelector(state => state.tablicaCzynnosci)

    const handleClick = () => {

        if (przerwa) {
            partiaCialaValue = [0, 0, 'przerwa']
        }
        const validation = formValidation(postawaValue, partiaCialaValue)

        if (validation.correct) {
            const jedenWydatekMin = czas * postawaValue[0] + czas * partiaCialaValue[0]
            const jedenWydatekMax = czas * postawaValue[0] + czas * partiaCialaValue[1]


            const nowa = {
                jedenWydatekMin: jedenWydatekMin.toFixed(1),
                jedenWydatekMax: jedenWydatekMax.toFixed(1),
                czas,
                postawaValue,
                partiaCialaValue,
                nazwaCzynnosci
            }

            dispatch(dodawanieCzynnosci(nowa))
            setOpenDaneDoWydatku(false)
            setPartiaCialaValue([])
            setPostawaValue([])
            przerwa = null
            setFormData((prevState) => ({
                ...prevState,
                czas: "",
                nazwaCzynnosci: "",
            }));
            setErrors(
                (prevState) => ({
                    ...prevState,
                    nazwaCzynnosci: false,
                    czas: false,
                    czas1: false,
                    postawaValue: false,
                    partiaCialaValue: false
                })
            )
        } else {
            setErrors({
                nazwaCzynnosci: !validation.nazwaCzynnosci,
                czas: !validation.czas,
                czas1: !validation.czas1,
                postawaValue: !validation.postawaValue,
                partiaCialaValue: !validation.partiaCialaValue,
            })
        }
    }

    const formValidation = (postawa, partia) => {

        let nazwaCzynnosci = false
        let czas = false
        let czas1 = false
        let correct = false;
        let postawaValue = false
        let partiaCialaValue = false

        if (formData.czas.length > 0) {
            czas = true;
        }
        if (formData.czas < 480) {
            czas1 = true;
        }
        if (formData.nazwaCzynnosci.length > 2) {
            nazwaCzynnosci = true
        }
        if (postawa?.length > 0) {
            postawaValue = true
        }
        if (partia?.length > 0) {
            partiaCialaValue = true
        }
        if (czas && nazwaCzynnosci && czas1 && postawaValue && partiaCialaValue) {
            correct = true
        }
        return ({
            czas,
            czas1,
            nazwaCzynnosci,
            postawaValue,
            partiaCialaValue,
            correct
        })
    }

    useEffect(() => {
        sumaCzasu = tablicaCzynnosci.reduce((accumulator, object) => {
            return accumulator + new Number(object.czas);
        }, 0);
        let hours = Math.floor(sumaCzasu / 60);
        const minutes = Math.floor(sumaCzasu % 60);
        setSumaCzasu([hours, minutes])
    }, [tablicaCzynnosci])

    const handleWynik = () => {
        sumaWydatkuMin = tablicaCzynnosci.reduce((accumulator, object) => {
            return accumulator + new Number(object.jedenWydatekMin);
        }, 0);
        sumaWydatkuMax = tablicaCzynnosci.reduce((accumulator, object) => {
            return accumulator + new Number(object.jedenWydatekMax);
        }, 0);
        setSumaWydatkuMin(sumaWydatkuMin.toFixed(1))
        setSumaWydatkuMax(sumaWydatkuMax.toFixed(1))

        dispatch(daneDoWyniku({
            sumaWydatkuMin: sumaWydatkuMin.toFixed(1),
            sumaWydatkuMax: sumaWydatkuMax.toFixed(1),
            sumaCzasu: sumaCzasu,
            formData,
            kcal
        }))
        setOpenWynik(true)
    }

    const onDelete = (id) => {
        dispatch(deleteCzynnosci(id))
    }
    const onMutate = (e) => {
        let boolean = null;

        if (e.target.value === "true") {
            boolean = true;
        }
        if (e.target.value === "false") {
            boolean = false;
        }

        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    };
    const handleX = () => {
        setOpenWynik(false)
        setOpenDrukuj(true)
    }
    return (
        <>
            <div className=" flex  min-h-[calc(100vh_-_85px)] flex-col  w-full  p-4 md:p-8">
                <div className="flex w-full  flex-col pb-2 ">
                    <div className="hidden md:flex w-[100%]  flex-col   text-niebieski-10 font-bold pr-16">
                        <h1 className="text-5xl pb-4 text-zielony-1">Kalkulator wydatku energetycznego</h1>
                        <h2 className="text-2xl leading-9 pb-2">Za pomocą kalulatora wydatek energetyczny na wybranym stanowisku pracy.</h2>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row ">
                    <div className="  md:w-1/2 flex flex-col">
                        {/* kolumma z firma/stanowisko */}
                        <div className="flex w-full   bg-niebieski-4 border border-niebieski-6 border-opacity-50 rounded-lg px-4 mb-4">
                            {tablicaCzynnosci.length == 0 ?
                                <>

                                    <div className="flex w-full flex-col       text-niebieski-10 pt-2  ">
                                        <div className="flex 2    flex-col">
                                            <h2 className="text-lg pb-2 ">Dane związane z ocenianym stanowiskiem</h2>
                                            <div className="flex flex-col ">
                                                {/* input */}
                                                <div className="flex pb-2 justify-between w-full    ">
                                                    <div className="flex items-center  ">
                                                        <label className={`text-xl font-semibold ${isFocusedFirma ? "text-zielony-1" : "text-niebieski-6"}  pr-6`}>Firma</label>
                                                    </div>
                                                    <input
                                                        ref={refFirma}
                                                        type="text"
                                                        id="firma"
                                                        name="firma"
                                                        value={firma}
                                                        onChange={onMutate}
                                                        onFocus={() => setIsFocusedFirma(true)}
                                                        onBlur={() => setIsFocusedFirma(false)}
                                                        className="w-full  transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                                    />
                                                </div>
                                                {/* input */}
                                                <div className="flex pb-2 justify-between w-full    ">
                                                    <div className="flex items-center  ">
                                                        <label className={`text-xl font-semibold ${isFocusedStanowisko ? "text-zielony-1" : "text-niebieski-6"}  pr-6`}>Stanowisko</label>
                                                    </div>
                                                    <input
                                                        ref={refStanowisko}
                                                        type="text"
                                                        id="stanowisko"
                                                        name="stanowisko"
                                                        value={stanowisko}
                                                        onChange={onMutate}
                                                        onFocus={() => setIsFocusedStanowisko(true)}
                                                        onBlur={() => setIsFocusedStanowisko(false)}
                                                        className="w-full    px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                                    />
                                                </div>
                                                <div className="hidden md:flex pb-4 justify-between w-full  ">
                                                    {/* input */}
                                                    <div className="flex h-full items-center justify-between w-full ">
                                                        <div className="flex   items-center  ">
                                                            <label className={`text-xl font-semibold   ${isFocusedOpis ? "text-zielony-1" : "text-niebieski-6"}   pr-4`}>Opis stanowiska</label>
                                                        </div>
                                                        <textarea
                                                            type="text"
                                                            id="opis"
                                                            name="opis"
                                                            value={opis}
                                                            onChange={onMutate}
                                                            ref={refOpis}
                                                            onFocus={() => setIsFocusedOpis(true)}
                                                            onBlur={() => setIsFocusedOpis(false)}
                                                            className="flex flex-1 px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                                        />

                                                    </div>



                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="flex w-full flex-col       text-niebieski-10 pt-2  ">
                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button>
                                                    <div className="flex pb-2  items-center">
                                                        <h2 className="text-lg ">Dane związne z ocenianym stanowiskiem</h2>
                                                        <ChevronRightIcon className={open ? ' w-9 rotate-90 transform text-zielony-1 ' : 'w-9 text-zielony-1  '} />
                                                    </div>
                                                </Disclosure.Button>
                                                <Disclosure.Panel>
                                                    <div className="flex flex-col md:w-3/4">
                                                        {/* input */}
                                                        <div className="flex pb-2 justify-between w-full    ">
                                                            <div className="flex items-center  ">
                                                                <label className={`text-xl font-semibold ${isFocusedFirma ? "text-zielony-1" : "text-niebieski-6"}  pr-6`}>Firma</label>
                                                            </div>
                                                            <input
                                                                ref={refFirma}
                                                                type="text"
                                                                id="firma"
                                                                name="firma"
                                                                value={firma}
                                                                onChange={onMutate}
                                                                onFocus={() => setIsFocusedFirma(true)}
                                                                onBlur={() => setIsFocusedFirma(false)}
                                                                className="w-full px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                                            />
                                                        </div>
                                                        {/* input */}
                                                        <div className="flex pb-2 justify-between w-full    ">
                                                            <div className="flex items-center  ">
                                                                <label className={`text-xl font-semibold ${isFocusedStanowisko ? "text-zielony-1" : "text-niebieski-6"}  pr-6`}>Stanowisko</label>
                                                            </div>
                                                            <input
                                                                ref={refStanowisko}
                                                                type="text"
                                                                id="stanowisko"
                                                                name="stanowisko"
                                                                value={stanowisko}
                                                                onChange={onMutate}
                                                                onFocus={() => setIsFocusedStanowisko(true)}
                                                                onBlur={() => setIsFocusedStanowisko(false)}
                                                                className="w-full    px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                                            />
                                                        </div>
                                                        <div className="hidden md:flex pb-4 justify-between w-full  ">
                                                            {/* input */}
                                                            <div className="flex h-full items-center justify-between w-full ">
                                                                <div className="flex   items-center  ">
                                                                    <label className={`text-xl font-semibold   ${isFocusedOpis ? "text-zielony-1" : "text-niebieski-6"}   pr-4`}>Opis stanowiska</label>
                                                                </div>
                                                                <textarea
                                                                    type="text"
                                                                    id="opis"
                                                                    name="opis"
                                                                    value={opis}
                                                                    onChange={onMutate}
                                                                    ref={refOpis}
                                                                    onFocus={() => setIsFocusedOpis(true)}
                                                                    onBlur={() => setIsFocusedOpis(false)}
                                                                    className="flex flex-1 px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                                                />

                                                            </div>



                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                            }
                        </div>
                        {/*  */}
                        {tablicaCzynnosci.length == 0 ?
                            <div className="flex w-full  py-2   bg-niebieski-4 border border-niebieski-6 border-opacity-50 rounded-lg px-4">


                                <div className="flex flex-col md:flex-row    text-niebieski-10      ">
                                    <div className="flex flex-col w-full  justify-between items-start  md:pr-16">
                                        <h2 className="text-xl pb-4  text-niebieski-10  ">Rejestrujemy kolejne czynności wykonywane przez pracownika w trakcie dnia roboczego.</h2>
                                        <h2 className="text-xl   text-niebieski-10  ">Dla wykonywanej jednostkowej czynności określamy:</h2>
                                        <li className="text-xl   text-niebieski-10  ">czas jej wykonywania,</li>
                                        <li className="text-xl   text-niebieski-10  ">charakterystyczną pozycję ciała,</li>
                                        <li className="text-xl   text-niebieski-10  ">partię ciała wykonującą czynność.</li>

                                    </div>
                                </div>

                            </div> : null}
                    </div>
                    {tablicaCzynnosci.length == 0 ?
                        <div className="flex flex-col md:w-1/2 justify-around items-center">
                            <div className="flex text-niebieski-9 justify-center flex-col items-center cursor-pointer" onClick={() => setOpenDaneDoWydatku(!openDaneDoWydatku)} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="  w-56 h-56 hover:text-zielony-1 transition duration-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                <p className="text-xl"> DODAJ CZYNNOŚĆ</p>
                            </div>
                            <div className="flex flex-col    items-center w-full ">

                                {/* button kcal/kJ */}
                                <div className="flex   ">
                                    {tablicaCzynnosci.length == 0 ?
                                        <div className="flex w-[200px]   text-niebieski-9    ">
                                            <button
                                                onClick={() => dispatch(daneDoWyniku({
                                                    kcal: !kcal
                                                }))}
                                                className={`w-1/2 h-full py-4 font-bold  rounded-l-md disabled:bg-szary-5 ${kcal ? "bg-niebieski-9 text-niebieski-6 hover:bg-niebieski-6 hover:text-niebieski-9 transition duration-300" : "bg-zielony-1 "}`}>
                                                kcal
                                            </button>
                                            <button
                                                onClick={() => dispatch(daneDoWyniku({
                                                    kcal: !kcal
                                                }))}
                                                className={`w-1/2 font-bold h-full rounded-r-md   disabled:bg-szary-5 ${kcal ? "bg-zielony-1" : "bg-niebieski-9 text-niebieski-6 hover:bg-niebieski-6 hover:text-niebieski-9 transition duration-300"}`}>
                                                kJ
                                            </button>
                                        </div> : null
                                    }
                                </div>
                                <h2 className="text-xl  ">Wynik możesz uzyskać w kJ lub kcal</h2>
                            </div>
                        </div> : null}
                </div>



                {/* nagłówek tablicy */}
                {tablicaCzynnosci.length > 0 ?
                    <div className="relative flex  h-full  w-full  flex-col  bg-niebieski-4  ">
                        <div className="w-full  py-2 bg-niebieski-6 border  rounded-t-md text-white flex justify-between  items-center  ">
                            <div className="flex   w-[calc(100%_-_120px)] text-lg pl-4 ">
                                <p className="flex    justify-center flex-col w-1/2 md:w-[19%] ">Nazwa czynności</p>
                                <p className=" flex   items-center justify-center flex-col w-1/2 md:w-[8%]  text-center">Czas   <span className="text-sm">[min]</span></p>
                                <p className="hidden md:flex   items-center justify-center  w-[12%]   text-center">Postawa   </p>
                                <p className="hidden md:flex   items-center justify-center flex-col w-[10%]   text-center">Postawa   <span className="text-sm">{kcal ? "[kJ/min]" : "[kcal/min]"}</span></p>
                                <div className="hidden md:flex   items-center justify-center flex-col w-[15%]  text-center">
                                    <p>Partia ciała, </p>
                                    <p >
                                        ciężkość pracy</p>
                                </div>


                                <p className="hidden md:flex   items-center justify-center flex-col w-[9%]   text-center">Partia min <span className="text-sm">{kcal ? "[kJ/min]" : "[kcal/min]"}</span> </p>
                                <p className="hidden md:flex   items-center justify-center flex-col w-[9%]   text-center">Partia max <span className="text-sm">{kcal ? "[kJ/min]" : "[kcal/min]"}</span> </p>
                                <p className=" hidden md:flex   items-center justify-center flex-col w-[9%]   text-center"> Wydatek<span className="text-sm"> min </span></p>
                                <p className="hidden md:flex   items-center justify-center flex-col w-[9%]   text-center">Wydatek <span className="text-sm">max</span></p>

                            </div>
                            <div className="flex w-[120px]  text-niebieski-10 pr-2  ">
                                <div className=" w-full  h-full   flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-niebieski-10 bg-zielony-1 text-white    cursor-pointer tracking-wider transition duration-300  "
                                    onClick={() => setOpenDaneDoWydatku(!openDaneDoWydatku)}>
                                    <h2 className="transition duration-300"> Dodaj</h2>
                                </div>
                            </div>

                        </div>
                        <div className="flex w-full   min-h-full flex-col">
                            {tablicaCzynnosci.map((item) =>
                                <Tabela
                                    key={item.id}
                                    id={item.id}
                                    item={item}
                                    onDelete={onDelete}
                                />
                            )}
                        </div>

                    </div> : null}

                <TransitionWraper
                    open={openDaneDoWydatku}
                    setOpen={setOpenDaneDoWydatku} >
                    <div className="relative w-full h-screen px-2  md:px-6">
                        <DaneDoWydatku
                            messages={messages}
                            errors={errors}
                            czas={czas}
                            przerwa={przerwa}
                            postawaValue={postawaValue}
                            partiaCialaValue={partiaCialaValue}
                            kcal={kcal}
                            setPostawaValue={setPostawaValue}
                            setPartiaCialaValue={setPartiaCialaValue}
                            handleClick={handleClick}
                            onMutate={onMutate}
                        />
                    </div>
                </TransitionWraper>
                <TransitionWraper
                    open={openWynik}
                    setOpen={handleX}
                    bg={true}>
                    <div className="flex gap-4 w-full h-screen   p-4  text-white flex-col md:flex-row ">
                        {kcal ?
                            <>
                                <div className="w-full md:w-1/2    p-4 flex justify-center bg-niebieski-9 rounded-lg  ">
                                    <OcenaWydatkuMan
                                        sumaWydatkuMin={sumaWydatkuMin}
                                        sumaWydatkuMax={sumaWydatkuMax} />
                                </div>
                                <div className="w-full md:w-1/2   p-4 flex justify-center  bg-niebieski-9 rounded-lg   ">
                                    <OcenaWydatkuWomen
                                        sumaWydatkuMin={sumaWydatkuMin}
                                        sumaWydatkuMax={sumaWydatkuMax}
                                        openModal={openModal}
                                        setOpenModal={setOpenModal}
                                        setOpenDrukuj={setOpenDrukuj}
                                        openDrukuj={openDrukuj} />
                                </div>
                            </>
                            :
                            <>
                                <div className="w-full md:w-1/2    p-4 flex justify-center bg-niebieski-9 rounded-lg  ">
                                    <OcenaWydatkuManKcal
                                        sumaWydatkuMin={sumaWydatkuMin}
                                        sumaWydatkuMax={sumaWydatkuMax} />
                                </div>
                                <div className="w-full md:w-1/2   p-4 flex justify-center  bg-niebieski-9 rounded-lg   ">
                                    <OcenaWydatkuWomenKcal
                                        sumaWydatkuMin={sumaWydatkuMin}
                                        sumaWydatkuMax={sumaWydatkuMax}
                                        setOpenDrukuj={setOpenDrukuj}
                                        openDrukuj={openDrukuj} />
                                </div>
                            </>
                        }
                    </div>
                </TransitionWraper>
                {tablicaCzynnosci.length > 0 ?
                    <div className="sticky bottom-0 left-0 w-full  h-[70px] bg-niebieski-2    rounded-b-md text-niebieski-6 flex   justify-between  items-center ">
                        <div className="flex font-bold w-full md:w-[calc(100%_-_120px)] text-lg pl-4 ">
                            <p className="hidden md:flex     justify-center flex-col  w-[17%] "> </p>
                            <p className={`flex  items-center justify-center w-1/2 md:w-[12%] text-center ${sumaCzasu[0] > 8 ? "text-orange-3" : "text-niebieski-6"}`}>{sumaCzasu[0] == 0 ? `${sumaCzasu[1]} min` : `${sumaCzasu[0]} godz ${sumaCzasu[1]} min`}</p>
                            <p className="hidden md:flex   items-center justify-center  w-[10%]   text-center"> </p>
                            <p className="hidden md:flex   items-center justify-center flex-col w-[10%]   text-center"> </p>
                            <p className="hidden md:flex   items-center justify-center flex-col w-[15%]  text-center"> </p>
                            <p className="hidden md:flex   items-center justify-center flex-col w-[9%]   text-center">  </p>
                            <p className="hidden md:flex   items-center justify-center flex-col w-[9%]   text-center">  </p>
                            <div className=" flex   items-center justify-center flex-col w-1/2 md:w-[18%]    text-center">

                                <div className=" w-3/4  h-full   flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-zielony-1 bg-niebieski-6  text-white cursor-pointer tracking-wider transition duration-300  "
                                    onClick={handleWynik}>
                                    <h2 className="transition duration-300">WYLICZ</h2>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex  w-[120px] h-3/4 text-niebieski-10 pr-2   ">
                        </div>
                    </div> : null
                }
            </div>

            <section className='w-full flex justify-center py-8 gradient-05 backdrop-blur-sm '>
                <div className='flex max-w-[90%] md:max-w-[80%] flex-col'> 

                <h1 className="h1Text">Wydatek energetyczny</h1>
                <h2 id='Podstawa wynagrodzenia' className="h2Text">Pojęcie</h2>
                <h4 className="h4Text">Pod pojęciem wydatku energetycznego rozumiemy ilość energii produkowanej przez organizm podczas wykonywania pracy fizycznej. Wielkość wydatkowanej energii podawana jest w jednostkach pracy: kcal/min lub kJ/min.</h4>


                <h2 id="Współczynnik urlopowy" className="h2Text">Metody pomiarowe</h2>
                <h4 className="h4Text">Istnieje wiele metod pomiaru wydatku energetycznego. Metody te są bardzo zróżnicowane, począwszy od najprostszych: chronometrażowo-tabelarycznych, skończywszy na bardziej skomplikowanych i kosztownych – metodach kalorymetrii pośredniej lub bezpośredniej, wymagających specjalistycznej aparatury.</h4>

                <h2 id="Część etatu" className="h2Text">Pomiar wydatku energetycznego metodą Lehmanna</h2>
                <h4 className="h4Text">Jedną z najprostszych jest metoda chronometrażowo-tabelaryczna wg.Lehmanna, o którą oparto wyliczenie wydatku energetycznego na naszej stronie. Metoda ta polega na przeprowadzeniu  &#34;fotografii dnia pracy&#34; pracownika, tj. sporządzenia zestawienia wszystkich czynności wykonanych przez pracownika w ciągu zmiany roboczej, z uwzględnieniem  zajmowanej podczas pracy pozycji ciała oraz rodzaju wykorzystywanych przy wysiłku grup mięśniowych. Po zsumowaniu wszystkich wartości, w całym cyklu roboczym, uzyskujemy wynik (kJ/8h lub kcal/8h), tj. koszt energetyczny wyrażający pracę mechaniczną w trakcie zmiany roboczej.</h4>
                <h4 className="h4Text">Z uwagi na mniejszą masę mięśniową kobiet w stosunku do mężczyzn, ich wydatek energetyczny związany z obciążeniem fizycznym pracą jest również mniejszy o ok. 20%, zatem należy przyjąć pewien współczynnik korygujący, który wynosi 0,8  [G. Lehmann - Praktyczna fizjologia pracy. PZWL, Warszawa 1966]</h4>
                <h4 className="h4Text">Wyliczenia naszego kalkulatora odnoszą się do pracy wykonywanej w warunkach umiarkowanego środowiska termicznego. W przypadku środowiska gorącego wydatek energetyczny jest wyższy o ok. 12 %, a środowiska zimnego ok. 10 %.</h4>
                <h2 id="Wymiar czasu pracy" className="h2Text">Zalety i wady metody Lehmanna</h2>
                <h4 className="h4Text">Zaletą metody jest szybkość i łatwość jej stosowania. Wykonując ocenę wydatku nie zakłócamy przebiegu pracy pracowników. Metoda obarczona jest jednak pewnym błędem pomiarowym, możliwym jednak do zaakceptowania, bowiem wartość wydatku podawana jest w przedziale min-max. Metoda ta nie uwzględnia także warunków środowiska pracy, takich jak temperatura i wilgotność powietrza.</h4>


                <h2 id="Norma czasu pracy" className="h2Text">Zgodność z przepisami</h2>
                <h4 className="h4Text">Obowiązujące przepisy prawa nie regulują kto i jaką metodą powinien przeprowadzić ocenę wydatku energetycznego.</h4>
                <h4 className="h4Text">Dopełniliśmy wszelkich starań aby wyliczenia kalkulatora wydatku były zgodne z założeniami metody G.Lehmanna.</h4>
                <h4 className="h4Text" style={{ color: "#C62828" }}> Nie ponosimy odpowiedzialności za poprawność wyników oraz prawidłowość identyfikacji czynności i czasu wykonywania tych czynności na ocenianych stanowiskach pracy.</h4>

          

            </div>
            </section>
          
        </>
    )
}

export default Home
