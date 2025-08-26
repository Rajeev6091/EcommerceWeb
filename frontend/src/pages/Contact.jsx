import React from 'react'
import Title from '../component/Title'
import contact from '../assets/contact.png'
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l 
     from-[#ffffff] to-[#f3f3f3] gap-[50px] pt-[80px]'>
      
      <Title text1={'CONTACT'} text2={'US'} />

      <div className='w-full flex items-center justify-center flex-col lg:flex-row px-4'>
         
         <div className='lg:w-[50%] w-full flex items-center justify-center'>
            <img 
              src={contact} 
              alt="Contact Illustration" 
              className='lg:w-[70%] w-[80%] shadow-md shadow-gray-400 rounded-sm' 
            />
         </div>

         <div className='lg:w-[50%] w-[90%] flex items-start justify-center gap-[20px] flex-col mt-[30px] lg:mt-0'>

            <p className='lg:w-[80%] w-full text-[#1e1e1e] font-bold lg:text-[18px] text-[16px]'>Our Store</p>

            <div className='lg:w-[80%] w-full text-[#2e2e2e] lg:text-[17px] text-[15px] leading-6'>
              <p>12345 Random Station</p>
              <p>Random City, State, India</p>
            </div>

            <div className='lg:w-[80%] w-full text-[#2e2e2e] lg:text-[17px] text-[15px] leading-6'>
              <p>Tel: +91-8959647392</p>
              <p>Email: admin@onecart.com</p>
            </div>

            <p className='lg:w-[80%] w-full text-[#1e1e1e] font-bold lg:text-[18px] text-[16px] mt-[10px]'>
              Careers at SuperCart
            </p>

            <p className='lg:w-[80%] w-full text-[#3b3b3b] md:text-[16px] text-[14px]'>
              Learn more about our teams and job openings
            </p>

            <button className='px-[25px] py-[12px] text-[#004d80] border border-[#004d80] rounded-md hover:bg-[#004d80] hover:text-white transition duration-300'>
              Explore Jobs
            </button>
         </div>
      </div>

      <NewLetterBox />
    </div>
  )
}

export default Contact
