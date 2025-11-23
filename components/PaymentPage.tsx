
import React from 'react';
import { Product } from '../types';
import { Copy } from 'lucide-react';

interface PaymentPageProps {
  product: Product;
  onConfirmPayment: () => void;
  onBack: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ product, onConfirmPayment, onBack }) => {
  const accountNumber = "001901135040506";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    alert("Nomor rekening disalin!");
  };

  return (
    <div className="animate-fadeIn max-w-md mx-auto p-6 bg-white border border-gray-200 shadow-lg relative">
      <div className="text-center mb-8">
        <h2 className="text-sm font-bold text-black uppercase tracking-widest leading-relaxed">
          🌐 PT. Graha Citra Prima – GUCCI 🌐
        </h2>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-2 flex items-center">
          💳 Detail Pembayaran:
        </h3>
        <div className="w-full h-px bg-black mb-6"></div>

        <div className="space-y-4 text-xs font-medium text-gray-800 font-sans">
          <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
            <span className="text-gray-500 uppercase tracking-wide">Nominal</span>
            <span className="font-bold text-base">Rp {product.price}</span>
          </div>
          <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
             <span className="text-gray-500 uppercase tracking-wide">Bank</span>
             <span className="font-bold text-base">BRI</span>
          </div>
          <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
             <span className="text-gray-500 uppercase tracking-wide">Nama Rekening</span>
             <span className="font-bold uppercase text-right">SYAHRIL RAMADHAN</span>
          </div>
          <div className="flex flex-col mt-4 bg-gray-50 p-4 rounded border border-gray-100">
             <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">No. Rekening</span>
             <div className="flex items-center justify-between">
               <span className="font-bold text-xl tracking-widest text-black">{accountNumber}</span>
               <button onClick={handleCopy} className="text-gray-400 hover:text-black transition-colors" title="Copy">
                 <Copy size={16} />
               </button>
             </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-[10px] text-gray-600 text-center italic leading-relaxed">
          Catatan: Apabila pembayaran telah dilakukan, silakan konfirmasikan bukti pembayarannya kepada Customer Service
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onConfirmPayment}
          className="w-full bg-green-600 text-white text-xs font-bold uppercase tracking-[0.2em] py-4 hover:bg-green-700 transition-colors shadow-sm"
        >
          Konfirmasi WhatsApp
        </button>

        <button
          onClick={onBack}
          className="w-full bg-white text-black border border-gray-200 text-xs font-bold uppercase tracking-[0.2em] py-4 hover:bg-gray-50 transition-colors"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};
