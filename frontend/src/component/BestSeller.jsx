import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {

  let {products} = useContext(shopDataContext)
  let [bestSeller, setBestSeller] = useState([])

  useEffect(()=>{
    let filterProduct = products.filter((item)=> item.bestseller)
    setBestSeller(filterProduct.slice(0, 4));
  }, [products])

  return (
    <div>
      <div className='h-[8%] w-[100%] text-center md:mt-[10px]'>
        <Title text1={"BEST"} text2={"SELLER"}/>
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] '>
          Tried, Tested, Loved Discover Our All-Time Best Sellers.
        </p>
      </div>
      <div className='lg:w-[100vw] md:w-[60vw] w-[100vw] min-h-[70vh] mt-15 flex items-center justify-center flex-wrap gap-[30px]'>
        {
          bestSeller.map((item, index)=>(
            <Card 
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image1}
            />
          ))
        }
      </div>

    </div>
  )
}

export default BestSeller