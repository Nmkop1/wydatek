import { Container } from "postcss";
import { Fragment, useRef, useState, useCallback, useEffect } from "react";
import Modal from "./Modal";
function Tabela({ jedenWydatekMin, jedenWydatekMax, czas, postawaValue, partiaCialaValue, onDelete, id }) {

    const [openModal, setOpenModal] = useState(false);

    const deleteOpen = () => {
        onDelete(id);
        setOpenModal(false);


    };

    return (
        <>
            <div className="border p-4 flex justify-between">
                <div className="flex">
                    <h1 className="pr-6">{jedenWydatekMin} </h1>
                    <h1 className="pr-6">{jedenWydatekMax} </h1>
                </div>


                <button onClick={() => setOpenModal(true)} className="p-2 border">x</button>
            </div>
            <Modal
                setOpenModal={setOpenModal}
                openModal={openModal}>
                <div className="w-full flex     rounded flex-col bg-white ">

                    <div className="relative inline-block align-bottom bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                                        Czy na pewno chcesz usunąć zlecenie?
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
                                className="text-uwaga-3 bg-white rounded-sm flex items-center justify-center   hover:bg-uwaga-3 hover:text-white  transition-colors  font-medium   text-sm w-1/5 px-3 py-2.5 text-center    "
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