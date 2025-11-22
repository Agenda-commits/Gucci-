import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 px-4 pb-8 md:px-8 text-black">
      <div className="flex items-center gap-2 mb-6">
        <Globe size={24} strokeWidth={1.5} />
        <div className="flex flex-col">
           <span className="text-[10px] uppercase tracking-widest">Gucci</span>
           <span className="text-sm font-serif font-bold uppercase tracking-widest">OSTERIA PALAZZO</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-[10px] font-semibold text-gray-600 text-center">
          © 2016 - 2025 Guccio Gucci S.p.A. - All rights reserved. SIAE LICENCE # 2294/I/1936 and 5647/I/1936
        </p>
      </div>
    </footer>
  );
};