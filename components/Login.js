import React, { useState } from 'react';
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from '../firebase/config';
import { useDispatch } from 'react-redux';
 

 
import {
    collection,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    doc,
    deleteDoc,
    updateDoc,
    onSnapshot,
    addDoc,
    startAfter,
    serverTimestamp,
    setDoc
} from 'firebase/firestore'
import { getStorage, ref, deleteObject, listAll } from "firebase/storage";
import { db } from '../firebase/config'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const loginToApp = async (e) => {
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
            console.log(response)
        // if (response) {

        //     const docRef = doc(db, 'users', response.user.uid)
        //     const docSnap = await getDoc(docRef);

        //     console.log(`Zalogowany ${response.user.email}`);
        //     dispatch(
        //         login({

        //             email: docSnap.data().email,
        //             uid: response.user.uid,
        //             displayName: docSnap.data().displayName,

        //         }))

        // }






    }

    const register = () => {
        if (!name) {
            return alert('Please enter a full name');
        }

        console.log('register the user');

        createUserWithEmailAndPassword(auth, email, password)
            .then((userAuth) => {
                updateProfile(userAuth.user, {
                    displayName: name,

                })
                    .then(
                        dispatch(
                            login({
                                email: userAuth.user.email,
                                uid: userAuth.user.uid,
                                displayName: name,

                            })
                        )
                    )
                    .catch((error) => {
                        console.log('user not updated');
                    });
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div  >

            <form>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Full name (required if registering)'
                    type='text'
                />


                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    type='email'
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    type='password'
                />
                <button type='submit' onClick={loginToApp}>
                    Sign In
                </button>
            </form>

            <p>
                Not a member?{' '}
                <span className='login__register' onClick={register}>
                    Register Now
                </span>
            </p>
        </div>
    );
}

export default Login;