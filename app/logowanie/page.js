'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { login, logout, selectUser } from '../GlobalRedux/Features/counter/userSlice'; 
import { auth, onAuthStateChanged } from '../../firebase/config';
 
 import SignIn from "../../components/SignIn"

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
 console.log(user)
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
        // dispatch to the store with the logout action
        dispatch(logout());
        // sign out function from firebase
        auth.signOut();
    };

 
    return (
        <div  >   
            {user ? <h1>zalogowany {user.email}</h1>:
             <SignIn/> 
            
        }  
            <button onClick={logoutOfApp}>Logout</button>      
               
        </div>
    );
}

export default App;