import React from 'react'

function NewLetterBox() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='w-full min-h-[40vh] bg-gradient-to-t from-[#f1f1f1] to-[#ffffff] flex items-center justify-start gap-4 flex-col py-10'>
            <p className='md:text-[30px] text-[20px] text-[#004d80] font-bold'>Subscribe Now & get 20% off</p>

            <p className='md:text-[18px] text-[14px] text-center text-gray-700 font-medium px-[20px]'>
                Subscribe Now & enjoy exclusive savings, special deals, and early access to new collections
            </p>

            <form
                onSubmit={handleSubmit}
                className='w-full h-auto md:h-[50%] flex items-center justify-center mt-[20px] gap-4 px-4 flex-wrap'
            >
                <input
                    type="email"
                    placeholder='Enter Your Email'
                    className='placeholder:text-gray-600 bg-white w-full md:max-w-[60%] h-[45px] px-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d80]'
                    required
                />
                <button
                    className='text-[15px] md:text-[16px] px-[20px] py-[12px] bg-[#004d80] hover:bg-[#00365e] text-white rounded-lg shadow-sm transition-all'
                >
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default NewLetterBox;
