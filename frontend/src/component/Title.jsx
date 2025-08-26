import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className='inline-flex gap-2 items-center text-center mb-3 text-[35px] md:text-[40px]'>
      <p className='text-gray-700 font-semibold'>
        {text1}
        <span className='pl-[20px] text-[#004d80] font-bold'>{text2}</span>
      </p>
    </div>
  )
}

export default Title
