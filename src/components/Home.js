import React from 'react';
import intro from '../assets/img/intro.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register'); 
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex w-[70%] p-5 rounded-2xl'>
                <div className='w-1/2'>
                    <img alt='intro' src={intro} />
                </div>
                <div className='w-1/2'>
                    <h1 className='font-bold text-5xl text-oxfordBlue'>Reserve your <span className='text-orange'>mentors</span> today to enhance your knowledge and skills.</h1>
                    <button type='button' className='bg-orange mt-2 text-white font-bold rounded-lg p-2 pl-4 pr-4' onClick={handleRegisterClick}>
                        Register Now!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
