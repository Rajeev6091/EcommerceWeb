import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay_Logo.png'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../admin/src/component/Loading'

function PlaceOrder() {
    let [method, setMethod] = useState('cod')
    let navigate = useNavigate()
    const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
    let { serverUrl } = useContext(authDataContext)
    const [loading, setLoading] = useState(false)

    let [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            // console.log('Loaded KEY:', import.meta.env.VITE_RAZORPAY_KEY_ID);
            key: "rzp_test_78nt0CKDOy9RCT",
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
                if (data) {
                    navigate('/order')
                    setCartItem({})
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];
            for (const items in cartItem) {
                for (const item in cartItem[items]) {
                    if (cartItem[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItem[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            };

            switch (method) {
                case 'cod':
                    const result = await axios.post(
                        serverUrl + '/api/order/placeorder',
                        orderData,
                        { withCredentials: true }
                    );
                    if (result.data) {
                        setCartItem({})
                        navigate('/order')
                    }
                    break;

                case 'razorpay':
                    const resultRazorpay = await axios.post(serverUrl + '/api/order/razorpay', orderData, { withCredentials: true })
                    if (resultRazorpay.data) {
                        initPay(resultRazorpay.data)
                    }
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white to-[#f3f6f9] mt-[68px] gap-8 md:gap-[50px] p-4 md:p-8 text-black'>

            {/* FORM SIDE */}
            <div className='md:w-1/2 w-full flex justify-center mt-[90px] md:mt-0'>
                <form className='w-full max-w-[500px] flex flex-col gap-4'>
                    <div className='py-2'>
                        <Title text1={'Delivery'} text2={'Information'} />
                    </div>

                    <div className='flex flex-wrap gap-4 px-2'>
                        <input type="text" placeholder='First name' onChange={onChangeHandler} name='firstName' value={formData.firstName}
                            className='flex-1 min-w-[45%] h-[50px] rounded-md shadow border border-gray-300 bg-white placeholder-gray-500 text-[18px] px-4 required' />
                        <input type="text" placeholder='Last name' onChange={onChangeHandler} name='lastName' value={formData.lastName}
                            className='flex-1 min-w-[45%] h-[50px] rounded-md shadow border border-gray-300 bg-white placeholder-gray-500 text-[18px] px-4 required' />
                    </div>

                    <div className='px-2'>
                        <input type="email" placeholder='Email' onChange={onChangeHandler} name='email' value={formData.email}
                            className='w-full h-[50px] rounded-md shadow border border-gray-300 bg-white placeholder-gray-500 text-[18px] px-4 required' />
                    </div>

                    <div className='px-2'>
                        <input type="text" placeholder='Street' onChange={onChangeHandler} name='street' value={formData.street}
                            className='w-full h-[50px] rounded-md shadow border border-gray-300 bg-white placeholder-gray-500 text-[18px] px-4 required' />
                    </div>

                    <div className='flex flex-wrap gap-4 px-2'>
                        <input type="text" placeholder='City' onChange={onChangeHandler} name='city' value={formData.city}
                            className='flex-1 min-w-[45%] h-[50px] rounded-md shadow border border-gray-300 bg-white placeholder-gray-500 text-[18px] px-4 required' />
                        <input type="text" placeholder='State' onChange={onChangeHandler} name='state' value={formData.state}
                            className='flex-1 min-w-[45%] h-[50px] rounded-md shadow border border-gray-300 bg-white placeholder-gray-500 text-[18px] px-4 required' />
                    </div>

                    <div className='flex flex-wrap gap-4 px-2'>
                        <input type="number" placeholder='Pincode' onChange={onChangeHandler} name='pinCode' value={formData.pinCode}
                            className='flex-1 min-w-[45%] h-[50px] rounded-md shadow border border-gray-300 bg-white placeholder-gray-500 text-[18px] px-4 required' />
                        <input type="text" placeholder='Country' onChange={onChangeHandler} name='country' value={formData.country}
                            className='flex-1 min-w-[45%] h-[50px] rounded-md shadow border border-gray-300 bg-white placeholder-gray-500 text-[18px] px-4 required' />
                    </div>

                    <div className='px-2'>
                        <input type="number" placeholder='Phone' onChange={onChangeHandler} name='phone' value={formData.phone}
                            className='w-full h-[50px] rounded-md shadow border border-gray-300 bg-white placeholder-gray-500 text-[18px] px-4 required' />
                    </div>
                </form>
            </div>

            {/* CART + PAYMENT SIDE */}
            <div className='md:w-1/2 w-full flex flex-col items-center gap-6'>
                <div className='w-full max-w-[500px]'>
                    <CartTotal />
                </div>

                <div className='py-2'>
                    <Title text1={'Payment'} text2={'Method'} />
                </div>

                <div className='w-full max-w-[500px] flex flex-col md:flex-row items-center justify-center gap-4 px-2'>
                    <button
                        onClick={() => setMethod('razorpay')}
                        className={`w-[200px] h-[100px] rounded-sm flex items-center justify-center bg-white shadow ${method === 'razorpay' ? 'border-[5px] border-blue-700' : 'border border-gray-200'}`}>
                        <img src={razorpay} className='w-full h-full object-contain rounded-sm' alt="razorpay" />
                    </button>

                    <button
                        onClick={() => setMethod('cod')}
                        className={`w-[200px] h-[75px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-4 rounded-sm text-[#332f6f] font-bold flex items-center justify-center ${method === 'cod' ? 'border-[5px] border-blue-700' : 'border border-gray-300'}`}>
                        Cash on Delivery
                    </button>
                </div>

                <div className='flex justify-center w-full max-w-[500px] px-2 mt-4 mb-[100px]'>
                    <button type='submit' onClick={onSubmitHandler}
                        className='w-full text-[18px] active:bg-slate-200 cursor-pointer bg-blue-500 text-white py-3 rounded-2xl font-bold shadow-md hover:bg-blue-600'>
                        {loading ? <Loading /> : "Place Order"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder;
