'use client'
import { Fragment, useRef, useState, useCallback, useEffect } from "react";
// import { Dialog, Transition } from "@headlessui/react";
import DaneDoWydatku from "../../components/DaneDoWydatku"
import Tabela from "../../components/Tabela";
import { useSelector, useDispatch } from 'react-redux';
import { dodawanieCzynnosci, deleteCzynnosci } from '../GlobalRedux/Features/counter/counterSlice';
import Pdf from "../../components/Pdf"
import Modal from "../../components/Modal"
import OcenaWydatku from "../../components/OcenaWydatku"
import TransitionWraper from "../../components/TransitionWraper";
import { useRouter } from 'next/navigation'
import { selectUser } from '../GlobalRedux/Features/counter/userSlice';
import Input from "../../components/Input";
function Home() {

    const refStanowisko = useRef(null)
    const refFirma = useRef(null);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const router = useRouter()

    const [isFocusedFirma, setIsFocusedFirma] = useState(false);
    const [isFocusedStanowisko, setIsFocusedStanowisko] = useState(false);
    const [openDaneDoWydatku, setOpenDaneDoWydatku] = useState(false)
    const [openWynik, setOpenWynik] = useState(false)


    const [postawaValue, setPostawaValue] = useState([])
    const [partiaCialaValue, setPartiaCialaValue] = useState([])
    let [sumaWydatkuMin, setSumaWydatkuMin] = useState(null)
    let [sumaWydatkuMax, setSumaWydatkuMax] = useState(null)

    const [openModal, setOpenModal] = useState(false);

    const [formData, setFormData] = useState({
        stanowisko: "",
        nazwaCzynnosci: "",
        czas: "",
        firma: "",
    });

    const {
        stanowisko,
        nazwaCzynnosci,
        czas,
        firma,
    } = formData;
    const tablicaCzynnosci = useSelector(state => state.tablicaCzynnosci)

    const handleClick = () => {
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
    }

    const handleWynik = () => {
        sumaWydatkuMin = tablicaCzynnosci.reduce((accumulator, object) => {
            return accumulator + new Number(object.jedenWydatekMin);
        }, 0);
        sumaWydatkuMax = tablicaCzynnosci.reduce((accumulator, object) => {
            return accumulator + new Number(object.jedenWydatekMax);
        }, 0);
        setSumaWydatkuMin(sumaWydatkuMin)
        setSumaWydatkuMax(sumaWydatkuMax)
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


    return (
        <div className=" w-full   p-6  ">
            <div className="flex w-full h-1/4    ">
                <div className="flex w-1/2 flex-col     text-niebieski-10 font-bold">
                    <h2 className="text-4xl     pb-3 text-zielony-1">Lorem ipsum dolor sit amet   </h2>
                    <h2 className="text-3xl  pb-2">Sed ut perspiciatis unde omnis iste</h2>
                    <h2 className="text-3xl  ">Ut enim ad minima veniam, quis nostrum exercitationem ullam</h2>
                </div>

                <div className="flex w-1/2 flex-col   px-4   text-niebieski-10">
                    <h2 className="text-4xl    font-bold pb-3 text-zielony-1">Lorem ipsum dolor sit amet   </h2>
                    <div className="flex flex-col">
                        {/* input */}
                        <div className="flex pb-4 justify-between w-3/4  ">
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
                                className="px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                            />
                        </div>
                        {/* input */}
                        <div className="flex pb-4 justify-between w-3/4  ">
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
                                className="px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
                            />
                        </div>
                    </div>
                </div>





            </div>
            {/* w-[calc(50vw_+_100px)]  */}
            <div className="flex w-full  gap-4   ">
                <div className="flex flex-col  w-full text-niebieski-10  ">

                    <div className="flex w-full justify-between  ">
                        <h2 className="text-4xl   text-niebieski-10 font-bold">Nowa czynność</h2>


                        <div className="flex  p-4    ">
                            <button onClick={handleWynik} className="p-4 border">Wynik</button>

                            <div className=" w-[120px]  h-full   flex justify-center items-center     text-xl rounded-md bg-niebieski-10 hover:bg-zielony-1 text-buttonHover    cursor-pointer tracking-wider transition duration-300  "
                                onClick={() => setOpenDaneDoWydatku(!openDaneDoWydatku)}>
                                <h2>Dodaj</h2>

                            </div>
                        </div>

                    </div>
                    <div className="flex  h-full  w-full  flex-col  bg-niebieski-4  ">
                        <div className="w-full  h-[70px] bg-niebieski-6 border  rounded-t-md text-white flex justify-between  items-center ">
                            <div className="flex w-[calc(100%_-_120px)] text-lg pl-4 ">
                                <p className="flex    justify-center flex-col  w-[19%] ">Nazwa czynności</p>
                                <p className="flex   items-center justify-center flex-col w-[8%]  text-center">Czas   <span className="text-sm">[min]</span></p>
                                <p className="flex   items-center justify-center  w-[12%]   text-center">Postawa   </p>
                                <p className="flex   items-center justify-center flex-col w-[10%]   text-center">Postawa   <span className="text-sm">[kJ/min]</span></p>
                                <p className="flex   items-center justify-center flex-col w-[15%]  text-center">Partia   </p>
                                <p className="flex   items-center justify-center flex-col w-[9%]   text-center">Partia min <span className="text-sm">[kJ/min]</span> </p>
                                <p className="flex   items-center justify-center flex-col w-[9%]   text-center">Partia max <span className="text-sm">[kJ/min]</span> </p>
                                <p className=" flex   items-center justify-center flex-col w-[9%]   text-center"> Wydatek<span className="text-sm"> min </span></p>
                                <p className="flex   items-center justify-center flex-col w-[9%]   text-center">Wydatek <span className="text-sm">max</span></p>
                            </div>


                        </div>
                        <div className="flex w-full  flex-col">
                            {tablicaCzynnosci.map((item) =>
                                <Tabela
                                    key={item.id}
                                    id={item.id}
                                    item={item}
                                    onDelete={onDelete}
                                />
                            )} </div>

                    </div>
                </div>

                <Modal
                    setOpenModal={setOpenModal}
                    openModal={openModal}>
                    <div className="w-full flex   h-full  rounded flex-col bg-white ">
                        <Pdf
                            sumaWydatkuMin={sumaWydatkuMin}
                            tablicaCzynnosci={tablicaCzynnosci} />
                        <button
                            type="button"
                            onClick={() => setOpenModal(!openModal)}
                            className="absolute top-16 right-6 border border-czerwony text-czerwony hover:bg-czerwony hover:text-white    py-2 px-4   rounded-sm  tracking-wider   "
                        >
                            Anuluj
                        </button>

                    </div>
                </Modal>
            </div>
            <TransitionWraper open={openDaneDoWydatku} setOpen={setOpenDaneDoWydatku} >
                <div className="relative    px-6">
                    <DaneDoWydatku
                        // jedenWydatekMin={jedenWydatekMin}
                        // jedenWydatekMax={jedenWydatekMax}
                        czas={czas}
                        postawaValue={postawaValue}
                        partiaCialaValue={partiaCialaValue}

                        setPostawaValue={setPostawaValue}
                        setPartiaCialaValue={setPartiaCialaValue}
                        handleClick={handleClick}
                        onMutate={onMutate}
                    />
                </div>
            </TransitionWraper>
            <TransitionWraper open={openWynik} setOpen={setOpenWynik} width>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className="flex justify-between">
                        <h1>mężczyźni </h1>
                        <h1>suma{sumaWydatkuMin} </h1>
                        <h1>suma{sumaWydatkuMax} </h1>
                    </div>
                    <div className="flex justify-between">
                        <h1>kobiety </h1>
                        <h1>suma{sumaWydatkuMin * .8} </h1>
                        <h1>suma{sumaWydatkuMax * .8} </h1>
                    </div>

                    <OcenaWydatku sumaWydatkuMin={sumaWydatkuMin} sumaWydatkuMax={sumaWydatkuMax} />
                    <button
                        disabled={!user}
                        onClick={() => setOpenModal(true)} className={
                            user
                                ? "flex  flex-col border border-niebieski-6 rounded-lg w-[23%]   bg-zielony-1 text-white outline-none text-xl hover:text-textMenu font-semibold    "
                                : " flex  flex-col border border-niebieski-6 rounded-lg w-[23%]   bg-white text-textMenu outline-none  text-xl         transition  duration-500  font-semibold "
                        }>Pdf/Wydruk</button>
                    {!user ?
                        <button type="button" onClick={() => router.push('/logowanie')}>
                            Dostęp
                        </button>
                        : null
                    }

                </div>
            </TransitionWraper>
        </div>
    )
}

export default Home