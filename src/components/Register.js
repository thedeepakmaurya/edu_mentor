import React from 'react'

const Register = () => {
  return (
    <div className='flex items-center justify-center h-fit'>
      <div className='w-[50%] mt-24 rounded-2xl p-10 h-[450px] bg-white'>
        <h1 className='font-bold text-xl mb-2'>Student Registration</h1>
        <form className=' flex flex-col'>
          <div className='flex gap-10 w-full mt-2'>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md '>First Name</label>
              <input className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg required '/>
            </div>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md  '>Last Name</label>
              <input className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg required '/>
            </div>
          </div>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md  '>Email</label>
            <input className='outline-none focus:border-oxfordBlue pl-2 h-8 w-[47%] border border-platinum rounded-lg required '/>
          </div>
          <div className='w-full mt-2 flex flex-col'>
            <label className='font-bold text-md '>Contact Number</label>
            <input className='outline-none focus:border-oxfordBlue pl-2 h-8 w-[47%] border border-platinum rounded-lg required '/>
          </div>
          <div className='flex w-full mt-2 gap-10'>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md  '>Address</label>
              <input className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg required '/>
            </div>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md  '>State</label>
              <input className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg required '/>
            </div>
          </div>
          <div className='flex w-full mt-2 gap-10 items-center'>
            <div className='w-1/2 flex flex-col'>
              <label className='font-bold text-md'>Password</label>
              <input className='outline-none focus:border-oxfordBlue pl-2 h-8 border border-platinum rounded-lg required '/>
            </div>
            <div className='w-1/2'>
               <br/>
              <button className='bg-oxfordBlue p-1 pl-9 pr-9 rounded-lg text-white'>Continue</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register