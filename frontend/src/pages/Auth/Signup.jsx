import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/input/Input'
import "../../App.css"
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/input/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apipaths'
import { UserContext } from '../../context/UserContext'
import uploadImage from '../../utils/uploadImage'

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // start spinner
  
    let profileImageUrl = "";
  
    if (!fullName) {
      setError("Full Name is required");
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Password is required");
      setLoading(false);
      return;
    }
  
    setError("");
  
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
  
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
  
      const { token, user } = response.data;
  
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    } finally {
      setLoading(false); // stop spinner
    }
  };
  
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 flex flex-col justify-center '>
        <h3 className='text-xl font- text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6 '>Join us today entering your details below.</p>

        <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />    

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input
          type='text'
          placeholder='Full Name'
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"/>

<Input 
      type="text" name="" id="" 
      value={email}
      onChange={({target}) => setEmail(target.value)}
      label="Email Address"
      placeholder='divine@gmail.com'
      />

      <div className='sm:col-span-2'>
        <Input
        type="password" name="" id=""
        value={password}
        onChange={({target}) => setPassword(target.value)}
        label="Password"
        placeholder='Password'
        />
      </div>
      </div>
      {error && <p className='text-red-500 text-xs'>{error}</p>}
      
      <button
  type="submit"
  disabled={loading}
  className={`btn w-full my-3 py-2 px-4 text-white uppercase rounded-md flex items-center justify-center ${
    loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  {loading ? (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    "Sign Up"
  )}
</button>
      
            <p className='text-sm text-slate-700 mt-4'>Already have an account? <Link to='/login' className='underline text-blue-500 cursor-pointer'>Login</Link></p>
      
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup