import { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useDispatch, useSelector } from "react-redux"; 
import Input from './Input'
import { ToastContainer, toast } from 'react-toastify';
 

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
        console.log(`Nie znaleziono użytkownika` );
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
      <ToastContainer />
      <div className='flex flex-col w-full  h-full'>
        <div className="w-full  py-2 bg-niebieski-6    rounded-t-md text-white flex justify-between  items-center  ">
          <div className="flex relative  w-full text-lg pl-4 ">
            <button
              onClick={() => setResetHaslo(false)}
              className='absolute top-4 right-4 cursor-pointer text-buttonHover hover:text-zielony-1 '>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
            </button>
            <h3 className="  py-4  text-3xl font-semibold  ">
             Reset hasła
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
          </div>
          <div className='w-full flex justify-end   pb-4 '>
            <div className="flex w-[120px]  text-niebieski-10   ">
              <div className=" w-full  h-full   flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-niebieski-10 bg-zielony-1 text-white    cursor-pointer tracking-wider transition duration-300  "
                onClick={onSubmit}>
                <h2 className="transition duration-300">Wyślij link</h2>
              </div>
            </div>
          </div>
        </form>
      </div >
    </>
  )
}

export default ResetPassword
