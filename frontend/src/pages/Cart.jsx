import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {

    const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tempData = [];
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item]
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItem]);

    return (
        <div className="w-full min-h-screen p-4 md:p-8 bg-gradient-to-br from-[#f9fafb] to-[#edf1f7] text-black">

            {/* Title */}
            <div className="text-center mt-10 mb-10">
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            {/* Cart Items */}
            <div className="flex flex-col gap-6">
                {
                    cartData.map((item, index) => {
                        const productData = products.find((product) => product._id === item._id);
                        if (!productData) return null;

                        return (
                            <div key={index} className="w-full border border-gray-300 rounded-xl p-4 bg-white shadow hover:shadow-md transition duration-200">
                                <div className="flex flex-col md:flex-row gap-5 items-center">

                                    {/* Product Image */}
                                    <img src={productData.image1} alt="" className="w-28 h-28 rounded-lg object-cover shadow-sm" />

                                    {/* Product Info */}
                                    <div className="flex-1 flex flex-col gap-1">
                                        <p className="text-xl md:text-2xl font-semibold text-gray-800">{productData.name}</p>
                                        <div className="flex items-center gap-4">
                                            <p className="text-lg text-gray-600">{currency}{productData.price}</p>
                                            <span className="px-3 py-1 bg-gray-100 rounded-md text-gray-700 border border-gray-300 text-sm">
                                                Size: {item.size}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Quantity Input + Delete */}
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="number"
                                            min={1}
                                            defaultValue={item.quantity}
                                            className="w-16 px-3 py-1 bg-gray-50 text-black font-semibold text-base rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300 transition"
                                            onChange={(e) => (
                                                e.target.value === ' ' || e.target.value === '0'
                                                    ? null
                                                    : updateQuantity(item._id, item.size, Number(e.target.value))
                                            )}
                                        />
                                        <RiDeleteBin6Line
                                            className="text-gray-500 w-6 h-6 cursor-pointer hover:text-red-500 transition"
                                            onClick={() => updateQuantity(item._id, item.size, 0)}
                                        />
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* Cart Total & Checkout */}
            <div className="mt-16 flex justify-center mb-[80px]">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

                    {/* Header */}
                    <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center">Order Summary</h2>
                    </div>

                    {/* Cart Total Details */}
                    <div className="p-6 md:p-8 space-y-4 bg-white">
                        <CartTotal />
                    </div>

                    {/* Checkout Button */}
                    <div className="bg-gray-100 px-6 py-4 flex justify-center">
                        <button
                            className="w-full md:w-auto px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg 
                            tracking-wide hover:bg-blue-700 transition duration-300 border border-blue-700 
                            shadow hover:shadow-md"
                            onClick={() => {
                                if (cartData.length > 0) {
                                    navigate('/placeorder');
                                } else {
                                    console.log("Your Cart is empty");
                                }
                            }}
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Cart;
