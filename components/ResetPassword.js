import { useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useDispatch, useSelector } from "react-redux";
// import * as authActions from "../redux/actions/auth";
import Input from './Input'
 
 

function ResetPassword({ setResetHaslo }) {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch();
  const onChange = (e) => setEmail(e.target.value)
  // const { loading } = useSelector((state) => state.auth)

  const onSubmit = async (e) => {
 
    e.preventDefault()
    // dispatch(authActions.setLoading(true))
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)

     console.log(`Link wysłay pod adres ${email}` );





      setResetHaslo(false)
      // dispatch(authActions.setLoading(false))
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log(`nie znaleziono użytkownika` );
        // dispatch(authActions.setLoading(false))
      }
      else {
        console.log(`coś nie tak` );
        // dispatch(authActions.setLoading(false))
      }
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    }

  }

  return (
    <>

      {/* {loading && <Spinner />} */}

      <button
        onClick={() => setResetHaslo(false)}
        className='absolute top-4 right-4 cursor-pointer text-czerwony hover:text-uwaga-3 '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
      </button>
      <h3 className="my-4 text-2xl font-bold text-zielony-4">
        Reset hasła
      </h3>
      <form onSubmit={onSubmit} className="flex flex-col space-y-5">
        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={onChange} />
        <div className=" w-full flex items-center justify-center">
          <button
            onClick={onSubmit}
            type="button"
            className="bg-zielony2 hover:bg-zielony text-buttonHover  rounded cursor-pointer tracking-wider">
            <p className="p-2 md:px-4">Wyślij link</p>
          </button>


        </div>

      </form>





    </>
  )
}

export default ResetPassword
