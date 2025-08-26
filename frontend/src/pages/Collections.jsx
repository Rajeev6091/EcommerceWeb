import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);
  const [filterProduct, setFliterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  }

  const applyFilter = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFliterProduct(productCopy);
  }

  const sortProducts = () => {
    let sorted = [...filterProduct];
    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }
    setFliterProduct(sorted);
  }

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    setFliterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className='w-[99vw] min-h-[100vh] bg-gradient-to-t from-[#e0f7fa] to-[#f1f8e9] 
      flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden z-[2] pb-[110px]'>
      
      {/* Filter Panel */}
      <div className={`md:w-[30vw] lg:w-[20vw] w-[100vw] ${showFilter ? "h-[62vh]" : "h-[8vh]"} 
        p-[20px] border-r-[1px] border-gray-300 text-[#065f46] lg:fixed`}>
        
        <p className='text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer' 
          onClick={() => setShowFilter(prev => !prev)}>
          FILTERS
          {!showFilter ? <FaChevronRight className='text-[18px]' /> : <FaChevronDown className='text-[18px]' />}
        </p>

        <div className={`border-[2px] border-[#d1d5db] pl-5 py-3 mt-6 rounded-md bg-[#d0f0f3] 
          ${showFilter ? "" : "hidden"} md:block`}>
          <p className='text-[18px] font-semibold'>CATEGORIES</p>
          <div className='w-[230px] h-[120px] flex flex-col gap-[10px] pt-2'>
            {["Men", "Women", "Kids"].map(cat => (
              <label key={cat} className='text-[16px] font-light flex items-center gap-2'>
                <input type='checkbox' value={cat} onChange={toggleCategory} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className={`border-[2px] border-[#d1d5db] pl-5 py-3 mt-6 rounded-md bg-[#d0f0f3] 
          ${showFilter ? "" : "hidden"} md:block`}>
          <p className='text-[18px] font-semibold'>SUB-CATEGORIES</p>
          <div className='w-[230px] h-[120px] flex flex-col gap-[10px] pt-2'>
            {[
              { label: "Topwear", value: "TopWear" },
              { label: "Bottomwear", value: "BottomWear" },
              { label: "Winter", value: "WinterWear" }
            ].map(({ label, value }) => (
              <label key={value} className='text-[16px] font-light flex items-center gap-2'>
                <input type='checkbox' value={value} onChange={toggleSubCategory} />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className='lg:pl-[20%] md:py-[10px]'>
        <div className='md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className='bg-[#d0f0f3] text-black w-[60%] md:w-[200px] h-[50px] px-[10px] 
              text-[16px] rounded-lg border-[2px] border-[#46d1f7] hover:border-[#0ea5e9]'
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevance</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        <div className='lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex flex-wrap justify-center gap-[30px]'>
          {
            filterProduct.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Collections;
