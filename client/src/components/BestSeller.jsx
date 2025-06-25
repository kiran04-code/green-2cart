import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { product } = useAppContext();

  const bestSellers = product
    ?.filter(p => p.inStock)
    .slice(0, 5);

  return (
    <div className="mt-16 px-4 md:px-8">
      <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
        Best Sellers
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-6">
        {bestSellers.map((item, index) => (
          <ProductCard key={item._id || index} product={[item]} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
