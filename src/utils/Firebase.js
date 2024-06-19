import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { addDoc, doc, collection, getFirestore, getDocs, getDoc, deleteDoc } from "firebase/firestore";


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

// Helper function to determine user role
const getUserRole = async (uid) => {
    const adminDoc = await getDoc(doc(firestore, "admin", uid));
    if (adminDoc.exists()) return "admin";

    const teacherDoc = await getDoc(doc(firestore, "teachers", uid));
    if (teacherDoc.exists()) return "teacher";

    const studentDoc = await getDoc(doc(firestore, "students", uid));
    if (studentDoc.exists()) return "student";

    return null;
};



// Firbase Provider
export const FirebaseProvider = ({ children }) => {

    //user State
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    console.log(user)
    console.log(role)

    //chekck if user login or not
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, async (user) => {
            if (user) {
                const userRole = await getUserRole(user.uid);
                setUser(user);
                setRole(userRole);
            } else {
                setUser(null);
                setRole(null);
            }
        });
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
    const handleAddTeacher = async (firstname, lastname, email, password, department, subject, role) => {
        return await addDoc(collection(firestore, 'teachers'), {
            firstname,
            lastname,
            email,
            password,
            department,
            subject,
            role,
            userID: user.uid,
            userEmail: user.email,
        })
    }

    //get and list teachers
    const listAllTeachers = () => {
        return getDocs(collection(firestore, 'teachers'))
    }

    //get and list teachers
    const listAllStudents = () => {
        return getDocs(collection(firestore, 'students'))
    }
 
    // delete teacher
    const deleteTeacher = (id) => {
        return deleteDoc(doc(firestore, 'teachers', id))
    }

    //add student in firestore
    const handleAddStudent = async (firstname, lastname, email, contact, address, state, password, role) => {
        return await addDoc(collection(firestore, 'students'), {
            firstname,
            lastname,
            email,
            contact,
            address,
            state,
            password,
            role,
        })
    }

    return (
        <FirebaseContext.Provider value={{ signupUser, signinUser, signOutUser, isLoggedIn, handleAddTeacher, listAllTeachers, handleAddStudent, listAllStudents, deleteTeacher }}>
            {children}
        </FirebaseContext.Provider>
    )
}