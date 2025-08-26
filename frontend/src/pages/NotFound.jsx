import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    let navigate = useNavigate()
  return (
    <div className='w-[100vw] h-[100vh] overflow-x-hidden mt-[50px] relative bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] text-center'>
        404 Page Not Found
        <button className='bg-[white[ px-[20px] py-[10px] rounded-xl text-[18px] text-[skyblue] cursor-pointer' onClick={()=>navigate("/login")}>Login</button>
    </div>
  )
}

export default NotFound