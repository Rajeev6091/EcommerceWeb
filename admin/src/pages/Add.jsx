import React from 'react'
import Nav from "../component/Nav"
import Sidebar from "../component/Sidebar"
import upload from "../assets/upload_logo.png"
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from "axios"
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Add() {

  let [image1, setImage1]= useState(false)
  let [image2, setImage2]= useState(false)
  let [image3, setImage3]= useState(false)
  let [image4, setImage4]= useState(false)
  const [name, setName]= useState("")
  const [description, setDescription]= useState("")
  const [category, setCategory]= useState("Men")
  const [price, setPrice]= useState("")
  const [subCategory, setSubCategory]= useState("TopWear")
  const [bestseller, setBestSeller]= useState(false)
  const [sizes, setSizes]= useState([])
  const [loading, setLoading] = useState(false)

  let {serverUrl} = useContext(authDataContext)

  const handleAddProduct =  async (e)=>{
    setLoading(true)
    e.preventDefault()
    try {
      let formData= new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      let result = await axios.post(serverUrl + "/api/product/addproduct", formData, {withCredentials:true})

      console.log(result.data);
      toast.success("Add product succesfully ")
      setLoading(false)

      if(result.data){
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        setBestSeller(false)
        setCategory("Men")
        setSubCategory("TopWear")
      }
      
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Add Product Failed")
    }
  }
  

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white overflow-x-hidden relative'>
      <Nav />
      <Sidebar />
  
      <div className='flex flex-col items-center w-full md:ml-[5%] px-4 md:px-8 pt-24 pb-12'>
        <form
          onSubmit={handleAddProduct}
          className='w-full max-w-4xl flex flex-col gap-8 bg-[#0c2025]/50 backdrop-blur-md rounded-xl p-6 md:p-10 border border-[#46d1f7]/30'
        >
          <h2 className='text-2xl md:text-4xl font-bold mb-4 text-center'>Add Product Page</h2>
  
          {/* Image Upload */}
          <div className='flex flex-col gap-4'>
            <p className='text-lg md:text-xl font-semibold'>Upload Images</p>
            <div className='flex flex-wrap gap-4'>
              {[{ id: 'image1', file: image1, set: setImage1 },
                { id: 'image2', file: image2, set: setImage2 },
                { id: 'image3', file: image3, set: setImage3 },
                { id: 'image4', file: image4, set: setImage4 }]
                .map(({ id, file, set }) => (
                  <label
                    key={id}
                    htmlFor={id}
                    className='w-20 h-20 md:w-24 md:h-24 border-2 border-dashed border-[#46d1f7]/50 hover:border-[#46d1f7] rounded-lg cursor-pointer flex items-center justify-center overflow-hidden bg-[#1d1d1d]'
                  >
                    <img
                      src={!file ? upload : URL.createObjectURL(file)}
                      alt=""
                      className='object-cover w-full h-full'
                    />
                    <input type="file" id={id} hidden onChange={(e) => set(e.target.files[0])} required />
                  </label>
                ))}
            </div>
          </div>
  
          {/* Product Name */}
          <div className='flex flex-col gap-2'>
            <label className='text-lg md:text-xl font-semibold'>Product Name</label>
            <input
              type="text"
              placeholder='Type here'
              className='w-full h-12 rounded-lg border border-[#46d1f7]/50 hover:border-[#46d1f7] bg-[#1d1d1d] px-4 placeholder:text-[#ffffffc2]'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
  
          {/* Product Description */}
          <div className='flex flex-col gap-2'>
            <label className='text-lg md:text-xl font-semibold'>Product Description</label>
            <textarea
              placeholder='Type here'
              className='w-full h-28 rounded-lg border border-[#46d1f7]/50 hover:border-[#46d1f7] bg-[#1d1d1d] px-4 py-2 placeholder:text-[#ffffffc2]'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>
  
          {/* Category and Subcategory */}
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex flex-col gap-2 w-full md:w-1/2'>
              <label className='text-lg md:text-xl font-semibold'>Product Category</label>
              <select
                className='bg-[#1d1d1d] border border-[#46d1f7]/50 hover:border-[#46d1f7] rounded-lg px-4 py-2'
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className='flex flex-col gap-2 w-full md:w-1/2'>
              <label className='text-lg md:text-xl font-semibold'>Sub-Category</label>
              <select
                className='bg-[#1d1d1d] border border-[#46d1f7]/50 hover:border-[#46d1f7] rounded-lg px-4 py-2'
                onChange={(e) => setSubCategory(e.target.value)}
                required
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>
  
          {/* Product Price */}
          <div className='flex flex-col gap-2'>
            <label className='text-lg md:text-xl font-semibold'>Product Price</label>
            <input
              type="number"
              placeholder='₹ 2000'
              className='w-full h-12 rounded-lg border border-[#46d1f7]/50 hover:border-[#46d1f7] bg-[#1d1d1d] px-4 placeholder:text-[#ffffffc2]'
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
  
          {/* Product Sizes */}
          <div className='flex flex-col gap-2'>
            <label className='text-lg md:text-xl font-semibold'>Product Size</label>
            <div className='flex flex-wrap gap-3'>
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div
                  key={size}
                  className={`px-4 py-2 rounded-lg border border-[#46d1f7]/50 hover:border-[#46d1f7] cursor-pointer ${
                    sizes.includes(size) ? 'bg-green-300 text-black border-[#46d1f7]' : 'bg-[#1d1d1d]'
                  }`}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                    )
                  }
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
  
          {/* Best Seller */}
          <div className='flex items-center gap-3'>
            <input
              type="checkbox"
              id='checkbox'
              className='w-5 h-5 md:w-6 md:h-6 cursor-pointer'
              onChange={() => setBestSeller((prev) => !prev)}
            />
            <label htmlFor="checkbox" className='text-base md:text-lg font-semibold'>
              Add to BestSeller
            </label>
          </div>
  
          {/* Submit Button */}
          <button
            type='submit'
            className='self-start bg-[#65d8f7] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#46d1f7] active:bg-slate-700 active:text-white transition'
          >
            {loading ? <Loading/> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default Add