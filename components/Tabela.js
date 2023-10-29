
import { useState } from "react";
import Modal from "./Modal";
function Tabela({ onDelete, id, item }) {

    const [openModal, setOpenModal] = useState(false);

    const deleteOpen = () => {
        onDelete(id);
        setOpenModal(false);
    };

    return (
        <>
            <div className="w-full   border border-niebieski-2 rounded-md  flex justify-between  items-center odd:bg-niebieski-buttonHover even:bg-slate-50">
                <div className="flex w-[calc(100%_-_120px)]   text-niebieski-7  pl-4 py-4">
                    <p className="flex items-center w-1/2 md:w-[19%]  ">{item.nazwaCzynnosci}</p>
                    <p className="w-1/2 md:w-[8%] flex items-center justify-center  text-center">{item.czas}</p>
                    <p className="hidden md:flex items-center justify-center w-[12%]   text-center leading-5">{item.postawaValue[1]} </p>
                    <p className="hidden md:flex items-center justify-center w-[10%]   text-center">{item.postawaValue[0]} </p>
                    <p className="hidden md:flex   items-center justify-center w-[15%]   text-center">{item.partiaCialaValue[2]}</p>
                    <p className=" hidden md:flex items-center justify-center w-[9%]   text-center">{item.partiaCialaValue[0]}  </p>
                    <p className="hidden md:flex items-center justify-center w-[9%]   text-center">{item.partiaCialaValue[1]}</p>
                    <p className="hidden md:flex items-center justify-center  w-[9%]   text-center"> {item.jedenWydatekMin} </p>
                    <p className="hidden md:flex items-center justify-center w-[9%]   text-center">{item.jedenWydatekMax}</p>
                </div>
               
                <div className="kwadratButton mr-2"
                    onClick={() => setOpenModal(true)}>
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </div>
            </div>
            
              
    
            <Modal
                setOpenModal={setOpenModal}
                openModal={openModal}>
                <div className="w-full flex     rounded flex-col bg-white ">

                    <div className="relative inline-block align-bottom bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all   sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4   pb-2 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="text-center p-2 flex-auto justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 sm:w-16 sm:16 flex items-center text-error-2 mx-auto"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <h2 className="text-xl font-bold py-4 tex-text">
                                        Czy na pewno chcesz usunąć czynność?
                                    </h2>
                                    <p className="text-sm text-textAccent px-4">
                                        Wszystkie dane zostaną trwale usunięte. Tej czynności
                                        nie można cofnąć.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-niebieski-6 px-4 py-3 sm:px-6 flex flex-row-reverse">
                            <button
                                type="button"
                                className="text-uwaga-3 bg-white rounded-sm flex items-center justify-center   hover:bg-uwaga-3 hover:text-white  transition-colors  font-medium   text-sm w-1/5 px-3 py-2.5 text-center  focus:outline-none  "
                                onClick={deleteOpen}
                            >
                                Tak
                            </button>
                            <button
                                type="button"
                                className="  text-text bg-white rounded-sm flex items-center justify-center hover:bg-niebieski-buttonHover hover:text-textPrimary  transition-colors font-medium text-sm w-1/5 px-3 py-2.5 text-center  mr-2  "
                                onClick={() => setOpenModal(false)}
                            // ref={cancelButtonRef}
                            >
                                <h1>NIE</h1>
                            </button>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    );
}

export default Tabela;