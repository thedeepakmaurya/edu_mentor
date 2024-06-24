import React from 'react';
import intro from '../assets/img/intro.svg';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../utils/Firebase';

const Home = () => {
    const navigate = useNavigate();

    const firebase = useFirebase()

    const handleClick = () => {
        navigate('/register');
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex w-[70%] gap-5 bg-white rounded-lg shadow-lg shadow-gray-400 p-5 '>
            <div className='w-1/2'>
                    <img alt='intro' src={intro} />
                </div>
                <div className='w-1/2 flex flex-col justify-center'>
                    <h1 className='font-bold text-5xl text-oxfordBlue'>Reserve your <span className='text-orange'>mentors</span> today to enhance your knowledge.</h1>
                    {firebase.isLoggedIn === false && <button type='button' className='bg-orange mt-2 w-40 text-white font-bold rounded-sm p-2 pl-4 pr-4' onClick={handleClick}>
                        Register Now!
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default Home;
