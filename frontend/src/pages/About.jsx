import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.png'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-[99vw] md:w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l 
     from-[#f9f9f9] to-[#e0f7fa] gap-[50px] pt-[60px] pb-[10px]'>
      
      <Title text1={'ABOUT'} text2={'US'} />

      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img src={about} alt="" className='lg:w-[65%] w-[80%] h-[600px] shadow-md shadow-gray-400 rounded-sm' />
        </div>

        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
          <p className='lg:w-[80%] w-[100%] text-[#333] md:text-[16px] text-[13px]'>
            SuperCart was born for smart, seamless shopping — created to deliver quality products, trending styles, and
            everyday essentials in one place. With reliable service, fast delivery, and great value, SuperCart
            makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className='lg:w-[80%] w-[100%] text-[#333] md:text-[16px] text-[13px]'>
            Our platform brings together the best in convenience and quality, giving you more time to enjoy what matters most.
          </p>
          <p className='lg:w-[80%] w-[100%] text-[15px] text-[#111] md:text-[18px] mt-[10px] font-bold '>
            Our Mission
          </p>
          <p className='lg:w-[80%] w-[100%] text-[#333] md:text-[16px] text-[13px]'>
            SuperCart aims to transform everyday shopping by blending technology and trust, bringing top-notch service and products
            to your fingertips. We're driven by simplicity, speed, and customer satisfaction.
          </p>
        </div>
      </div>

      <div className='w-[100%] flex items-center justify-center flex-col gap-[10px]'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />

        <div className='w-[80%] flex items-center justify-center lg:flex-row flex-col py-[40px]'>
          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-300 bg-white shadow-sm flex items-center justify-center
            gap-[20px] flex-col px-[40px] py-[10px] text-[#333]'>
            <b className='text-[20px] font-semibold text-[#007c91]'>Quality Assurance</b>
            <p>We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
          </div>

          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-300 bg-white shadow-sm flex items-center justify-center
            gap-[20px] flex-col px-[40px] py-[10px] text-[#333]'>
            <b className='text-[20px] font-semibold text-[#007c91]'>Convenience</b>
            <p>Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.</p>
          </div>

          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-300 bg-white shadow-sm flex items-center justify-center
            gap-[20px] flex-col px-[40px] py-[10px] text-[#333]'>
            <b className='text-[20px] font-semibold text-[#007c91]'>Exceptional Customer Service</b>
            <p>Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.</p>
          </div>
        </div>
      </div>

      <NewLetterBox />
    </div>
  )
}

export default About
