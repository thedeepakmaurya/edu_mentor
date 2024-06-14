import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";


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

export const FirebaseProvider = ({children}) => {
    return (
        <FirebaseContext.Provider >
            {children}
        </FirebaseContext.Provider>
    )
}