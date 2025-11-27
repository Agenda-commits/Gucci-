
import React from 'react';
import { Product } from '../types';
import { Star } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

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
  const { t } = useLanguage();

  return (
    <div className="flex flex-col w-full h-full justify-between relative">
      {/* Top Content Wrapper */}
      <div>
        {/* Image Container */}
        <div className={`relative w-full aspect-square bg-[#f5f5f5] flex items-center justify-center mb-4 overflow-hidden group ${!isApproved ? 'cursor-pointer' : ''}`}>
          {/* Number Badge */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm z-10 font-sans text-black">
            {product.id}
          </div>

          {/* Recommended Badge */}
          {product.isRecommended && (
            <div className="absolute top-0 right-0 z-20 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1.5 shadow-md flex items-center gap-1">
              <Star size={10} fill="white" />
              {t('recommended')}
            </div>
          )}

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
          <span>IDR {t('price')}</span>
          <span className="text-center">:</span>
          <span>{product.price}</span>

          <span>{t('benefit')}</span>
          <span className="text-center">:</span>
          <span className={product.isRecommended ? "text-green-700 font-bold" : ""}>{product.benefit}</span>

          <span>IDR {t('profit')}</span>
          <span className="text-center">:</span>
          <span>{product.profit}</span>
        </div>
      </div>

      {/* Select Button - Pushed to bottom with mt-auto */}
      <button 
        onClick={() => onSelect(product)}
        disabled={isApproved}
        className={`w-full text-[10px] font-bold uppercase tracking-[0.2em] py-3 transition-colors duration-300 mt-auto ${
          isApproved 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : product.isRecommended 
              ? 'bg-[#d4af37] text-black hover:bg-[#bfa030] hover:text-white' // Gold button for recommended
              : 'bg-black text-white hover:opacity-80'
        }`}
      >
        {isApproved ? t('approved') : product.isRecommended ? `${t('select')} • ${t('recommended')}` : t('select')}
      </button>
    </div>
  );
};
