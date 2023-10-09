import { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useDispatch, useSelector } from "react-redux";
import Input from '../components/Input'
import { login } from '../app/GlobalRedux/Features/counter/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import Modal from "./Modal";
import { setLoading } from '../app/GlobalRedux/Features/counter/loadingSlice';
function SignUp({ setLogowanie }) {
  const loading = useSelector(state => state.loading.loading)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch();
  const [potwierdzenieRegulaminu, setPotwierdzenieRegulaminu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const handlePotwierdzenieRegulaminu = () => {
    setPotwierdzenieRegulaminu(true);
    setOpenModal(false)
  };
  const handleNiePotwierdzenieRegulaminu = () => {
    setPotwierdzenieRegulaminu(false);
    setOpenModal(false)
  };
  const onSubmit = async (e) => {
    e.preventDefault()

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
        <form onSubmit={onSubmit} className="flex  flex-col px-4 w-full  pt-2 justify-between h-full">
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

          <div className="flex items-center pb-4   pt-2  ">
            <input
              type="checkbox"
              checked={potwierdzenieRegulaminu}
              onChange={()=>setPotwierdzenieRegulaminu(!potwierdzenieRegulaminu)}
              className="md:w-6 md:h-6 text-zielony-1 bg-niebieski-2 border-niebieski-9 rounded focus:ring-zielony-1    focus:ring-2    " />

            <div className="ml-2  md:text-lg flex items-center  text-gray-900  ">
              <h3>Potwierdzam zapoznanie się z </h3>
              <div
                onClick={() => setOpenModal(true)}
                className="text-czerwony pl-1 hover:text-zielony-1 md:text-lg cursor-pointer">Regulaminem
              </div>
            </div>
          </div>
          {potwierdzenieRegulaminu ?
            <div className='w-full flex justify-end   pb-4 '>
              <div className="flex w-[120px]  text-niebieski-10   ">
                <div className=" w-full  h-full   flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-niebieski-10 bg-zielony-1 text-white    cursor-pointer tracking-wider transition duration-300  "
                  onClick={onSubmit}>
                  <h2 className="transition duration-300">  Rejestruj</h2>
                </div>
              </div>
            </div>
            :
            <div className='w-full flex justify-end self-end  pb-4 '>
              <div className="flex w-[120px]  text-niebieski-10   ">
                <div disabled className=" w-full  h-full   flex justify-center items-center  py-3   text-xl rounded-md font-bold h  bg-szary-5 text-white      tracking-wider transition duration-300  "
                >
                  <h2 className="transition duration-300">  Rejestruj   </h2>
                </div>
              </div>
            </div>
          }


        </form>
      </div >
      <Modal
        setOpenModal={setOpenModal}
        openModal={openModal}>
        <div className="w-full flex     rounded flex-col bg-white ">

          <div className="relative inline-block align-bottom bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all   sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4   pb-2 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="text-center p-2 flex-auto justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 sm:w-16 sm:16 flex items-center text-error-2 mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h2 className="text-xl font-bold py-4 tex-text">
                   REGULAMIN
                  </h2>
                  <p className="text-sm text-textAccent px-4">
                    Wszystkie dane zostaną trwale usunięte. Tej czynności
                    nie można cofnąć.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-niebieski-6 px-4 py-3 sm:px-6 flex flex-row-reverse">
              <button
                type="button"
                className="text-uwaga-3 bg-white rounded-sm flex items-center justify-center   hover:bg-uwaga-3 hover:text-white  transition-colors  font-medium   text-sm w-1/5 px-3 py-2.5 text-center  focus:outline-none  "
                onClick={handlePotwierdzenieRegulaminu}
              >
                Tak
              </button>
              <button
                type="button"
                className="  text-text bg-white rounded-sm flex items-center justify-center hover:bg-niebieski-buttonHover hover:text-textPrimary  transition-colors font-medium text-sm w-1/5 px-3 py-2.5 text-center  mr-2  "
                onClick={handleNiePotwierdzenieRegulaminu}
              // ref={cancelButtonRef}
              >
                <h1>NIE</h1>
              </button>
            </div>
          </div>

        </div>
      </Modal>
    </>




  )
}

export default SignUp
