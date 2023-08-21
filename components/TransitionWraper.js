
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";


function TransitionWraper({ children, open, setOpen, width }) {



    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-blue-950 bg-opacity-40 " />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full  ${width ? "pl-[50%]" : "pl-0"}`} >
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen  ">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
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
                                    </Transition.Child>
                                    <div className="flex h-full flex-col w-full overflow-y-scroll bg-white   shadow-xl">
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">{children}</div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
        // <Transition.Root show={open} as={Fragment}>
        //     <Dialog as="div" className="relative z-10   " onClose={setOpen}>
        //         <Transition.Child
        //             as={Fragment}
        //             enter="ease-in-out duration-500"
        //             enterFrom="opacity-0"
        //             enterTo="opacity-100"
        //             leave="ease-in-out duration-500"
        //             leaveFrom="opacity-100"
        //             leaveTo="opacity-0"
        //         >
        //             <Dialog.Overlay className="fixed inset-0 bg-blue-950 bg-opacity-70 " />
        //         </Transition.Child>

        //         <div className="fixed inset-0 overflow-hidden">
        //             <div className="absolute inset-0 overflow-hidden">
        //                 <div className="pointer-events-none fixed inset-y-0 right-0 flex  w-full  ">

        //                     <Transition.Child
        //                         as={Fragment}
        //                         enter="transition ease-in-out duration-300 transform"
        //                         enterFrom="translate-x-full"
        //                         enterTo="translate-x-0"
        //                         leave="transition ease-in-out duration-300 transform"
        //                         leaveFrom="translate-x-0"
        //                         leaveTo="translate-x-full"
        //                     >
        //                     <Dialog.Panel className={width ? `w-[50%] pointer-events-auto relative  ` : `w-[100%] pointer-events-auto relative overflow-scroll`}>
        //                             {/* ikona X */}
        //                             <div className=" bg-niebieski-6 opacity-70 hover:opacity-100 absolute z-30 top-0 right-0 flex items-center justify-end">
        //                                 <div
        //                                     className="flex items-center justify-center w-[40px] h-[40px]     cursor-pointer  transition-colors text-tlo hover:text-white  hover:bg-niebieski-6  "
        //                                 onClick={() => setOpen (false)}
        //                                 >
        //                                     <svg
        //                                         xmlns="http://www.w3.org/2000/svg"
        //                                         className="h-6 w-6"
        //                                         fill="none"
        //                                         viewBox="0 0 24 24"
        //                                         stroke="currentColor"
        //                                     >
        //                                         <path
        //                                             strokeLinecap="round"
        //                                             strokeLinejoin="round"
        //                                             strokeWidth={2}
        //                                             d="M6 18L18 6M6 6l12 12"
        //                                         />
        //                                     </svg>
        //                                 </div>
        //                             </div>
        //                             <div className="flex h-full flex-col   bg-white py-6 shadow-xl">
        //                                 {children}
        //                             </div>
        //                         </Dialog.Panel>
        //                     </Transition.Child>
        //                 </div>
        //             </div>
        //         </div>
        //     </Dialog>
        // </Transition.Root>




    )
}

export default TransitionWraper