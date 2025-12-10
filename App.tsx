
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CollectionsPage } from './components/CollectionsPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { PaymentPage } from './components/PaymentPage';
import { LoginPage } from './components/LoginPage';
import { Footer } from './components/Footer';
import { GET_PRODUCTS } from './constants';
import { Product } from './types';
import { LanguageProvider, useLanguage } from './LanguageContext';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  
  // --- AUTHENTICATION STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{name: string, phone: string} | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('gucci_user_session');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (name: string, phone: string) => {
    const user = { name, phone };
    localStorage.setItem('gucci_user_session', JSON.stringify(user));
    setUserData(user);
    setIsLoggedIn(true);
  };

  // --- APP STATE ---
  const [currentAgenda, setCurrentAgenda] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // View state flow: list -> confirm -> payment
  const [viewState, setViewState] = useState<'list' | 'confirm' | 'payment'>('list');
  
  const [approvedAgendas, setApprovedAgendas] = useState<number[]>([]);
  const [unlockTimes, setUnlockTimes] = useState<Record<number, number>>({});

  useEffect(() => {
    const storedApproved = localStorage.getItem('gucci_approved_agendas');
    if (storedApproved) {
      setApprovedAgendas(JSON.parse(storedApproved));
    }
    const storedTimes = localStorage.getItem('gucci_unlock_times');
    if (storedTimes) {
      setUnlockTimes(JSON.parse(storedTimes));
    }
  }, []);

  const handleSelectAgenda = (id: number) => {
    setCurrentAgenda(id);
    setViewState('list');
    setSelectedProduct(null);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setViewState('confirm');
  };

  const handleConfirmOrder = () => {
    // DIRECT FLOW: Confirm -> Payment (Skipping Contract)
    setViewState('payment');
  };

  const handleBack = () => {
    if (viewState === 'confirm') {
      setSelectedProduct(null);
      setViewState('list');
    } else if (viewState === 'payment') {
      setViewState('confirm');
    }
  };

  const handlePaymentSuccess = () => {
    // Approve current agenda locally
    const updatedApproved = [...approvedAgendas];
    if (!updatedApproved.includes(currentAgenda)) {
      updatedApproved.push(currentAgenda);
      setApprovedAgendas(updatedApproved);
      localStorage.setItem('gucci_approved_agendas', JSON.stringify(updatedApproved));
    }

    // Reset view to list
    setSelectedProduct(null);
    setViewState('list');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-black selection:bg-black selection:text-white flex flex-col">
      <Header 
        currentAgenda={currentAgenda} 
        onSelectAgenda={handleSelectAgenda}
        approvedAgendas={approvedAgendas}
        unlockTimes={unlockTimes}
      />
      
      <main className="flex-grow pt-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {viewState === 'list' && (
           <div className="animate-fadeIn">
              {currentAgenda === 100 ? (
                <CollectionsPage 
                  onSelect={(p: any) => handleSelectProduct(p)} 
                  isApproved={approvedAgendas.includes(100)} 
                />
              ) : (
                <>
                  <div className="mb-8 text-center">
                    <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-2">
                       {t('agenda')} {currentAgenda}
                    </h2>
                    <div className="w-12 h-1 bg-black mx-auto"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {GET_PRODUCTS(currentAgenda).map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onSelect={handleSelectProduct}
                        isApproved={approvedAgendas.includes(currentAgenda)}
                      />
                    ))}
                  </div>
                </>
              )}
           </div>
        )}

        {viewState === 'confirm' && selectedProduct && (
          <ConfirmationPage 
            product={selectedProduct} 
            onBack={handleBack} 
            onConfirm={handleConfirmOrder} 
          />
        )}

        {viewState === 'payment' && selectedProduct && (
          <PaymentPage 
             product={selectedProduct}
             onBack={handleBack}
             onConfirmPayment={handlePaymentSuccess}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
