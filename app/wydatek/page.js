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

function Home() {
    const [openDaneDoWydatku, setOpenDaneDoWydatku] = useState(false)
    const [openWynik, setOpenWynik] = useState(false)
    const [czas, setCzas] = useState(0)
    const [nazwaCzynnosci, setNazwaCzynnosci] = useState("")
    const [postawaValue, setPostawaValue] = useState(0)
    const [partiaCialaValue, setPartiaCialaValue] = useState([])
    let [sumaWydatkuMin, setSumaWydatkuMin] = useState(null)
    let [sumaWydatkuMax, setSumaWydatkuMax] = useState(null)
    const [openModal, setOpenModal] = useState(false);
    const tablicaCzynnosci = useSelector(state => state.tablicaCzynnosci)
    const jedenWydatekMin = czas * postawaValue * partiaCialaValue[0]
    const jedenWydatekMax = czas * postawaValue * partiaCialaValue[1]
    const dispatch = useDispatch();

    const handleClick = () => {
        const nowa = {
            jedenWydatekMin, jedenWydatekMax, czas, postawaValue, partiaCialaValue
        }
        dispatch(dodawanieCzynnosci(nowa))
        setOpenDaneDoWydatku(false)
        // setPartiaCialaValue()
        setPostawaValue()
    }

    const handleWynik = () => {

        sumaWydatkuMin = tablicaCzynnosci.reduce((accumulator, object) => {
            return accumulator + object.jedenWydatekMin;
        }, 0);
        sumaWydatkuMax = tablicaCzynnosci.reduce((accumulator, object) => {
            return accumulator + object.jedenWydatekMax;
        }, 0);
        setSumaWydatkuMin(sumaWydatkuMin)
        setSumaWydatkuMax(sumaWydatkuMax)
        setOpenWynik(true)
    }

    const onDelete = (id) => {
        dispatch(deleteCzynnosci(id))
    }

    return (
        <div className=" w-full  h-full  ">

            <button onClick={() => setOpenDaneDoWydatku(!openDaneDoWydatku)}>dodaj</button>
            <div className="flex">
                <div className="border p-4 w-1/2   ">
                    {tablicaCzynnosci.map((item) =>
                        <Tabela
                            key={item.id}
                            id={item.id}
                            jedenWydatekMin={item.jedenWydatekMin}
                            jedenWydatekMax={item.jedenWydatekMax}
                            czas={item.czas}
                            postawaValue={item.postawaValue}
                            partiaCialaValue={item.partiaCialaValue[0]}
                            onDelete={onDelete}
                        />
                    )}
                </div>
                <div className="border p-4 w-1/2   ">
                    <button onClick={handleWynik} className="p-4 border">Wynik</button>


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
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <DaneDoWydatku
                        jedenWydatekMin={jedenWydatekMin}
                        jedenWydatekMax={jedenWydatekMax}
                        czas={czas}
                        setNazwaCzynnosci={setNazwaCzynnosci}
                        postawaValue={postawaValue}
                        partiaCialaValue={partiaCialaValue}
                        setCzas={setCzas}
                        setPostawaValue={setPostawaValue}
                        setPartiaCialaValue={setPartiaCialaValue}
                        handleClick={handleClick}
                    />
                </div>
            </TransitionWraper>
            <TransitionWraper open={openWynik} setOpen={setOpenWynik} width>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className="flex justify-between">
                        <h1>mężczyźni </h1>
                        <h1>suma{sumaWydatkuMin  } </h1>
                        <h1>suma{sumaWydatkuMax  } </h1>
                    </div>
                    <div className="flex justify-between">
                        <h1>kobiety </h1>
                        <h1>suma{sumaWydatkuMin * .8} </h1>
                        <h1>suma{sumaWydatkuMax * .8} </h1>
                    </div>

                    <OcenaWydatku sumaWydatkuMin={sumaWydatkuMin} sumaWydatkuMax={sumaWydatkuMax} />
                    <button disabled onClick={() => setOpenModal(true)} className="p-4 border">Pdf/Wydruk</button>
                </div>
            </TransitionWraper>
        </div>
    )
}

export default Home