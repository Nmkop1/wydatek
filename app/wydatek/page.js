'use client'
import { Fragment, useRef, useState, useCallback, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DaneDoWydatku from "../../components/DaneDoWydatku"
import Tabela from "../../components/Tabela";
import { useSelector, useDispatch } from 'react-redux';
import { dodawanieCzynnosci } from '../GlobalRedux/Features/counter/counterSlice';

function Home() {
    const [open, setOpen] = useState(false)
    const [czas, setCzas] = useState(0)
    const[nazwaCzynnosci, setNazwaCzynnosci] = useState("")
    const [postawaValue, setPostawaValue] = useState(0)
    const [partiaCialaValue, setPartiaCialaValue] = useState()
    const tablicaCzynnosci = useSelector(state => state.tablicaCzynnosci)
    const jedenWydatek = czas * postawaValue * partiaCialaValue
    const dispatch = useDispatch();

    const handleClick = () => {
        const nowa = {
            jedenWydatek, czas, postawaValue, partiaCialaValue
        }
        dispatch(dodawanieCzynnosci(nowa))
        setOpen(false)
        setPartiaCialaValue()
        setPostawaValue()
    }

    let sumaWydatku = tablicaCzynnosci.reduce((accumulator, object) => {
        return accumulator + object.jedenWydatek;
    }, 0);

    return (
        <div className=" w-full  h-full  ">

            <button onClick={() => setOpen(!open)}>dfdf</button>
            <div className="border p-4 w-full   ">
                {tablicaCzynnosci.map((item) =>
                    <Tabela
                        key={item.id}
                        jedenWydatek={item.jedenWydatek}
                        czas={item.czas}
                        postawaValue={item.postawaValue}
                        partiaCialaValue={item.partiaCialaValue}
                    />
                )}
            </div>
            <div>
                <h1>suma{sumaWydatku} </h1>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10   " onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-blue-950 bg-opacity-70 " />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex  w-full  ">

                                <Transition.Child
                                    as={Fragment}
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-[100%] overflow-scroll ">
                                        {/* ikona X */}
                                        <div className=" bg-niebieski-6 opacity-70 hover:opacity-100 absolute z-30 top-0 right-0 flex items-center justify-end">
                                            <div
                                                className="flex items-center justify-center w-[40px] h-[40px]     cursor-pointer  transition-colors text-tlo hover:text-white  hover:bg-niebieski-6  "
                                                onClick={() => setOpen(false)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex h-full flex-col   bg-white py-6 shadow-xl">
                                           
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <DaneDoWydatku
                                                    jedenWydatek={jedenWydatek}
                                                    czas={czas}
                                                    setNazwaCzynnosci ={setNazwaCzynnosci }
                                                    postawaValue={postawaValue}
                                                    partiaCialaValue={partiaCialaValue}
                                                    setCzas={setCzas}
                                                    setPostawaValue={setPostawaValue}
                                                    setPartiaCialaValue={setPartiaCialaValue}
                                                    handleClick={handleClick}
                                                />
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>



    )
}

export default Home