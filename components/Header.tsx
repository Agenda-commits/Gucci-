
import React, { useState } from 'react';
import { ShoppingBag, User, Menu, Plus, X, CheckCircle, Lock } from 'lucide-react';

interface HeaderProps {
  currentAgenda: number;
  onSelectAgenda: (id: number) => void;
  approvedAgendas: number[];
  unlockTimes: Record<number, number>;
}

export const Header: React.FC<HeaderProps> = ({ currentAgenda, onSelectAgenda, approvedAgendas = [], unlockTimes = {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAgendaClick = (id: number, isLocked: boolean) => {
    if (isLocked) return;
    onSelectAgenda(id);
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    const phoneNumber = "6281356112840";
    const message = "Hallo , saya peserta Gucci membutuhkan bantuan , terimakasih";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleWebClick = () => {
    window.open('https://gconline.online', '_blank');
  };

  const handleShopClick = () => {
    window.open('https://www.gucci.com', '_blank');
  };

  // Helper to format time remaining (Logic kept for internal checks if needed, but not rendered)
  const getTimeRemaining = (id: number) => {
    if (!unlockTimes[id]) return null;
    const diff = unlockTimes[id] - Date.now();
    if (diff <= 0) return null;

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isLocked = (id: number) => {
    if (id === 1) return false; 
    
    // Time Lock Check
    if (unlockTimes[id] && Date.now() < unlockTimes[id]) {
      return true;
    }

    if (id === 100) return !approvedAgendas.includes(1);
    return !approvedAgendas.includes(id - 1);
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4 md:px-8 border-b border-gray-100 relative bg-white">
          {/* Logo */}
          <div 
            className="text-3xl tracking-[0.2em] font-serif font-bold text-black cursor-default select-none"
          >
            GUCCI
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5 text-black relative">
            <ShoppingBag size={20} strokeWidth={1.5} className="cursor-pointer hover:opacity-70" onClick={handleShopClick} />
            <User size={20} strokeWidth={1.5} className="cursor-pointer hover:opacity-70" onClick={handleWebClick} />
            <button onClick={toggleMenu} className="focus:outline-none hover:opacity-70">
              {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Sub-header contact link */}
        <div className="px-4 py-3 md:px-8 bg-white relative z-10">
          <button 
            onClick={handleContactClick}
            className="flex items-center text-[10px] font-bold uppercase tracking-widest text-black hover:opacity-70 transition-opacity"
          >
            <Plus size={10} className="mr-1" strokeWidth={3} />
            Contact Us
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay (Agenda) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fadeIn pt-24 px-8 overflow-y-auto">
          <div className="absolute top-0 left-0 right-0 px-4 py-4 md:px-8 flex justify-end border-b border-transparent">
             <button onClick={toggleMenu} className="p-1 hover:opacity-70">
               <X size={24} strokeWidth={1.5} />
             </button>
          </div>

          <div className="flex flex-col items-center space-y-6 pb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Select Agenda</h2>
            {[1, 2, 3, 4, 5].map((num) => {
              const locked = isLocked(num);
              const approved = approvedAgendas.includes(num);
              
              return (
                <button
                  key={num}
                  onClick={() => handleAgendaClick(num, locked)}
                  disabled={locked}
                  className={`text-2xl font-serif tracking-widest transition-colors flex items-center gap-3 ${
                    currentAgenda === num ? 'text-black font-bold' : 
                    locked ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <span className={currentAgenda === num ? 'border-b-2 border-black pb-1' : ''}>
                    AGENDA {num}
                  </span>
                  
                  {locked && <Lock size={16} className="text-gray-300" />}
                  
                  {/* Timer Display Removed for Secrecy */}
                  
                  {!locked && approved && (
                    <div className="flex items-center bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                      <CheckCircle size={12} className="mr-1" />
                      Approved
                    </div>
                  )}
                </button>
              );
            })}
            
            <div className="w-12 h-px bg-gray-200 my-8"></div>
            
            <button 
              onClick={() => handleAgendaClick(100, isLocked(100))}
              disabled={isLocked(100)}
              className={`text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                currentAgenda === 100 ? 'text-black border-b border-black' : 
                isLocked(100) ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:opacity-70'
              }`}
            >
              Collections
              {isLocked(100) && <Lock size={12} />}
              
              {/* Collection Timer Removed for Secrecy */}

              {!isLocked(100) && approvedAgendas.includes(100) && (
                <div className="flex items-center bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ml-2">
                  <CheckCircle size={12} className="mr-1" />
                  Approved
                </div>
              )}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};
