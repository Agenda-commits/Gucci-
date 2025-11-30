
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { FileText, ExternalLink, Check, ArrowLeft } from 'lucide-react';

interface ContractPageProps {
  agendaId: number;
  onAgree: () => void;
  onBack: () => void;
}

export const ContractPage: React.FC<ContractPageProps> = ({ agendaId, onAgree, onBack }) => {
  const { t } = useLanguage();
  const contractUrl = "https://kontrak-agenda.vercel.app/";

  const handleOpenContract = () => {
    window.open(contractUrl, '_blank');
  };

  const displayAgenda = agendaId === 100 ? "Collection" : `${t('agenda')} ${agendaId}`;

  return (
    <div className="animate-fadeIn w-full max-w-md mx-auto mt-8">
       {/* Back Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black mb-6 transition-colors"
      >
        <ArrowLeft size={12} className="mr-2" />
        {t('back')}
      </button>

      <div className="bg-white border border-gray-200 shadow-xl p-6 md:p-8 text-center relative overflow-hidden">
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-black"></div>

        <div className="flex justify-center mb-6 mt-2">
          <div className="p-4 bg-gray-50 rounded-full border border-gray-100">
             <FileText size={40} strokeWidth={1} className="text-black" />
          </div>
        </div>

        <h2 className="text-xl font-serif font-bold uppercase tracking-widest mb-4">
          {t('contract_agreement')}
        </h2>
        
        <div className="bg-gray-50 p-4 mb-8 border border-gray-100">
          <p className="text-xs text-gray-600 font-medium leading-relaxed uppercase tracking-wide">
            {t('contract_desc').replace('{agenda}', displayAgenda)}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleOpenContract}
            className="w-full bg-black text-white text-xs font-bold uppercase tracking-[0.2em] py-4 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>{t('open_contract')}</span>
            <ExternalLink size={14} />
          </button>

          <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-300 text-[9px] uppercase tracking-widest font-bold">Confirmation</span>
              <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            onClick={onAgree}
            className="w-full bg-white border border-green-600 text-green-700 text-xs font-bold uppercase tracking-[0.2em] py-4 hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
          >
            <Check size={16} />
            <span>{t('i_agree')}</span>
          </button>
        </div>
        
        <p className="mt-6 text-[9px] text-gray-400 font-medium italic">
           * By clicking "I Agree", you confirm that you have read and accepted the terms in the external contract.
        </p>
      </div>
    </div>
  );
};
