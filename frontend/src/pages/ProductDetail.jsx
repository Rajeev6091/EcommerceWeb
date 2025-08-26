import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import RelatedProduct from '../component/RelatedProduct';

function ProductDetail() {
  const { productId } = useParams();
  const { products, currency, addtoCart } = useContext(shopDataContext);
  const [productData, setProductData] = useState(false);
  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);
        setImage(item.image1);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='bg-gradient-to-br from-white to-gray-100 text-gray-900 w-full'>
      <div className='min-h-[100vh] flex items-center justify-start flex-col lg:flex-row gap-[50px] pt-10'>

        {/* Images */}
        <div className='lg:w-[50vw] md:w-[90vw] flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row'>
          <div className='lg:w-[20%] flex flex-wrap lg:flex-col gap-[20px] justify-center'>
            {[image1, image2, image3, image4].map((img, i) => (
              <div key={i} className='w-[60px] md:w-[100px] h-[60px] md:h-[110px] bg-gray-200 border rounded-md overflow-hidden'>
                <img src={img} alt="" className='w-full h-full object-cover cursor-pointer' onClick={() => setImage(img)} />
              </div>
            ))}
          </div>
          <div className='lg:w-[60%] w-[80%] h-[60vh] border rounded-md overflow-hidden shadow-md'>
            <img src={image} alt="" className='w-full h-full object-contain' />
          </div>
        </div>

        {/* Product Info */}
        <div className='lg:w-[50vw] w-[100vw] lg:px-10 px-6 flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>{productData.name}</h1>

          <div className='flex items-center gap-1 text-yellow-500'>
            <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStarHalfStroke />
            <p className='text-sm text-gray-700'>(12k)</p>
          </div>

          <p className='text-2xl font-semibold'>{currency} {productData.price}</p>

          <p className='text-base text-gray-700'>
            {productData.description} Stylish, breathable cotton shirt with modern slim fit. Super comfortable and easy to wash.
          </p>

          {/* Size Options */}
          <div className='mt-4'>
            <p className='text-lg font-semibold mb-2'>Select Size:</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button key={index}
                  className={`border py-2 px-4 rounded-md transition ${
                    item === size ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
              onClick={() => addtoCart(productData._id, size)}
            >
              Add to Cart
            </button>
          </div>

          <hr className='my-4 border-gray-300' />

          <div className='text-sm text-gray-600 space-y-1'>
            <p>✓ 100% Original Product</p>
            <p>✓ Cash on delivery available</p>
            <p>✓ Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Related */}
      <div className='w-full mt-16 px-6 lg:px-20'>
        <div className='flex gap-4 text-sm font-medium mb-4'>
          <span className='px-4 py-2 border rounded-md bg-white'>Description</span>
          <span className='px-4 py-2 border rounded-md bg-white'>Reviews (12k)</span>
        </div>

        <div className='bg-white p-6 rounded-lg shadow text-gray-700 text-base'>
          <p>
            Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on SuperCart. Crafted from breathable,
            high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting.
          </p>
        </div>

        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductid={productData._id}
        />
      </div>
    </div>
  ) : <div className='opacity-0'></div>;
}

export default ProductDetail;
