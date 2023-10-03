'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link';

import React, { Fragment, FunctionComponent, useEffect, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react'
function Nawigacja() {
    const [open, setOpen] = useState(false)
    const darkMenu = true;
    const pathname = usePathname();

    const navigation = [
        { name: "Główna", href: "/", current: true },
        { name: "Wydatek", href: "/wydatek", current: false },
        // { name: "Informacje", href: "/info", current: false },
        { name: "Login", href: "/logowanie", current: false },
     
    ];
    const [isCircleHidden, setCircleHidden] = useState(true)
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
        <>
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
                                                : "text-white outline-none  text-lg         transition   duration-500 cursor-pointer mr-6   font-semibold "
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

        </>

    )
}

export default Nawigacja