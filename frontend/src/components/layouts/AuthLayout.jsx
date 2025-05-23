import React from 'react'
import { LuTrendingUpDown } from 'react-icons/lu'
import { FaWallet } from 'react-icons/fa'
import Logo from '../../assets/image/Logo2.webp'
const AuthLayout = ({ children }) => { 
  return (
    <div className='flex'>
      
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'> 
      <div className='flex text-primary items-center space-x-1 flex-wrap'>
          <FaWallet className='sm:relative sm:bottom-5 md:bottom-0'/>
          <h2 className='sm:pb-9 md:pb-0 text-lg font-bold font-cinzel' >Cash<span className='font-serif'>Mind</span></h2>
        </div>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-violet bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
<div  className='w-48 h-48 rounded-[40px] bg-primary absolute -top-7 -left-5'/>
<div className='w-48 h-48 rounded-[40px] border-[20px] border-secondary absolute -top-7 -right-10'/>
<div className='w-48 h-48 rounded-[40px] bg-primary absolute -bottom-7 -left-5'/>

<div className='grid grid-cols-1 z-20'>
  <StatsInfoCard
  icon={<LuTrendingUpDown/>}
  label="Track Your Income and Expenses"
  value='430,000'
  color='bg-primary'
  />
</div>

<video src="https://videos.pexels.com/video-files/6266426/6266426-uhd_2560_1440_25fps.mp4"  
autoPlay
        loop
        muted 
        className='w-64 h-72 lg:w-[100%] absolute bottom-10  lg:bottom-32 lg:left-0  rounded-2xl shadow-lg shadow-blue-400/15' 
        alt="" />
      </div>
    </div>
  )
}

export default AuthLayout


const StatsInfoCard = ({ icon, label, value, color }) => {
  return <div className='flex gap-4 bg-white p-4  rounded-xl shadow-md shadow-purple-600/10 border border-gray-200/30 z-10'>
    <div 
    className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl  `}>
      {icon}
    </div>
    <div>
      <h6 className='text-xs  text-gray-500 mb-1'>{label}</h6>
      <span className='text-[20px]'>${value}</span>
    </div>
  </div>

}