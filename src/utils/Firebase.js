import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyC6sALs6MsveyZqnX4G4xDS1h2bX3v87XY",
    authDomain: "edumentor-7be2b.firebaseapp.com",
    projectId: "edumentor-7be2b",
    storageBucket: "edumentor-7be2b.appspot.com",
    messagingSenderId: "326583828239",
    appId: "1:326583828239:web:78afa1486c1f4121d1487a"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp);

export const FirebaseProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
     onAuthStateChanged(firebaseAuth, user => {
         if(user) setUser(user);
         else setUser(null);
     })
    },[])

    const signupUser = (email, password) =>
        createUserWithEmailAndPassword(firebaseAuth, email, password);

    const signinUser = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);


    const isLoggedIn = user? true : false;

    return (
        <FirebaseContext.Provider value={{ signupUser, signinUser, isLoggedIn }}>
            {children}
        </FirebaseContext.Provider>
    )
}