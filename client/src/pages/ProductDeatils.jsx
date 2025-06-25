import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
const ProductDeatils = () => {
    const navigate = useNavigate()
    const { currancy, cartItems, setCartItems, removeFromCrt, updateCardItems, addTocart, product } = useAppContext();
    
    const { id } = useParams()
    const [relatedProduct, setRlatedProduct] = useState([])
    const [thumbnail, setThumbnail] = useState(null);
    const products = product.find((item) => item._id === id);
    useEffect(() => {
        if (product.length > 0 && products) {
            let productcopy = product.slice();
            productcopy = productcopy.filter(
                (item) => item.category === products.category && item._id !== products._id
            );
            setRlatedProduct(productcopy.slice(0, 5));
        }
    }, [product, products]);
    useEffect(() => {
        setThumbnail(products?.image[0] ? products.image[0] : null)
    }, [product])
    return products && (
        <div className="max-w-6xl w-full px-6">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${products.category}`}> {products.category}</Link> /
                <span className="text-[#4FBF8B]"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {products.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{products.name}</h1>

                     <div className="flex items-center gap-0.5">
                                            {Array(5)
                                                .fill('')
                                                .map((_, starIndex) => (
                                                    <img
                                                        key={starIndex}
                                                        src={starIndex < 4 ? assets.star_icon : assets.star_dull_icon}
                                                        className="w-3 md:w-3.5"
                                                    />
                                                ))}
                                            <p>4.1</p>
                                        </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP:₹{products.price}</p>
                        <p className="text-2xl font-medium">MRP: ₹{products.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {products.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => addTocart(products._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={() => { addTocart(products._id); navigate("/cart") }} className="w-full py-3.5 cursor-pointer font-medium bg-[#4FBF8B] text-white hover:[#4FBF8B] transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            {/* {rateted products} */}
            <div className='mt-20 flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center w-max'>
                    <p className='text-2xl text-center'>Related Products</p>
                    <div className='w-20 h-0.5 bg-[#4FBF8B] mt-2 rounded-full '></div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-65 mt-6'>

                    {relatedProduct
                        .filter((Product) => Product.inStock)
                        .map((item, i) => {
                            return (
                                <div
                                    key={i}
                                    className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
                                    onClick={() => {navigate(`/products/${item.category.toLowerCase()}/${item._id}`);scrollTo(0,0)}}
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
                                        <p className="text-gray-700 font-medium text-lg truncate w-full">{item.name}</p>

                                        {/* Stars */}
                                        <div className="flex items-center gap-0.5">
                                            {Array(5)
                                                .fill('')
                                                .map((_, starIndex) => (
                                                    <img
                                                        key={starIndex}
                                                        src={starIndex < 4 ? assets.star_icon : assets.star_dull_icon}
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
                            );
                        })}

                </div>
                <button onClick={(() => navigate("/products"))} className='mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-[#4FBF8B] '>See More </button>
            </div>
        </div>
    );
}

export default ProductDeatils
