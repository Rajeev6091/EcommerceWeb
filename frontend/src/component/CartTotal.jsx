import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);

  return (
    <div className="w-full space-y-6">
      
      {/* Subtotal Row */}
      <div className="flex justify-between text-gray-800 text-lg font-medium">
        <span>Subtotal</span>
        <span>{currency}{getCartAmount()}.00</span>
      </div>

      {/* Shipping Fee Row */}
      <div className="flex justify-between text-gray-800 text-lg font-medium">
        <span>Shipping Fee</span>
        <span>{currency}{delivery_fee}</span>
      </div>

      <hr className="border-gray-300" />

      {/* Total Row */}
      <div className="flex justify-between text-black text-xl font-bold">
        <span>Total</span>
        <span>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</span>
      </div>

    </div>
  );
}

export default CartTotal;
