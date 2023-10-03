'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../GlobalRedux/Features/counter/userSlice';
import { setLoading } from '../GlobalRedux/Features/counter/loadingSlice';
import Spinner from "../../components/Spinner"
import { auth, onAuthStateChanged } from '../../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import SignIn from "../../components/SignIn"


function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading.loading)
   
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
    const logoutOfApp = () => {
        dispatch(setLoading(true))
        toast.info(`Wylogowałeś się`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        dispatch(logout());

        auth.signOut();
        dispatch(setLoading(false))
    };


    return (
        <>
            <ToastContainer />


            <div className='flex flex-col md:flex-row items-center justify-center overflow-hidden w-full h-[calc(100vh_-_92px)]'>
                <div className='flex items-center justify-center w-[95%] md:w-1/2 h-screen'>

                    {loading ? <Spinner /> : user ?
                        <div className='flex   flex-col   '>
                            <h1 className='text-2xl text-center text-niebieski-7'>Jesteś zalogowany jako <span className='font-bold text-niebieski-3'>{user.email}</span>
                            </h1>
                            <div className='pt-10 w-full flex justify-end'>
                                <div className="  w-1/3  h-full   flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-zielony-1 bg-niebieski-6  text-white cursor-pointer tracking-wider transition duration-300  "
                                    onClick={logoutOfApp}>
                                    <h2 className="transition duration-300">Wyloguj</h2>
                                </div>
                            </div>
                        </div>
                        :
                        <SignIn />
                    }
                </div>

                <div className='hidden md:flex w-1/2 h-full bg-niebieski-6 items-center justify-center text-zielony-1  '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-96 h-96">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                </div>
            </div>



        </>
    );
}

export default App;