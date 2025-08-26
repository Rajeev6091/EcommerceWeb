import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useEffect } from 'react'

function Home() {

  const [totalProdects, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const {serverUrl} =useContext(authDataContext)

  const fetchCounts = async () =>{
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, {}, {withCredentials:true})
      setTotalProducts(products.data.length)
   
      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, {withCredentials:true})
      setTotalOrders(orders.data.length)

    } catch (error) {
      console.log("Failed to fetch counts", error)
    }
  }

  useEffect(()=>{
    fetchCounts()
  },[])

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white relative overflow-hidden">
      <Nav />
      <Sidebar />
      <div className="w-[70vw] h-[100vh] absolute left-[25%] top-0 px-8 py-20 overflow-y-auto">
        <h1 className="text-[36px] font-bold text-[#c6f1ff] mb-12 text-center">Welcome to SuperMarket Admin Panel</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Products Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#afe2f2] text-black rounded-full p-3 text-xl">
                🛒
              </div>
              <h2 className="text-xl font-semibold">Total Products</h2>
            </div>
            <div className="text-5xl font-bold text-[#afe2f2] text-center">{totalProdects}</div>
          </div>
  
          {/* Orders Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#afe2f2] text-black rounded-full p-3 text-xl">
                📦
              </div>
              <h2 className="text-xl font-semibold">Total Orders</h2>
            </div>
            <div className="text-5xl font-bold text-[#afe2f2] text-center">{totalOrders}</div>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default Home