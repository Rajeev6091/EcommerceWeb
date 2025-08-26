import React from 'react'
import LatestCollection from "../component/LatestCollection.jsx"
import BestSeller from "../component/BestSeller.jsx"

function Product() {
    return (
        <div className='w-full md:w-[200px] min-h-[100vh] flex items-center justify-start flex-col py-4 md:py-6'>
            <div className='w-full min-h-[70px] flex items-center justify-center gap-2 md:gap-4 flex-col'>
                <LatestCollection />
            </div>
            <div className='w-full min-h-[70px] mt-[100px] flex items-center justify-center gap-2 md:gap-4 flex-col'>
                <BestSeller />
            </div>
        </div>


    )
}

export default Product