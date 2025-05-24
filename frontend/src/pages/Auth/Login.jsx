import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/input/Input'
import "../../App.css"
import { validateEmail } from '../../utils/helper'
import { API_PATHS } from '../../utils/apipaths'
import axiosInstance from '../../utils/axiosInstance'
import { UserContext } from '../../context/UserContext'

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email , setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate()

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password){
      setError('Please enter a password');
      return;
    }
  
    setError("");
    setLoading(true); // start loading
  
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
  
      const { token, user } = response.data;
  
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again');
      }
    } finally {
      setLoading(false); // stop loading
    }
  };
  
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

      <button
  type="submit"
  disabled={loading}
  className={`btn w-full my-2 py-2 px-4 text-white uppercase rounded-md flex items-center justify-center ${
    loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
  }`}
>
  {loading ? (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    'Login'
  )}
</button>

      <p className='text-sm text-slate-700 mt-4'>Don't have an account? <Link to='/signup' className='underline text-blue-500 cursor-pointer'>Signup</Link></p>

      </form>
    </div>
    </AuthLayout>
  )
}

export default Login