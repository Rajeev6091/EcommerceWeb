import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {

  let {products} = useContext(shopDataContext)
  let [latestProducts, setLatestProducts] = useState([])

  useEffect(()=>{
    setLatestProducts(products.slice(0,8));
  },[products])

  return (
    <div>
      <div className='h-[8%] w-[100] text-center md:mt-[50px]'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] '>
          Step into Style - New Collection Dropping This Season!</p>
      </div>
      
      <div className='lg:w-[100vw] md:w-[60vw] w-[100vw] min-h-[70vh] mt-15 flex items-center justify-center flex-wrap gap-[30px]'>
        {
          latestProducts.map((item, index)=>(
            <Card 
              key={index} 
              name={item.name} 
              image={item.image1} 
              id={item._id} 
              price={item.price} 
            />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection