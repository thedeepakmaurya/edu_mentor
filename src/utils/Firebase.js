import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, collection, getFirestore, getDocs, getDoc, deleteDoc, setDoc, addDoc } from "firebase/firestore";


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
const getUserRole = async (id) => {
    const adminDoc = await getDoc(doc(firestore, "admin", id));
    if (adminDoc.exists()) return "admin";

    const teacherDoc = await getDoc(doc(firestore, "teachers", id));
    if (teacherDoc.exists()) return "teacher";

    const studentDoc = await getDoc(doc(firestore, "students", id));
    if (studentDoc.exists()) return "student";

    return null;
};

// Firbase Provider
export const FirebaseProvider = ({ children }) => {

    //user State
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);


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

    }, []);

    const isLoggedIn = user ? true : false;

    //student signup function
    const signupStudent = async (email, password, role, firstname, lastname, contact, address, state) => {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;

        await setDoc(doc(firestore, 'students', user.uid), {
            email: user.email,
            firstname: firstname,
            lastname: lastname,
            contact: contact,
            address: address,
            state: state,
            role: role,
            uid: user.uid
        });

    }


    //Signup teacher
    const signupTeacher = async (email, password, role, firstname, lastname, department, subject) => {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;

        await setDoc(doc(firestore, 'teachers', user.uid), {
            email: user.email,
            firstname: firstname,
            lastname: lastname,
            department: department,
            subject: subject,
            role: role,
            uid: user.uid
        });

    }

    // signin function
    const signinUser = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    //signOut user
    const signOutUser = () => {
        firebaseAuth.signOut().then(() => {
            setUser(null);
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

    //get appointments
    const listAllAppointments = () => {
        return getDocs(collection(firestore, 'appointments'))
    }

    // delete teacher
    const deleteTeacher = (id) => {
        return deleteDoc(doc(firestore, 'teachers', id))
    }

    // delete student
    const deleteStudent = (id) => {
        return deleteDoc(doc(firestore, 'students', id))
    }


    //add appointments
    const scheduleAppointments = async (teacherId, date) => {
        return await addDoc(collection(firestore, 'appointments'), {
            teacherId,
            date,
            studentID: user.uid,
        });
    };


    return (
        <FirebaseContext.Provider value={{ signupStudent, signinUser, signOutUser, isLoggedIn, signupTeacher, listAllTeachers, listAllStudents, deleteTeacher, deleteStudent, role, user, scheduleAppointments, listAllAppointments }}>
            {children}
        </FirebaseContext.Provider>
    )
}