'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../GlobalRedux/Features/counter/userSlice';
import { setLoading } from '../GlobalRedux/Features/counter/loadingSlice';
import Spinner from "../../components/Spinner"

import { EmailAuthProvider, db, reauthenticateWithCredential, onAuthStateChanged, auth, deleteUser } from '../../firebase/config';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { setDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import SignIn from "../../components/SignIn"
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import ResetPassword from '../../components/ResetPassword';
function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const router = useRouter()
    const loading = useSelector(state => state.loading.loading)
    const [openModal, setOpenModal] = useState(false);
    const [openModalReset, setOpenModalReset] = useState(false);
    const [resetHaslo, setResetHaslo] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

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
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(setLoading(true))
        try {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                `${password}`
            )
            const result = await reauthenticateWithCredential(
                auth.currentUser,
                credential
            )

          await deleteUser(result.user)
            const userDelete  = {
                userDelete: result.user.reloadUserInfo,
                timeDelete: serverTimestamp(),    
            }
     
            await deleteDoc(doc(db, "users", result.user.uid))
            await setDoc(doc(db, 'deleteUsers', result.user.uid), userDelete) 

            console.log("success in deleting")
            toast.success(`Usunieto konto`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            dispatch(setLoading(false))


        }
        catch (error) {
            console.log(error)
            if (error.code === 'auth/missing-password') {
                console.log('Nieprawidłowe hasło');
                toast.error('Nieprawidłowe hasło', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else (
                console.log('Coś poszło nie tak')
            )
            dispatch(setLoading(false))
        }
        setOpenModal(false)

    }
    const onSubmitReset = async (e) => {

        e.preventDefault()
        // dispatch(authActions.setLoading(true))
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)

            console.log(`Link wysłay pod adres ${email}`);
            toast.success(`Link wysłay pod adres ${email}`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });




            setResetHaslo(false)
            // dispatch(authActions.setLoading(false))
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                console.log(`Nie znaleziono użytkownika`);
                toast.warn(`Nie znaleziono użytkownika`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // dispatch(authActions.setLoading(false))
            }
            else {
                console.log(`coś nie tak`);
                // dispatch(authActions.setLoading(false))
            }
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        }

    }

    return (
        <>
            <ToastContainer />


            <div className='flex flex-col md:flex-row items-center justify-center overflow-hidden w-full h-[calc(100vh_-_85px)]'>
                <div className='flex items-center justify-center w-[95%] md:w-1/2 h-screen'>

                    {loading ? <Spinner /> : user ?
                        <div className='flex   flex-col   '>
                            <h1 className='text-2xl text-center text-niebieski-7'>Jesteś zalogowany jako <span className='font-bold text-niebieski-3'>{user.email}</span>
                            </h1>
                            <div className='flex justify-end w-full   pt-10 '>

                                <div className="  w-1/3  h-full   flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-zielony-1 bg-niebieski-6  text-white cursor-pointer tracking-wider transition duration-300  "
                                    onClick={logoutOfApp}>
                                    <h2 className="transition duration-300">Wyloguj</h2>
                                </div>


                                <div className="  w-1/3  h-full ml-6  flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-zielony-1 bg-niebieski-6  text-white cursor-pointer tracking-wider transition duration-300  "
                                    onClick={() => setOpenModal(true)}
                                >
                                    <h2 className="transition duration-300">Usuń</h2>
                                </div>
                                
                                
                                <div className="  w-1/3  h-full ml-6  flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-zielony-1 bg-niebieski-6  text-white cursor-pointer tracking-wider transition duration-300  "
                                    onClick={() => setOpenModalReset(true)}
                                >
                                    <h2 className="transition duration-300">Reset</h2>
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
            <Modal
                setOpenModal={setOpenModal}
                openModal={openModal}>
                <div className="w-full flex     rounded flex-col bg-white ">

                    <div className="relative inline-block align-bottom bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all   sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4   pb-2 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="text-center p-2 flex-auto justify-center">

                                    {/* <TiUserDeleteOutline className="w-12 h-12 sm:w-16 sm:16 flex items-center text-error-2 mx-auto" /> */}
                                    <h2 className="text-xl font-bold py-4 tex-text">
                                        Czy na pewno chcesz usunąć konto?
                                    </h2>
                                    <p className="text-sm text-textAccent px-4">
                                        Przed usunięciem musisz podać hasło logowania.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={onSubmit} className="flex  flex-col px-4 w-full    justify-between  ">
                            <div>
                                <Input
                                    type={'password'}
                                    id='password'
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>
                        </form>
                        <div className="bg-niebieski-6 px-4 py-3 sm:px-6 flex flex-row-reverse">
                            <div className="flex    text-niebieski-10   ">
                                <div className=" w-full  h-full  px-4 flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-error-3  bg-uwaga-3 text-white cursor-pointer tracking-wider transition duration-300  "
                                    onClick={onSubmit}>
                                    <h2 className="transition duration-300">TAK</h2>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="    px-4 flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-niebieski-10 bg-niebieski-9  mr-4 text-white    cursor-pointer tracking-wider transition duration-300  "
                                onClick={() => setOpenModal(false)}

                            >
                                <h1 className="transition duration-300">Anuluj</h1>
                            </button>

                        </div>

                    </div>

                </div>
            </Modal>
            <Modal
                setOpenModal={setOpenModalReset}
                openModal={openModalReset}>
                <div className="w-full flex     rounded flex-col bg-white ">

                    <div className="relative inline-block align-bottom bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all   sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4   py-2  pt-4  ">
                            <div className="sm:flex sm:items-start">
                                <div className="   flex-auto  ">


                                    {/* <MdLockReset className="w-12 h-12 sm:w-16 sm:16 flex items-center text-error-2 mx-auto" /> */}
                                    <h2 className="text-xl font-bold py-4 tex-text">
                                        Zmiana hasła logowania
                                    </h2>
                                    <p className="text-sm text-textAccent px-4">
                                        1. Zostaniesz wylogowany.
                                    </p>
                                    <p className="text-sm text-textAccent px-4">
                                        2. Na adres rejestracji swojego konta, zostanie wysłany link do zmiany hasła.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={onSubmit} className="flex  flex-col px-4 w-full   justify-between ">
                            <div>

                                <Input
                                    label="Podaj e-mail"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={onChange} />
                            </div>

                        </form>
                        <div className="bg-niebieski-6 px-4 py-3 sm:px-6 flex flex-row-reverse">
                            <div className="flex    text-niebieski-10   ">
                                <div className=" w-full  h-full  px-4 flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-niebieski-10 bg-zielony-1 text-white    cursor-pointer tracking-wider transition duration-300  "
                                    onClick={onSubmitReset}>
                                    <h2 className="transition duration-300">Wyślij link</h2>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="    px-4 flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-niebieski-10 bg-niebieski-9  mr-4 text-white    cursor-pointer tracking-wider transition duration-300  "
                                onClick={() => setOpenModalReset(false)}
                            // ref={cancelButtonRef}
                            >
                                <h1 className="transition duration-300">Anuluj</h1>
                            </button>
                        </div>

                    </div>

                </div>
            </Modal>
        </>
    );
}

export default App;