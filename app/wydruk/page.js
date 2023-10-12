'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pdf from "../../components/Pdf"
import { login, logout, selectUser } from '../GlobalRedux/Features/counter/userSlice';
import { auth, onAuthStateChanged } from '../../firebase/config';
 
import Image from 'next/image'
import SignIn from "../../components/SignIn"
import wydatek from '../../public/wydatek.png'
function Wydruk() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

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
                                    className="cursor-pointer object-contain"
                                />
                            </div>
                        </div>
                    </div>
                    : <Pdf />
                }
            </div>
        </>
    );
}

export default Wydruk;