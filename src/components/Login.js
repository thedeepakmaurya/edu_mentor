import React from 'react'

const Login = () => {
  return (
    <div className='flex items-center mt-32 justify-center h-fit'>
      <div className='w-[30%] bg-white rounded-xl p-5'>
        <form>
          <div>
            <label>Email</label>
            <input />
          </div>
          <div>
            <label>Password</label>
            <input />
          </div>
        </form>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Login