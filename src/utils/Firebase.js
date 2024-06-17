import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";


//Firebase Context
const FirebaseContext = createContext(null);

//Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyC6sALs6MsveyZqnX4G4xDS1h2bX3v87XY",
    authDomain: "edumentor-7be2b.firebaseapp.com",
    projectId: "edumentor-7be2b",
    storageBucket: "edumentor-7be2b.appspot.com",
    messagingSenderId: "326583828239",
    appId: "1:326583828239:web:78afa1486c1f4121d1487a"
};

//using firbaseContext as custom hook(useFirbase)
export const useFirebase = () => useContext(FirebaseContext);

//initilize firebase
const firebaseApp = initializeApp(firebaseConfig)
//initilize authentication
const firebaseAuth = getAuth(firebaseApp);
//initialize firestore
const firestore = getFirestore(firebaseApp);    


// Firbase Provider
export const FirebaseProvider = ({ children }) => {

    //user State
    const [user, setUser] = useState(null);
    console.log(user)

    //chekck if user login or not
    useEffect(() => {
     onAuthStateChanged(firebaseAuth, user => {
         if(user) setUser(user);
         else setUser(null);
     })
    },[])

    const isLoggedIn = user ? true : false;

    //student signup function
    const signupUser = (email, password) =>
        createUserWithEmailAndPassword(firebaseAuth, email, password);

    //student signin function
    const signinUser = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);

    //signOut user
    const signOutUser = () => {
        firebaseAuth.signOut().then(() => {
            setUser(null);
        })
    }

    //add teacher function in admin pannel
    const handleAddTeacher = async (firstname, lastname, email, password, gender, department, subject) => {
        return await addDoc(collection(firestore, 'teachers'), {
            firstname,
            lastname,
            email,
            password,
            gender,
            department,
            subject,
            userID: user.uid,
            userEmail: user.email,
        })
    }

    //add student in firestore
    const handleAddStudent = async (firstname, lastname, email, contact, address, state, password) => {
        return await addDoc(collection(firestore, 'teachers'), {
            firstname,
            lastname,
            email,
            contact,
            address,
            state,
            password,
        })
    }

    return (
        <FirebaseContext.Provider value={{ signupUser, signinUser, signOutUser, isLoggedIn, handleAddTeacher, handleAddStudent }}>
            {children}
        </FirebaseContext.Provider>
    )
}