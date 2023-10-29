'use client'
import React, { Fragment, FunctionComponent, useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { login, logout, selectUser } from '../app/GlobalRedux/Features/counter/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { EmailAuthProvider, db, reauthenticateWithCredential, onAuthStateChanged, auth, deleteUser } from '../firebase/config';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { setDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore'
import Spinner from '../components/Spinner';
import { Dialog, Transition, Menu } from '@headlessui/react'
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { MdLockReset } from 'react-icons/md';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { useId } from "react"
import { setLoading } from '../app/GlobalRedux/Features/counter/loadingSlice';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { ToastContainer, toast } from 'react-toastify';
import dynamic from 'next/dynamic'

function Nawigacja() {
    let id = useId()
    const [open, setOpen] = useState(false)
    const user = useSelector(selectUser);
    const pathname = usePathname();
    const router = useRouter()
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading.loading)
    const [openModal, setOpenModal] = useState(false);
    const [openModalReset, setOpenModalReset] = useState(false);
    const [resetHaslo, setResetHaslo] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData
    const navigation = [ 
        { name: "Wydatek energetyczny", href: "/wydatek", current: false },
        { name: "Wymiar urlopu", href: "/wymiar", current: false },


    ];
    const [isCircleHidden, setCircleHidden] = useState(true)

    // useEffect(() => {

    //     onAuthStateChanged(auth, (userAuth) => {
    //         if (userAuth) {
    //             dispatch(
    //                 login({
    //                     email: userAuth.email,
    //                     uid: userAuth.uid,
    //                 })
    //             );
    //         } else {
    //             dispatch(logout());
    //         }
    //     });
    //     console.log('page loaded');

    // }, []);

    useEffect(() => {
        const windowScroll = () => {
            // if (document.body.scrollTop >= 1200 || document.documentElement.scrollTop >= 1200) 
            if (document.documentElement.scrollTop >= `${window.innerHeight}`) {
                setCircleHidden(!isCircleHidden);
            } else {
                setCircleHidden(isCircleHidden);
            }
        }

        window.addEventListener('scroll', (event) => {
            event.preventDefault();
            windowScroll();
        })
    }, []);




    return (
        <div className='flex items-center justify-between w-full'  >
            <div>
                <div className='flex md:hidden  '>
                    <div
                        className={
                            isCircleHidden ?
                                "   z-30    text-white     flex justify-center items-center cursor-pointer m-4 md:m-12  group"
                                : "fixed top-0  right-0 z-30  flex justify-center text-text2  items-center cursor-pointer backdrop-blur-sm m-4 md:m-12 group "

                        }
                        onClick={() => setOpen(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8 group-hover:text-zielony-1   transition-colors duration-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 9h16.5m-16.5 6.75h16.5"
                            />
                        </svg>
                        <p className="hidden md:block font-sans   p-2 text-lg font-medium tracking-wide group-hover:-translate-x-2 transition-transform duration-500">
                            MENU
                        </p>
                    </div>
                    <Transition.Root show={open} as={Fragment}>
                        <Dialog
                            as="div"
                            className="fixed inset-0 flex z-[100]   "
                            onClose={() => setOpen(false)}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-niebieski-9  bg-opacity-70 " />
                            </Transition.Child>
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="ml-auto relative w-5/6 md:w-1/2  h-full rounded-sm bg-niebieski-9  flex flex-col z-4000 items-start justify-center pl-12 md:pl-24  ">
                                    {/* ikona X */}
                                    <div
                                        className="absolute top-0 right-0 z-40  text-white flex justify-center items-center cursor-pointer   m-4 md:m-12 group"
                                        onClick={() => setOpen(false)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-8 h-8 group-hover:text-zielony-1  transition-colors duration-500"
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

                                        <p className="hidden md:block font-sans p-2 text-lg font-medium tracking-wide group-hover:-translate-x-2 transition-transform duration-500 ">
                                            CLOSE
                                        </p>
                                    </div>
                                    {navigation.map((item) => (
                                        <Link
                                            href={{
                                                pathname: `${item.href}`,
                                                // query: { state: true },
                                            }}
                                            key={item.name}
                                            onClick={() => setOpen(false)}
                                            className={
                                                pathname === item.href
                                                    ? " text-zielony-1 outline-none text-lg   font-semibold  mr-6 "
                                                    : "text-white outline-none  text-lg    pb-2     transition   duration-500 cursor-pointer mr-6   font-semibold "
                                            }
                                        >
                                            {item.name.toUpperCase()}
                                        </Link>
                                    ))}
                                </div>
                            </Transition.Child>
                        </Dialog>
                    </Transition.Root>


                </div>
                <div className='hidden md:flex'>
                    {navigation.map((item) => (
                        <Link
                            href={{
                                pathname: `${item.href}`,
                                // query: { state: true },
                            }}
                            key={item.name}
                            className={
                                pathname === item.href
                                    ? " text-zielony-1 outline-none text-lg   font-semibold  mr-6 "
                                    : "text-white outline-none  text-lg         transition   duration-500 cursor-pointer mr-6   font-semibold "
                            }
                        >
                            {item.name.toUpperCase()}
                        </Link>
                    ))}
                </div>
            </div>
            <div className=" ">
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button data-id={id} as="div" className={" flex items-center  text-zielony-1 outline-none text-lg font-semibold mr-6 "}>
                        {user ? (
                            <div className="flex items-center justify-center h-8 w-8   rounded-full bg-zielony-1 text-white hover:text-niebieski-10 cursor-pointer transform transition-all ">
                                <p className=''>{user.email.charAt(0).toUpperCase()}</p>
                            </div>
                        ) : (
                            <button
                                className='text-white hover:text-zielony-1 transform transition-all flex items-center border-2 rounded-3xl p-2 py-[5px] cursor-pointer text-sm'
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                <Link href={{ pathname: '/logowanie', }}>
                                    Logowanie
                                </Link>
                            </button>
                        )}
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-2 mt-2 w-56   shadow-lg rounded-md   focus:outline-none">
                            {user ?
                                <>
                                    
                                        <Menu.Item className='rounded-t-md bg-niebieski-6 p-2 pb-3 text-white'>
                                            <div  >
                                                <h3 className='text-zielony-1'>Zalogowany </h3>
                                                <h3 className='pt-1'>{user.email}</h3>
                                            </div>
                                        </Menu.Item>
                                 
                                    <div className="p-2 rounded-b-md bg-white text-czarny">
                                        <Menu.Item>
                                            <Link href={
                                                {pathname: '/logowanie',}}>        
                                                <button
                                                    
                                                    className="hover:bg-zielony-1 hover:bg-opacity-50 text-czarny hover:text-black transform transition-all 
                                                         flex w-full items-center rounded-md px-2 py-2 text-sm  "
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 hover:text-black">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                                                    </svg>
                                                    Ustawienia
                                                </button>
                                            </Link>
                                        </Menu.Item>
                                    </div>
                                </> : null
                            }
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>)
}

export default Nawigacja
 