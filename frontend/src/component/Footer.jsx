import React from 'react';
import logo from "../assets/vcart_logo.png";

function Footer() {
  return (
    <div className='w-full bg-[#dbfcfcec] text-[#1e2223]'>
      {/* Main section */}
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-12 py-8 gap-8'>
        
        {/* Logo + description */}
        <div className='flex flex-col gap-3 w-full md:w-1/3'>
          <div className='flex items-center gap-3'>
            <img src={logo} alt="Logo" className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]' />
            <p className='text-[19px] md:text-[20px] font-semibold'>Super Market</p>
          </div>
          
          <p className='text-[15px] md:hidden'>
            Fast, Easy, Reliable, SuperMarket Shopping.
          </p>
          <p className='hidden md:block text-[15px]'>
            Super Market is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery-all backed by trusted service designed to make your life easier every day.
          </p>
        </div>

        {/* Company section */}
        <div className='flex flex-col gap-3 w-full md:w-1/4 text-left md:text-center'>
          <p className='text-[19px] md:text-[20px] font-semibold'>COMPANY</p>
          <ul className='flex flex-col gap-2'>
            <li className='text-[15px] cursor-pointer hover:underline'>Home</li>
            <li className='text-[15px] cursor-pointer hover:underline'>About us</li>
            <li className='text-[15px] cursor-pointer hover:underline'>Delivery</li>
            <li className='text-[15px] cursor-pointer hover:underline'>Privacy Policy</li>
          </ul>
        </div>

        {/* Get in touch section */}
        <div className='flex flex-col gap-3 w-full md:w-1/4 text-left md:text-center'>
          <p className='text-[19px] md:text-[20px] font-semibold'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2'>
            <li className='text-[15px] cursor-pointer hover:underline'>+91-6005372982</li>
            <li className='text-[15px] cursor-pointer hover:underline'>contact@onecart.com</li>
            <li className='text-[15px] cursor-pointer hover:underline'>+1-123-456-7890</li>
            <li className='text-[15px] cursor-pointer hover:underline'>admin@onecart.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-slate-400'></div>
      <div className='bg-[#dbfcfcec] text-center py-3 text-[14px]'>
        Copyright 2025@onecart.com - All Right Reserved.
      </div>
    </div>
  )
}

export default Footer;
