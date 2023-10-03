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
import { ToastContainer, toast } from 'react-toastify';

function SignUp({ setLogowanie }) {
  const [loading, setLoading] = useState(false)
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
     setLoading(true) 
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
        toast.success(`Zarejestrowany ${response.user.email}`, {
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

  setLoading(false) 


    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (error.code === 'auth/email-already-in-use') {
        console.log(`Email już jest zarejestrowany`);
        toast.warn(`Email już jest zarejestrowany`, {
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


      console.log(errorMessage)

    
    }
  }

  return (
    <>
      <ToastContainer />



      <div className='flex flex-col w-full  h-full'>
        <div className="w-full  py-2 bg-niebieski-6    rounded-t-md text-white flex justify-between  items-center  ">
          <div className="flex relative  w-full text-lg pl-4 ">
            <button
              onClick={() => setLogowanie(true)}
              className='absolute top-4 right-4 cursor-pointer text-buttonHover hover:text-zielony-1 '>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
            </button>
            <h3 className="  py-4  text-3xl font-semibold  ">
              Rejestracja
            </h3>
          </div>
        </div>
        <form onSubmit={onSubmit} className="flex  flex-col px-4 w-full h-full pt-2 justify-between ">
          <div>
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
          </div>


          <div className='w-full flex justify-end   pb-4 '>
            <div className="flex w-[120px]  text-niebieski-10   ">
              <div className=" w-full  h-full   flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-niebieski-10 bg-zielony-1 text-white    cursor-pointer tracking-wider transition duration-300  "
                onClick={onSubmit}>
                <h2 className="transition duration-300">  Rejestruj</h2>
              </div>
            </div>
          </div>

        </form>
      </div >
    </>




  )
}

export default SignUp
