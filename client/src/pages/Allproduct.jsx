import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
const Allproduct = () => {

  const naviagate = useNavigate()
  const {
    product,
    currancy,
    cartItems,
    setCartItems,
    removeFromCrt,
    updateCardItems,
    addTocart,
    searchQuery,
    setsearchQuery
  } = useAppContext();

  const [allfilterProducts, setAllFilterProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setAllFilterProducts(
        product.filter((products) =>
          products.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setAllFilterProducts(product);
    }
  }, [product, searchQuery]);

  return (
    <div className="mt-16 px-4 md:px-8">
      <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium'>ALL PRODUCTS</p>
          <div className='w-16 h-0.5 bg-[#4FBF8B] rounded-full'></div>
         </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-6" >
        {allfilterProducts.length > 0 ? (
          allfilterProducts.map((item, i) => (
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
                  <div
                    className="text-indigo-500"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                        <span className="w-5 text-center">
                          {cartItems[item._id]}
                        </span>
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
          ))
        ) : (
          <h1 className="col-span-full text-center text-red-500 font-medium text-3xl">
            Sorry, <span className="text-black font-semibold">{searchQuery}</span> isn't available.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Allproduct;
