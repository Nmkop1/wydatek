import { Fragment} from "react";
import { Dialog, Transition } from "@headlessui/react";


const Modal = ({ children, openModal, setOpenModal }) => {
    return (
        <Transition show={openModal} as={Fragment}>
            <Dialog
                onClose={() => setOpenModal(false)}                
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 z-40 bg-primaryBlue/60  " />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed z-50  inset-0 flex items-center justify-center">
                        <Dialog.Panel className="w-full     border rounded bg-white">
                            {children}                            
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};

export default Modal;
