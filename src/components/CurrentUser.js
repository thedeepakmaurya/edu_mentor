import React from 'react'
import { useFirebase } from '../utils/Firebase'
import Loader from './Loader'

const CurrentUser = () => {

    const firebase = useFirebase()

    if (!firebase.user){
        return (<Loader/>)
    }

    if (firebase.user) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='w-[30%] h-[30%] text-white bg-oxfordBlue rounded-lg shadow-lg shadow-gray-400 p-5'>
                    <h1 className='font-bold pb-5 text-xl'>User Profile!</h1>
                    <h1 >Email: <span className='font-bold text-orange'>{firebase.user.email}</span></h1>
                    <h1 >Password: <span className='text-red-400 font-bold'>******</span></h1>
                </div>
            </div>
        )
    }
}

export default CurrentUser