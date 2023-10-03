'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pdf from "../../components/Pdf"
import { login, logout, selectUser } from '../GlobalRedux/Features/counter/userSlice';
import { auth, onAuthStateChanged } from '../../firebase/config';
 
import SignIn from "../../components/SignIn"

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
                    <>
                        <div className='flex items-center justify-center w-[95%]  md:w-1/2 h-screen  '>
                            <SignIn />
                        </div>
                        <div className='hidden md:flex w-1/2 h-full bg-niebieski-6 items-center justify-center text-zielony-1  '>
                            <h1>pdf</h1>
                        </div>
                    </>
                    : <Pdf />
                }
            </div>
        </>
    );
}

export default Wydruk;