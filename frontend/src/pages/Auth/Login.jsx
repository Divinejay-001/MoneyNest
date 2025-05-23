import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/input/Input'
import "../../App.css"
import { validateEmail } from '../../utils/helper'
import { API_PATHS } from '../../utils/apipaths'
import axiosInstance from '../../utils/axiosInstance'
import { UserContext } from '../../context/userContent'

const Login = () => {
  const [email , setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate()

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return;
    }
    if (!password){
      setError('Please enter a password')
      return
    }

    setError("")

    // Call the login API here
    try{
      const response  = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      })
      const { token, user} = response.data;

      if(token){
        localStorage.setItem('token', token)
        updateUser(user)
        navigate('/dashboard')
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else{
        setError('Something went wrong. Please try again')
      }
  }
}
  return (
    <AuthLayout>
    <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center '>
      <h3 className='text-xl font-semibold text-black  mt-5 '>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6 '>Please Enter Your Details To Login </p>

      <form onSubmit={handleLogin}  className=''>
      <Input 
      type="text" name="" id="" 
      value={email}
      onChange={({target}) => setEmail(target.value)}
      label="Email Address"
      placeholder='divine@gmail.com'
      />
      <Input 
      type="password" name="" id="" 
      value={password}
      onChange={({target}) => setPassword(target.value)}
      label="Password"
      placeholder='Password'
      />

      {error && <p className='text-red-500 text-xs'>{error}</p>}

      <button type="submit" className='btn w-full my-2 py-2 px-4 text-white uppercase bg-blue-500 rounded-md hover:bg-blue-600'>Login</button>

      <p className='text-sm text-slate-700 mt-4'>Don't have an account? <Link to='/signup' className='underline text-blue-500 cursor-pointer'>Signup</Link></p>

      </form>
    </div>
    </AuthLayout>
  )
}

export default Login