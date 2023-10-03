'use client'
import { Fragment, useRef, useState, useCallback, useEffect } from "react";
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


function Home() {

    const refStanowisko = useRef(null)
    const refFirma = useRef(null);

    const dispatch = useDispatch();
    const router = useRouter()
    const [isFocusedFirma, setIsFocusedFirma] = useState(false);
    const [isFocusedStanowisko, setIsFocusedStanowisko] = useState(false);
    const [openDaneDoWydatku, setOpenDaneDoWydatku] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [openWynik, setOpenWynik] = useState(false)
    const [postawaValue, setPostawaValue] = useState([])
    const [partiaCialaValue, setPartiaCialaValue] = useState([])

    let [sumaWydatkuMin, setSumaWydatkuMin] = useState(null)
    let [sumaWydatkuMax, setSumaWydatkuMax] = useState(null)
    let [sumaCzasu, setSumaCzasu] = useState([])
    const [openDrukuj, setOpenDrukuj] = useState(true);
    const [kcal, setKcal] = useState(true)
    let przerwa = null
    const [formData, setFormData] = useState({
        stanowisko: "",
        nazwaCzynnosci: "",
        czas: "",
        firma: "",
        opis: ""

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
        const validation = formValidation(postawaValue, partiaCialaValue)
        if (validation.correct) {
            const jedenWydatekMin = czas * postawaValue[0] * partiaCialaValue[0]
            const jedenWydatekMax = czas * postawaValue[0] * partiaCialaValue[1]

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
            setPartiaCialaValue()
            setPostawaValue()
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
        if (partia?.length > 0 || partiaCialaValue !== "przerwa") {
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
            formData
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
            <div className=" flex  min-h-[calc(100vh_-_92px)] flex-col  w-full  p-4 md:p-8">
                <div className="flex w-full pb-6">
                    <div className="hidden md:flex w-[60%] flex-col     text-niebieski-10 font-bold pr-16">
                        <h2 className="text-4xl     pb-8 text-zielony-1">Kalkulator wydatku energetycznego</h2>
                        <h2 className="text-2xl leading-9 pb-2">W  trzech krokach obliczysz, ocenisz i wydrukujesz  wydatek energetyczny na wybranym stanowisku pracy.</h2>
                    </div>
                    {/* kolumma z firma/stanowisko */}
                    <div className="flex w-full md:w-[40%] flex-col       text-niebieski-10">

                        <div className="flex flex-col w-full">
                            {/* input */}
                            <div className="flex pb-4 justify-between w-full    ">
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
                            <div className="flex pb-4 justify-between w-full    ">
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
                                        <label className={`text-xl font-semibold   text-niebieski-6    pr-4`}>Opis stanowiska</label>
                                    </div>
                                    <textarea
                                        type="text"
                                        id="opis"
                                        name="opis"
                                        value={opis}
                                        onChange={onMutate}

                                        className="flex flex-1 px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                                    />

                                </div>



                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full pt-10 flex-col h-full  justify-between  ">
                    {tablicaCzynnosci.length == 0 ?
                        <div className="flex flex-col md:flex-row  w-full text-niebieski-10   ">
                            <div className="flex flex-col w-full md:w-[60%] justify-between items-start  md:pr-16">
                                <h2 className="text-2xl pb-4  text-niebieski-10  ">Rejestrujemy kolejne czynności wykonywane przez pracownika w trakcie dnia roboczego.</h2>
                                <h2 className="text-2xl   text-niebieski-10  ">Dla wykonywanej jednostkowej czynności określamy:</h2>
                                <li className="text-2xl   text-niebieski-10  ">czas jej wykonywania,</li>
                                <li className="text-2xl   text-niebieski-10  ">charakterystyczną pozycję ciała,</li>
                                <li className="text-2xl   text-niebieski-10  ">partię ciała wykonującą czynność.</li>

                                <div className="flex flex-col md:flex-row items-center w-full pt-6">
                                    <h2 className="text-xl font-bold">Wynik wydatku możesz uzyskać w kJ lub kcal</h2>
                                    {/* button kcal/kJ */}
                                    <div className="flex p-4">
                                        {tablicaCzynnosci.length == 0 ?
                                            <div className="flex w-[200px]   text-niebieski-9    ">
                                                <button
                                                    // disabled={tablicaCzynnosci.length > 0}
                                                    onClick={() => setKcal(!kcal)}
                                                    className={`w-1/2 h-full py-4 font-bold  rounded-l-md disabled:bg-szary-5 ${kcal ? "bg-niebieski-9 text-niebieski-6" : "bg-zielony-1"}`}>
                                                    kcal
                                                </button>
                                                <button
                                                    // disabled={tablicaCzynnosci.length > 0}
                                                    onClick={() => setKcal(!kcal)}
                                                    className={`w-1/2 font-bold h-full rounded-r-md   disabled:bg-szary-5 ${kcal ? "bg-zielony-1" : "bg-niebieski-9 text-niebieski-6"}`}>
                                                    kJ
                                                </button>
                                            </div> : null
                                        }


                                    </div>
                                </div>

                            </div>
                            <div className="flex md:w-[40%] justify-center items-center  ">

                                <div className="flex  justify-center  flex-col items-center hover:text-zielony-1   cursor-pointer transition duration-300" onClick={() => setOpenDaneDoWydatku(!openDaneDoWydatku)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="  w-56 h-56  ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    <p className="text-xl  "> DODAJ CZYNNOŚĆ</p>
                                </div>
                            </div>
                        </div> : null
                    }
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
                </div>
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
            <div>


            </div>
        </>
    )
}

export default Home
