import React from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product }) => {

  const naviagate = useNavigate()
  const { currancy, cartItems, setCartItems, removeFromCrt, updateCardItems, addTocart } = useAppContext();
  return (
    <div className="flex flex-wrap gap-4" >
      {product.map((item, i) => (
        <div 
          key={i}
          className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full" onClick={()=>naviagate(`/products/${item.category.toLowerCase()}/${item._id}`)}
        >
          {/* Image */}
          <div className="group cursor-pointer flex items-center justify-center px-2">
            <img
              className="group-hover:scale-105 transition max-w-26 md:max-w-36"
              src={item.image[0]}
              alt={item.name}
            />
          </div>

          {/* Details */}
          <div className="text-gray-500/60 text-sm">
            <p>{item.category}</p>
            <p className="text-gray-700 font-medium text-lg truncate w-full">
              {item.name}
            </p>

            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {Array(5)
                .fill('')
                .map((_, starIndex) => (
                  <img
                    key={starIndex}
                    src={
                      starIndex < 4
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    className="w-3 md:w-3.5"
                  />
                ))}
              <p>4.1</p>
            </div>

            {/* Price + Cart Controls */}
            <div className="flex items-end justify-between mt-3">
              <p className="md:text-xl text-base font-medium text-indigo-500">
                {currancy}{item.offerPrice}{' '}
                <span className="text-gray-500/60 md:text-sm text-xs line-through">
                  {currancy}{item.price}
                </span>
              </p>

              {/* Add / Quantity UI */}
              <div className="text-indigo-500" onClick={(e) => e.stopPropagation()}>
                {!cartItems[item._id] ? (
                  <button
                    className="flex items-center justify-center gap-1 bg-indigo-100 border border-[#4FBF8B] md:w-[80px] w-[64px] h-[34px] rounded text-black font-medium cursor-pointer"
                    onClick={() => addTocart(item._id)}
                  >
                    <img src={assets.cart_icon} alt="cart" />
                    Add
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-100 rounded select-none">
                    <button
                      onClick={() => removeFromCrt(item._id)}
                      className="cursor-pointer text-md px-2 h-full"
                    >
                      -
                    </button>
                    <span className="w-5 text-center">{cartItems[item._id]}</span>
                    <button
                      onClick={() => addTocart(item._id)}
                      className="cursor-pointer text-md px-2 h-full"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
