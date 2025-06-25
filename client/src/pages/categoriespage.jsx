import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Categoriespage = () => {
    const naviagate = useNavigate()
    const { product, currancy, cartItems, setCartItems, removeFromCrt, updateCardItems, addTocart } = useAppContext()
    const { category } = useParams()
    const sreacchcategeory = categories.find((item) => item.path.toLowerCase() === category)
    const filterProduct = product.filter((products) => products.category.toLowerCase().includes(category.toLowerCase()))

    return (
        <div className="px-4 sm:px-8 mt-16">
            {/* Category Title */}
            {sreacchcategeory && (
                <div className="mb-6">
                    <p className="text-3xl font-semibold">{sreacchcategeory.text.toUpperCase()}</p>
                    <div className="w-20 h-1 bg-[#4FBF8B] rounded-full mt-1"></div>
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filterProduct.map((item, i) => (
                    <div
                        key={i}
                        className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white"  onClick={()=>naviagate(`/products/${item.category.toLowerCase()}/${item._id}`)}
                    >
                        {/* Image */}
                        <div className="group cursor-pointer flex items-center justify-center px-2">
                            <img
                                className="group-hover:scale-105 transition max-w-24 md:max-w-32"
                                src={item.image[0]}
                                alt={item.name}
                            />
                        </div>

                        {/* Details */}
                        <div className="text-gray-500/60 text-sm mt-2">
                            <p>{item.category}</p>
                            <p className="text-gray-700 font-medium text-lg truncate w-full">
                                {item.name}
                            </p>

                            {/* Stars */}
                            <div className="flex items-center gap-0.5 mt-1">
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
                ))}
            </div>

            {/* If no products found */}
            {filterProduct.length === 0 && (
                <p className="text-red-500 text-lg mt-10">Sorry, no items found for "{category}"</p>
            )}
        </div>
    )
}

export default Categoriespage
