
import { useState } from 'react'
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from '../firebase/config';
import { useRouter } from 'next/navigation'
import Input from '../components/Input'
import { useDispatch, useSelector } from "react-redux";
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import { login } from '../app/GlobalRedux/Features/counter/userSlice';
import { setLoading } from '../app/GlobalRedux/Features/counter/loadingSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../components/Spinner"

function SignIn({ bezCofania }) {
  const dispatch = useDispatch();
  const router = useRouter()
  const loading = useSelector(state => state.loading.loading)
 
  const [logowanie, setLogowanie] = useState(true)
  const [resetHaslo, setResetHaslo] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  
  const onSubmit = async (e) => {

    e.preventDefault();
    dispatch(setLoading(true))

    const response = await signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
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
        if (error.code === 'auth/too-many-requests') {
          console.log(`Dostęp do tego konta został tymczasowo wyłączony z powodu wielu nieudanych prób logowania. Możesz je natychmiast przywrócić, resetując hasło lub spróbować ponownie później.`);
          toast.error('Dostęp do tego konta został tymczasowo wyłączony z powodu wielu nieudanych prób logowania. Możesz je natychmiast przywrócić, resetując hasło lub spróbować ponownie później', {
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
        if (error.code === 'auth/user-not-found') {
          console.log('Nie znaleziono użytkownika');
          toast.error('Nie znaleziono użytkownika', {
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
        dispatch(setLoading(false)) } )

    if (response) {

      console.log(`Zalogowany ${response.user.email}`);
      toast.success(`Zalogowany ${response.user.email}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      dispatch(login({
        email: response.user.email,
        uid: response.user.uid,


      }))
      dispatch(setLoading(false))

      // router.push('/wydatek')
    }


  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }


  return (
    <>
      {loading ? <Spinner /> :
        <>

          <div className="flex   justify-center items-center overflow-hidden  w-full md:w-3/4       rounded  h-full   ">
            <ToastContainer />

            <div className="w-full h-[390px]   bg-niebieski-1 ">


              {logowanie ?
                resetHaslo ?
                  <ResetPassword setResetHaslo={setResetHaslo} />
                  :
                  <div className='flex flex-col w-full h-full  '>
                    <div className="w-full  py-2 bg-niebieski-6    rounded-t-md text-white flex justify-between  items-center  ">
                      <div className="flex   w-full text-lg pl-4 ">
                        <h3 className="  py-4  text-3xl font-semibold  ">
                          Logowanie
                        </h3>
                      </div>
                    </div>
                    <form onSubmit={onSubmit} className="flex   flex-col px-4 w-full h-full pt-2 justify-between ">
                      <div>
                        <Input
                          label="Email"
                          type="email"
                          id="email"
                          value={email}
                          onChange={onChange} />
                        <Input
                          label="Hasło"
                          type='password'
                          id='password'
                          value={password}
                          onChange={onChange}
                        />
                        <div className='   flex justify-between'>
                          {!resetHaslo && !bezCofania ?
                            <>
                              <button
                                onClick={() => setLogowanie(false)} className="text-niebieski-6 hover:text-niebieski-10 ">
                                Zarejestruj
                              </button>

                            </>
                            : null}

                          {!resetHaslo ?
                            <button
                              onClick={() => setResetHaslo(true)}
                              className="text-niebieski-6 hover:text-niebieski-10">
                              Reset hasła
                            </button> : null}

                        </div>
                      </div>

                      <div className='w-full flex justify-end  pb-4'>
                        <div className="flex w-[120px]  text-niebieski-10   ">
                          <div className=" w-full  h-full   flex justify-center items-center  py-3   text-xl rounded-md font-bold hover:bg-niebieski-10 bg-zielony-1 text-white    cursor-pointer tracking-wider transition duration-300  "
                            onClick={onSubmit}>
                            <h2 className="transition duration-300"> Zaloguj</h2>
                          </div>
                        </div>
                      </div>

                   
                     </form>
                  </div>
                :
                <SignUp setLogowanie={setLogowanie} />
              }

            </div>
          </div>
         
        </>
      }
    </>

  )
}

export default SignIn
