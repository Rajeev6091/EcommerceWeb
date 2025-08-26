import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from "axios"
import { useEffect } from 'react'

function Lists() {

  let [list, setList] = useState()
  let { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      console.log(result.data)
      setList(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) =>{
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`,{},{withCredentials:true})
      if(result.data){
        fetchList()
      }
      else{
        console.log("Faild to remove error")
      }
    } catch (error) {
       console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <Nav />
      <Sidebar />
  
      <div className="flex justify-start">
        <div className="w-full md:w-[82%] lg:ml-[320px] md:ml-[230px] mt-[80px] px-4 md:px-8 flex flex-col gap-6">
          
          <h2 className="text-2xl md:text-4xl font-semibold mb-2">All Listed Products</h2>
  
          {list?.length > 0 ? (
            <div className="
              flex flex-col gap-4
              border-l-2 border-white pl-4
              md:border-l-0 md:pl-0
            ">
              {list.map((item, index) => (
                <div
                  key={index}
                  className="
                    w-full
                    bg-[#2c4e4e] hover:bg-[#3b6565] transition-all duration-200
                    rounded-xl
                    flex flex-col sm:flex-row
                    sm:items-center
                    gap-4 sm:gap-6
                    p-4
                  "
                >
                  {/* Image */}
                  <img
                    src={item.image1}
                    alt=""
                    className="
                      w-full sm:w-[120px]
                      h-[200px] sm:h-[100px]
                      object-cover rounded-lg
                    "
                  />
  
                  {/* Details */}
                  <div className="flex-1 flex flex-col items-start gap-1 sm:gap-2 text-left">
                    <p className="text-lg sm:text-xl text-[#bef0f3] font-medium break-words">{item.name}</p>
                    <p className="text-sm sm:text-base text-[#bef3da] break-words">{item.category}</p>
                    <p className="text-sm sm:text-base text-[#bef3da]">₹{item.price}</p>
                  </div>
  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeList(item._id)}
                    className="
                      text-red-300 hover:text-black hover:bg-red-300
                      rounded-md px-3 py-1
                      transition-colors
                      self-start sm:self-center
                    "
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white text-lg">No Products Available.</div>
          )}
        </div>
      </div>
    </div>
  )
  
  
  
}

export default Lists