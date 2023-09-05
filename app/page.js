'use client'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image'
import { login, logout, selectUser } from '../app/GlobalRedux/Features/counter/userSlice';
import { auth, onAuthStateChanged } from '../firebase/config';
import { useRouter } from 'next/navigation'

function Page() {
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
    <div className='flex flex-col md:flex-row items-center justify-center  w-full h-full p-6 md:p-32 bg-niebieski-7'>
      <div className='flex flex-col     '>
        <h1 className='text-white text-3xl md:text-7xl font-bold pb-3'>Lorem Ipsum is  </h1>
        <h2 className='text-zielony-1 text-5xl md:text-8xl font-bold'>It has survived  </h2>
        <p className='text-white text-xl w-full md:w-1/2 pt-20 leading-9'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
       
      </div>
      <div className='hidden md:flex items-center text-zielony-1  '>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-96 h-96">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>  
        

      </div>

    </div>

  );
}

export default Page; 
