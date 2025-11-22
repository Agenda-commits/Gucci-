
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isFullCard?: boolean;
  isApproved?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onSelect, 
  isFullCard = false, 
  isApproved = false 
}) => {
  return (
    <div className="flex flex-col w-full pb-8">
      {/* Image Container */}
      <div className={`relative w-full aspect-square bg-[#f5f5f5] flex items-center justify-center mb-4 overflow-hidden group ${!isApproved ? 'cursor-pointer' : ''}`}>
        {/* Number Badge */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm z-10 font-sans text-gray-800">
          {product.id}
        </div>

        {/* Real Product Image */}
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className={`w-full h-full transition-transform duration-700 ${!isApproved ? 'group-hover:scale-110' : ''} ${
            isFullCard 
              ? 'object-cover' 
              : 'object-contain mix-blend-multiply p-6'
          }`}
        />
      </div>

      {/* Product Title */}
      <h3 className="text-xs font-bold uppercase tracking-wide text-black mb-3 min-h-[32px] leading-4">
        {product.name}
      </h3>

      {/* Product Details Table */}
      <div className="grid grid-cols-[auto_12px_1fr] gap-y-0.5 text-[11px] font-medium text-black leading-loose mb-5">
        <span>IDR price</span>
        <span className="text-center">:</span>
        <span>{product.price}</span>

        <span>Benefit</span>
        <span className="text-center">:</span>
        <span>{product.benefit}</span>

        <span>IDR profit</span>
        <span className="text-center">:</span>
        <span>{product.profit}</span>
      </div>

      {/* Select Button */}
      <button 
        onClick={() => onSelect(product)}
        disabled={isApproved}
        className={`w-full text-[10px] font-bold uppercase tracking-[0.2em] py-3 transition-colors duration-300 ${
          isApproved 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-black text-white hover:opacity-80'
        }`}
      >
        {isApproved ? 'Approved' : 'Pilih'}
      </button>
    </div>
  );
};
