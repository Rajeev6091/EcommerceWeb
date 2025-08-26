import React from 'react';
import Title from './Title';
import { RiExchangeFundsFill } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-[100vw] h-[100vh] md:h-[70vh] flex items-center justify-start flex-col bg-[#f9fcff] gap-[50px]'>
      <div className='h-[8%] w-[100%] text-center mt-[70px]'>
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-gray-600'>
          Customer-Friendly Policies - Committed to Your Satisfaction and Safety.
        </p>
      </div>

      <div className='w-[100%] md:min-h-[50%] h-[20%] flex items-center justify-center flex-wrap lg:gap-[50px] gap-[40px]'>
        {/* Policy 1 */}
        <div className='w-[400px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]'>
          <RiExchangeFundsFill className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-blue-600' />
          <p className='font-semibold md:text-[25px] text-[19px] text-blue-800'>Easy Exchange Policy</p>
          <p className='font-medium md:text-[18px] text-[12px] text-gray-700 text-center'>
            Exchange Made Easy - Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* Policy 2 */}
        <div className='w-[400px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]'>
          <TbRosetteDiscountCheckFilled className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-blue-600' />
          <p className='font-semibold md:text-[25px] text-[19px] text-blue-800 text-center'>7 Days Return Policy</p>
          <p className='font-medium md:text-[18px] text-[12px] text-gray-700 text-center'>
            Shop with Confidence - 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Policy 3 */}
        <div className='w-[400px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]'>
          <BiSupport className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-blue-600' />
          <p className='font-semibold md:text-[25px] text-[19px] text-blue-800'>Best Customer Support</p>
          <p className='font-medium md:text-[18px] text-[12px] text-gray-700 text-center'>
            Trusted Customer Support - Your Satisfaction is our Priority.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurPolicy;
