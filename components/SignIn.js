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

function SignIn({ setCzyLogowanie, bezCofania }) {
  const dispatch = useDispatch();
  const router = useRouter()
 
  const [logowanie, setLogowanie] = useState(true)
  const [resetHaslo, setResetHaslo] = useState(false)
 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData


  const onSubmit = async (e) => {

    e.preventDefault();

    const response = await signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          console.log('Nieprawidłowe hasło');
        }
        if (error.code === 'auth/too-many-requests') {
          console.log(`Dostęp do tego konta został tymczasowo wyłączony z powodu wielu nieudanych prób logowania. Możesz je natychmiast przywrócić, resetując hasło lub spróbować ponownie później.`);
        }
        if (error.code === 'auth/user-not-found') {
          console.log('Nie znaleziono użytkownika');
        }
        else (
          console.log('Coś poszło nie tak')
        )
      })

    if (response) { 

      console.log(`Zalogowany ${response.user.email}`);
   

      dispatch(login({
        email: response.user.email,
        uid: response.user.uid,


      }))
        router.push(  '/wydatek' )
    }
    
    
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }


  return (


    <div className="flex flex-col justify-center items-center overflow-hidden  w-full md:w-3/4    shadow-lg   md:flex-row  rounded md:flex-1 lg:max-w-screen-md  border border-zielony2">

      {/* {loading ? <Spinner /> : */}
      <div className="p-5 relative overflow-auto   md:flex-1 ">


        {logowanie ?
          resetHaslo ?
            <ResetPassword setResetHaslo={setResetHaslo} />
            :
            <>
              {bezCofania ? null :
                <button
                  onClick={() => setCzyLogowanie(true)}
                  className='absolute top-4 right-4 cursor-pointer text-czerwony hover:text-uwaga-3 '>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                </button>}
              <h3 className="mt-4 mb-2 text-3xl font-semibold text-zielony-4">
                Logowanie
              </h3>
              <form onSubmit={onSubmit} className="flex flex-col    ">
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
                <div className='pt-2 flex justify-between'>
                  {!resetHaslo && !bezCofania ?
                    <>
                      <button
                        onClick={() => setLogowanie(false)} className=" hover:text-zielony2">
                        Zarejestruj
                      </button>

                    </>
                    : null}

                  {!resetHaslo ?
                    <button
                      onClick={() => setResetHaslo(true)}
                      className="  hover:text-zielony2">
                      Reset hasła
                    </button> : null}

                </div>
                <div className=" w-full flex items-center justify-center pt-4">
                  <button
                    onClick={onSubmit}
                    type="button"
                    className="bg-zielony2 hover:bg-zielony text-buttonHover  rounded cursor-pointer tracking-wider">
                    <p className="p-2 md:px-4">Zaloguj</p>
                  </button>
                </div>

              </form>

            </>
          :
          <SignUp setLogowanie={setLogowanie} />
        }

      </div>
    </div>


  )
}

export default SignIn
