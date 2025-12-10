
import React, { useRef, useState } from 'react';
import { Product } from '../types';
import { Camera } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useLanguage } from '../LanguageContext';

interface PaymentPageProps {
  product: Product;
  onConfirmPayment: () => void;
  onBack: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ product, onConfirmPayment, onBack }) => {
  const { t } = useLanguage();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleScreenshot = async () => {
    if (receiptRef.current) {
      setIsCapturing(true);
      try {
        const canvas = await html2canvas(receiptRef.current, {
          scale: 3, // High resolution for crisp barcode
          backgroundColor: '#ffffff',
          logging: false,
          useCORS: true // Ensure images load correctly
        });
        
        const image = canvas.toDataURL("image/png");
        
        // Create download link
        const link = document.createElement('a');
        link.href = image;
        link.download = `GUCCI-RECEIPT-${product.id}-${Date.now()}.png`;
        link.click();

        // Wait a moment then proceed
        setTimeout(() => {
          onConfirmPayment();
        }, 1500);

      } catch (error) {
        console.error("Screenshot failed:", error);
        alert("Failed to save receipt. Please try again.");
      } finally {
        setIsCapturing(false);
      }
    }
  };

  // Helper to generate random barcode lines
  const renderBarcode = () => {
    const bars = [];
    for (let i = 0; i < 60; i++) {
      const width = Math.random() > 0.6 ? 'w-1 md:w-1.5' : 'w-px md:w-0.5';
      const margin = Math.random() > 0.5 ? 'mr-0.5' : 'mr-px';
      bars.push(
        <div 
          key={i} 
          className={`h-full bg-black ${width} ${margin}`}
        ></div>
      );
    }
    return bars;
  };

  const transactionId = `TRX-${Date.now().toString().slice(-8)}-${product.id}`;
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="animate-fadeIn max-w-md mx-auto pb-12">
      
      {/* --- RECEIPT AREA START --- */}
      <div 
        ref={receiptRef} 
        className="bg-white p-8 md:p-10 shadow-2xl relative mx-auto overflow-hidden text-black"
        style={{ maxWidth: '400px', border: '1px solid #eee' }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-serif font-bold tracking-[0.2em] mb-2">GUCCI</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500">Official Receipt</p>
          <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">Florence • Rome • Milan</p>
        </div>

        {/* Divider Double Line */}
        <div className="border-t-2 border-black border-double mb-6 opacity-80"></div>

        {/* Transaction Info Header */}
        <div className="flex justify-between text-[10px] font-mono mb-8 text-gray-600 uppercase">
          <div className="flex flex-col text-left">
            <span>Date: {date}</span>
            <span>Time: {time}</span>
          </div>
          <div className="flex flex-col text-right">
            <span>No: {transactionId}</span>
            <span>Auth: APPROVED</span>
          </div>
        </div>

        {/* Product Showcase */}
        <div className="mb-8 relative group">
          <div className="aspect-square w-full bg-[#f8f8f8] border border-gray-100 p-6 flex items-center justify-center relative overflow-hidden">
            {/* Corner Accents */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-black opacity-30"></div>
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-black opacity-30"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-black opacity-30"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-black opacity-30"></div>

            <img 
              src={product.imageUrl} 
              alt="Product" 
              className="w-full h-full object-contain mix-blend-multiply filter contrast-110 drop-shadow-sm" 
            />
          </div>
        </div>

        {/* Product Details - Clean Layout */}
        <div className="mb-8">
          <h3 className="text-sm font-bold font-serif uppercase tracking-wider text-center mb-6 leading-relaxed">
            {product.name}
          </h3>

          <div className="space-y-3 text-[11px] font-sans uppercase tracking-wide">
            <div className="flex justify-between items-end border-b border-dotted border-gray-300 pb-2">
              <span className="text-gray-500">Price</span>
              <span className="font-bold text-sm">IDR {product.price}</span>
            </div>
            
            <div className="flex justify-between items-end border-b border-dotted border-gray-300 pb-2">
              <span className="text-gray-500">Benefit Applied</span>
              <span className="font-bold text-black">{product.benefit}</span>
            </div>

            <div className="flex justify-between items-end pt-2">
              <span className="font-bold">Total Profit</span>
              <span className="font-bold text-lg font-serif">IDR {product.profit}</span>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mb-8">
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-800 mb-1">
            Thank you for shopping with Gucci
          </p>
          <p className="text-[7px] text-gray-400 uppercase tracking-widest">
            Please retain this receipt for your records
          </p>
        </div>

        {/* REALISTIC BARCODE */}
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="h-14 w-[85%] flex items-stretch justify-center overflow-hidden">
            {/* Left Guard Pattern */}
            <div className="w-1 bg-black mr-px"></div>
            <div className="w-px bg-black mr-1"></div>
            
            {/* Dynamic Bars */}
            {renderBarcode()}
            
            {/* Right Guard Pattern */}
            <div className="w-px bg-black mr-px"></div>
            <div className="w-1 bg-black"></div>
          </div>
          
          <div className="mt-1 font-mono text-[9px] tracking-[0.4em] font-bold text-gray-900">
            {Date.now().toString().slice(0, 4)} {product.id.toString().padStart(4, '0')} {Math.floor(Math.random() * 9999)}
          </div>
        </div>

      </div>
      {/* --- RECEIPT AREA END --- */}

      {/* Action Buttons */}
      <div className="space-y-3 mt-8">
        <button
          onClick={handleScreenshot}
          disabled={isCapturing}
          className="w-full bg-black text-white text-xs font-bold uppercase tracking-[0.2em] py-4 hover:bg-gray-900 transition-colors shadow-xl flex items-center justify-center gap-3"
        >
          {isCapturing ? (
            <span className="animate-pulse">{t('processing')}</span>
          ) : (
            <>
              <Camera size={18} />
              <span>Simpan Bukti (Screenshot)</span>
            </>
          )}
        </button>

        <button
          onClick={onBack}
          disabled={isCapturing}
          className="w-full bg-transparent border border-gray-300 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] py-4 hover:text-black hover:border-black transition-colors"
        >
          {t('back')}
        </button>
      </div>
    </div>
  );
};
