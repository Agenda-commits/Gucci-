
import React from 'react';
import { Product } from '../types';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ConfirmationPageProps {
  product: Product;
  onBack: () => void;
  onConfirm: () => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ product, onBack, onConfirm }) => {
  const { t } = useLanguage();
  
  return (
    <div className="animate-fadeIn">
      {/* Back Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black mb-6 transition-colors"
      >
        <ArrowLeft size={12} className="mr-2" />
        {t('back')} Ke {t('agenda')}
      </button>

      <div className="text-center mb-8">
        <h1 className="text-xl font-bold font-serif tracking-widest mb-2">
          {t('order_confirmation')}
        </h1>
        <p className="text-xs text-gray-500 font-medium">
          {t('please_review')}
        </p>
      </div>

      <div className="bg-[#f5f5f5] p-6 md:p-8 max-w-md mx-auto">
        {/* Selected Item Image */}
        <div className="w-full aspect-square bg-white mb-6 flex items-center justify-center overflow-hidden relative">
           <div className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest">
             {t('selected')}
           </div>
           <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-3/4 h-3/4 object-contain mix-blend-multiply"
          />
        </div>

        {/* Details */}
        <h2 className="text-sm font-bold uppercase tracking-wide text-black mb-6 text-center leading-relaxed">
          {product.name}
        </h2>

        <div className="space-y-3 border-t border-gray-200 pt-6 mb-8">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-gray-600 uppercase tracking-wider">{t('price')}</span>
            <span className="font-bold">IDR {product.price}</span>
          </div>
          <div className="flex justify-between text-xs font-medium">
            <span className="text-gray-600 uppercase tracking-wider">{t('benefit')}</span>
            <span className="text-green-700 font-bold">{product.benefit}</span>
          </div>
          <div className="flex justify-between text-sm font-bold pt-3 border-t border-gray-200">
             <span className="uppercase tracking-wider">{t('total_profit')}</span>
             <span>IDR {product.profit}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={onConfirm}
            className="w-full bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 hover:opacity-90 transition-opacity flex items-center justify-center"
          >
            <Check size={14} className="mr-2" />
            {t('confirm_order')}
          </button>
          
          <button 
            onClick={onBack}
            className="w-full bg-white border border-gray-300 text-black text-[11px] font-bold uppercase tracking-[0.2em] py-4 hover:bg-gray-50 transition-colors"
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};
