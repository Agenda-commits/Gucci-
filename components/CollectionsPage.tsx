import React from 'react';
import { COLLECTION_PRODUCTS } from '../constants';
import { Star } from 'lucide-react';

interface CollectionsPageProps {
  onSelect: (product: any) => void;
  isApproved?: boolean;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ onSelect, isApproved = false }) => {
  if (COLLECTION_PRODUCTS.length === 0) {
    return <div className="min-h-[50vh] flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest">Collection Empty</div>;
  }

  const product = COLLECTION_PRODUCTS[0];

  return (
    <div className="animate-fadeIn pb-12">
      {/* Premium Header Banner */}
      <div className="bg-black text-[#d4af37] py-6 px-4 text-center mb-8 border-b-4 border-[#d4af37]">
        <h2 className="text-2xl font-serif font-bold uppercase tracking-widest mb-2">Weekend Collection</h2>
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
          <Star size={12} fill="white" />
          <span>Special Premium Offer</span>
          <Star size={12} fill="white" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl border border-gray-200 overflow-hidden relative">
          {/* Product Image Area */}
          <div className="relative w-full aspect-square bg-[#f0f0f0]">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-contain p-8 mix-blend-multiply"
            />
            {/* Exclusive Badge */}
            <div className="absolute top-0 right-0 bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-widest py-2 px-4 shadow-md">
              Weekend Only
            </div>
          </div>

          {/* Product Content */}
          <div className="p-6 md:p-8">
            <h1 className="text-xl md:text-2xl font-serif font-bold text-center uppercase tracking-widest mb-2">
              {product.name}
            </h1>
            <p className="text-center text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-8">
              Design Spesial Premium
            </p>

            {/* Premium Pricing Table */}
            <div className="bg-black text-white rounded-sm overflow-hidden mb-8 border border-[#d4af37]">
              <div className="grid grid-cols-2 border-b border-gray-800">
                <div className="p-4 text-[10px] font-bold uppercase tracking-widest text-[#d4af37] border-r border-gray-800 flex items-center">
                  Harga Modal
                </div>
                <div className="p-4 text-sm font-medium font-serif tracking-wider text-right">
                  Rp {product.price}
                </div>
              </div>
              
              <div className="grid grid-cols-2 border-b border-gray-800 bg-[#111]">
                <div className="p-4 text-[10px] font-bold uppercase tracking-widest text-[#d4af37] border-r border-gray-800 flex items-center">
                  Benefit (%)
                </div>
                <div className="p-4 text-sm font-medium font-serif tracking-wider text-right text-green-400">
                  {product.benefitPercent}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-800">
                <div className="p-4 text-[10px] font-bold uppercase tracking-widest text-[#d4af37] border-r border-gray-800 flex items-center">
                  Keuntungan
                </div>
                <div className="p-4 text-sm font-medium font-serif tracking-wider text-right">
                  Rp {product.profitAmount}
                </div>
              </div>

              <div className="grid grid-cols-2 bg-[#d4af37] text-black">
                <div className="p-4 text-[10px] font-bold uppercase tracking-widest border-r border-black/10 flex items-center">
                  Total Penarikan
                </div>
                <div className="p-4 text-lg font-bold font-serif tracking-wider text-right">
                  Rp {product.totalWithdraw}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={() => onSelect(product)}
              disabled={isApproved}
              className={`w-full text-xs font-bold uppercase tracking-[0.3em] py-5 transition-all duration-300 border ${
                isApproved 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200' 
                  : 'bg-black text-white hover:bg-[#d4af37] hover:text-black border-black'
              }`}
            >
              {isApproved ? 'Approved' : 'Klaim Sekarang'}
            </button>
          </div>
        </div>
        
        {/* Footer Note */}
        <div className="text-center mt-6">
           <p className="text-[10px] uppercase tracking-widest text-gray-500">Limited Availability • Weekend Exclusive</p>
        </div>
      </div>
    </div>
  );
};