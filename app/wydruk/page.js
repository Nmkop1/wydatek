'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PdfWydatek from "../../components/PdfWydatek"
import PdfWymiar from "../../components/PdfWymiar"
import { login, logout, selectUser } from '../GlobalRedux/Features/counter/userSlice';
import { auth, onAuthStateChanged } from '../../firebase/config';
import {  useSearchParams } from 'next/navigation'
import Image from 'next/image'
import SignIn from "../../components/SignIn"
import wydatek from '../../public/wydatek.png'

function Wydruk() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const searchParams  = useSearchParams()
    const results  = searchParams.get("pdf")
    const pdf = JSON.parse(results)
    
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
  
    const functionPdf = (pdf) => {

        switch (true) {
            case (pdf==="wydatek"):
                return <PdfWydatek/>

            case (pdf === "wymiar"):
                return <PdfWymiar/>

            // case (between(parameter, 2930, 4186)):
            //     return "umiarkowana"

            // case (between(parameter, 4187, 5024)):
            //     return "ciężka"

            // case (parameter > 5024):
            //     return "bardzo ciężka"

            default:
                return <h3 className=" text-base font-bold text-zielony-3">
                    zero
                </h3>
        }
    }



    return (
        <>
            <div className='flex md:hidden flex-col md:flex-row items-center justify-center  w-full h-[calc(100vh_-_92px)]      '>
                <h1>Wydruk możliwy jedynie na komputerach</h1>
            </div>
            <div className='hidden md:flex flex-col md:flex-row items-center justify-center  w-full h-[calc(100vh_-_92px)]      '>
                {!user ?
                    <div className='w-full flex h-full'>
                        <div className='flex flex-col    justify-center w-[95%]  md:w-1/2 h-full   '>
                            <div className='px-6 text-center '>
                                <h2 className='pb-2 text-2xl'>Wydruk możliwy jedynie dla zarejestrowanych i zalogowanych użytkowników</h2>
                                <h2 className='pb-2 text-xl '>Zarejestruj się podając e-mail i ustawiając hasło - to nic nie kosztuje</h2>
                                 
                            </div>

                            <div className='w-full flex justify-center pt-8'>
                                <SignIn />
                            </div>

                        </div>
                        <div className='hidden md:flex w-1/2 h-full bg-niebieski-6 items-center justify-center text-zielony-1  '>
                            <div className="relative   w-3/4  h-3/4  ">
                                <Image
                                    src={wydatek}
                                   
                                    fill
                                    alt="Picture of the author"
                                    className=" object-contain"
                                />
                            </div>
                        </div>
                    </div>
                    : functionPdf(pdf)
                }
            </div>
        </>
    );
}

export default Wydruk;