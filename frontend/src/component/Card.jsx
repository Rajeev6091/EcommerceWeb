import React, { useContext } from 'react';
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from 'react-router-dom';

function Card({ name, image, id, price }) {
    const { currency } = useContext(shopDataContext);
    const navigate = useNavigate();

    return (
        <div
            className="w-[300px] max-w-[90%] h-[400px] bg-white rounded-lg hover:scale-[102%]
            flex items-start justify-start flex-col p-[10px] cursor-pointer border border-gray-200 shadow-sm transition-all"
            onClick={() => navigate(`/productdetail/${id}`)}
        >
            <img src={image} alt={name} className="w-full h-[80%] rounded-sm object-cover" />
            <div className="text-gray-800 text-[18px] py-[10px] font-semibold">{name}</div>
            <div className="text-gray-600 text-[14px]">{currency}{price}</div>
        </div>
    );
}

export default Card;
