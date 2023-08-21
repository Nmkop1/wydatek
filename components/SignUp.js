import { useState } from 'react'


import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

import { useDispatch } from "react-redux";

import Input from '../components/Input'
import { login } from '../app/GlobalRedux/Features/counter/userSlice';

function SignUp({ setLogowanie }) {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({

    email: '',
    password: '',

  })


  const dispatch = useDispatch();

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    // dispatch(authActions.setLoading(true))
    try {
      const auth = getAuth()

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      console.log(response)
      if (response) {
        console.log(`Zarejestrowany ${email}`);
        const user = response.user.uid

        const formDataCopy = { ...formData, user }

        delete formDataCopy.password
        formDataCopy.timestamp = serverTimestamp()

        await setDoc(doc(db, 'users', user), formDataCopy)
         

        dispatch(login({
          email: response.user.email,
          uid: response.user.uid,


        }))
      }




    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (error.code === 'auth/email-already-in-use') {
        console.log(`Email już jest zarejestrowany`);
      }

     
      console.log(errorMessage)
      
      // dispatch(authActions.setLoading(false))
    }
  }

  return (
    <>
      <button
        onClick={() => setLogowanie(true)}
        className='absolute top-4 right-4 cursor-pointer text-czerwony hover:text-uwaga-3 '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
      </button>
      <h3 className="my-4 text-2xl font-bold text-zielony-4">
        Rejstracja
      </h3>
      <form onSubmit={onSubmit} className="flex flex-col space-y-5">


        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={onChange} />
        <Input
          label="Hasło"
          type={showPassword ? 'text' : 'password'}
          id='password'
          value={password}
          onChange={onChange}
        />

        <div className=" w-full flex items-center justify-center">
          <button
            onClick={onSubmit}
            type="button"
            className="bg-zielony2 hover:bg-zielony text-buttonHover  rounded cursor-pointer tracking-wider">
            <p className="p-2 md:px-4">Rejestruj</p>
          </button>
        </div>
      </form>
    </>




  )
}

export default SignUp
