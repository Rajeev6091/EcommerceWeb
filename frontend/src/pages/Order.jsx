import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
    let [orderData, setOrderData] = useState([])
    let { currency } = useContext(shopDataContext)
    let { serverUrl } = useContext(authDataContext)

    const loadOrderData = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
            if (result.data) {
                let allOrderItem = []
                result.data.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrderItem.push(item)
                    })
                })
                setOrderData(allOrderItem.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadOrderData()
    }, [])

    return (
        <div className="w-full min-h-screen bg-[#f5f7fa] mt-[30px] mb-[50px] lg:mb-[0px] px-4 md:px-8 py-8">
            <div className="text-center mb-6">
                <Title text1={'MY'} text2={'ORDER'} />
            </div>

            <div className="flex flex-col gap-4">
                {orderData.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg">No orders found.</div>
                ) : (
                    orderData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 md:p-6 relative">

                                {/* Image */}
                                <img
                                    src={item.image1}
                                    alt={item.name}
                                    className="w-full md:w-32 md:h-32 h-48 object-cover rounded-lg"
                                />

                                {/* Info */}
                                <div className="flex-1 flex flex-col gap-2 text-gray-800">
                                    <p className="text-lg md:text-xl font-semibold">{item.name}</p>

                                    <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-600">
                                        <span>{currency}{item.price}</span>
                                        <span>Qty: {item.quantity}</span>
                                        <span>Size: {item.size}</span>
                                    </div>

                                    <p className="text-sm md:text-base text-gray-600">
                                        Date: <span className="text-gray-800">{new Date(item.date).toDateString()}</span>
                                    </p>
                                    <p className="text-sm md:text-base text-gray-600">
                                        Payment Method: <span className="text-gray-800">{item.paymentMethod}</span>
                                    </p>
                                </div>

                                {/* Status & Button */}
                                <div className="flex md:flex-col items-center gap-2 md:gap-4 md:ml-auto w-full md:w-auto justify-between md:justify-center">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                        <span className="text-xs md:text-sm text-gray-800">{item.status}</span>
                                    </div>
                                    <button
                                        onClick={loadOrderData}
                                        className="px-3 py-1.5 rounded-md bg-gray-200 text-gray-700 text-xs md:text-sm hover:bg-gray-300 active:bg-gray-400 transition-colors"
                                    >
                                        Track Order
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Order
