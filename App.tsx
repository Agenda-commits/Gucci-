
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
    // Check local storage for existing login session
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

  // --- APP LOGIC ---
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  
  // Initialize state from localStorage to persist data on this device
  const [approvedAgendas, setApprovedAgendas] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('gucci_approved_agendas');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load from localStorage", error);
      return [];
    }
  });

  // UNLOCK TIMERS STATE (Map of Agenda ID -> Timestamp when it unlocks)
  const [unlockTimes, setUnlockTimes] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('gucci_unlock_times');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  });

  // Force re-render every second to update countdowns
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('gucci_approved_agendas', JSON.stringify(approvedAgendas));
  }, [approvedAgendas]);

  useEffect(() => {
    localStorage.setItem('gucci_unlock_times', JSON.stringify(unlockTimes));
  }, [unlockTimes]);

  // Default to Agenda 1 on load
  const [currentAgenda, setCurrentAgenda] = useState<number>(1);

  // Initialize currentAgenda based on progress on mount
  useEffect(() => {
    // Find the highest approved agenda number
    let maxApproved = 0;
    approvedAgendas.forEach(id => {
      if (id > maxApproved && id < 100) maxApproved = id;
    });

    if (maxApproved > 0) {
      if (maxApproved >= 5) {
         setCurrentAgenda(1);
      } else {
         setCurrentAgenda(maxApproved + 1);
      }
    }
  }, []); 

  // Helper to check if an agenda is locked
  const isAgendaLocked = (agendaId: number) => {
    // Agenda 1 is always open
    if (agendaId === 1) return false;

    // Check Time Lock first
    if (unlockTimes[agendaId]) {
      const now = Date.now();
      if (now < unlockTimes[agendaId]) {
        return true; // Still waiting for timer
      }
    }

    // Collections (100) is open only if Agenda 1 is approved
    if (agendaId === 100) return !approvedAgendas.includes(1);
    
    // Sequential locking: Agenda N is locked if Agenda N-1 is NOT in approved list
    return !approvedAgendas.includes(agendaId - 1);
  };

  // Handle Agenda Selection from Header Menu
  const handleAgendaSelect = (agendaId: number) => {
    // 1. Check if locked or waiting for timer
    if (isAgendaLocked(agendaId)) {
      if (unlockTimes[agendaId] && Date.now() < unlockTimes[agendaId]) {
        alert("Agenda ini sedang diproses. Harap tunggu hingga waktu hitung mundur selesai.");
      } else {
        alert("Please complete the previous Agenda to unlock this one.");
      }
      return;
    }

    // 2. Set Current Agenda
    setCurrentAgenda(agendaId);
    setSelectedProduct(null); // Reset selected product to show list
    setShowPayment(false);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top when switching pages
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowPayment(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (showPayment) {
      setShowPayment(false);
      return;
    }
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Initial Confirm Button Click (Pre-Payment or Direct)
  const handleConfirmOrder = () => {
    if (currentAgenda === 1) {
      // For Agenda 1, show Payment Page first
      setShowPayment(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // For others, proceed directly
      finalizeOrder();
    }
  };

  // Finalize Order (Send WA, Approve, Move Next)
  const finalizeOrder = () => {
    // WA Logic first
    if (selectedProduct) {
      if (currentAgenda === 1) {
        // Agenda 1 specific logic - Updated Number
        const phoneNumber = "6282297746696";
        const message = `Halo Admin, saya telah memilih Agenda no 1 Paket No ${selectedProduct.id} harga Rp ${selectedProduct.price}. Mohon proses paket saya:\nProduk: ${selectedProduct.name}\nKeuntungan: ${selectedProduct.profit}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      } else {
        // Logic for Agenda 2, 3, 4, 5 and Collection (100)
        const phoneNumber = "6282130903916";
        const agendaName = currentAgenda === 100 ? "COLLECTION" : `${currentAgenda}`;
        const productId = currentAgenda === 100 ? "1" : selectedProduct.id;
        const message = `Hallo , Advisor saya telah memilih Agenda no ${agendaName} Paket No ${productId} harga Rp ${selectedProduct.price}. Mohon proses paket saya:\nProduk: ${selectedProduct.name}\nKeuntungan: ${selectedProduct.profit}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      }
    }

    // STATE UPDATE LOGIC (Looping vs Progression)
    if (currentAgenda === 5) {
      // LOOP LOGIC: 
      // Reset everything to start over
      setApprovedAgendas([]); 
      setUnlockTimes({}); // Reset timers
      setCurrentAgenda(1); 
    } else {
      // STANDARD PROGRESSION (Agenda 1 -> 2 -> 3 -> 4 -> 5)
      
      // 1. Mark current agenda as approved
      if (!approvedAgendas.includes(currentAgenda)) {
        const newApproved = [...approvedAgendas, currentAgenda];
        setApprovedAgendas(newApproved);
      }

      // 2. Set 5-Minute Timer for the NEXT Agenda
      const nextAgendaId = currentAgenda + 1;
      const unlockTimestamp = Date.now() + (5 * 60 * 1000); // 5 minutes from now
      
      const newUnlockTimes = { ...unlockTimes };
      
      // Lock Next Agenda
      if (nextAgendaId <= 5) {
        newUnlockTimes[nextAgendaId] = unlockTimestamp;
      }

      // Special case: If Agenda 1 finished, also lock Collection (100) for 5 mins if we want strict timing
      if (currentAgenda === 1) {
        newUnlockTimes[100] = unlockTimestamp;
      }
      
      setUnlockTimes(newUnlockTimes);
    }

    // 3. Return to list view and reset state
    setShowPayment(false);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get products based on current Agenda (only needed for 1-5)
  const currentProducts = GET_PRODUCTS(currentAgenda);

  // Determine if products should be displayed as full cards
  const isFullCard = currentAgenda === 1 || currentAgenda === 6; 
  const isCollectionsPage = currentAgenda === 100;
  
  // Check if CURRENT agenda is approved to lock buttons
  const isApproved = approvedAgendas.includes(currentAgenda);

  // Dynamic Subtitle Logic
  const getSubtitle = () => {
    if (currentAgenda === 4 || currentAgenda === 5) {
      return `${t('benefit')} 30%`;
    }
    return `${t('benefit')} 20%`;
  };

  // --- CONDITIONAL RENDER: LOGIN ---
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-gray-200 flex flex-col">
      <Header 
        currentAgenda={currentAgenda} 
        onSelectAgenda={handleAgendaSelect} 
        approvedAgendas={approvedAgendas}
        unlockTimes={unlockTimes}
      />

      <main className="flex-grow max-w-4xl mx-auto px-4 md:px-8 pt-2 w-full relative">
        {/* VIEW LOGIC: Product Details -> Collection -> Agenda List */}
        
        {selectedProduct ? (
          /* Check flow: Show Payment Page OR Confirmation Page */
          showPayment ? (
            <div className="mt-8">
              <PaymentPage 
                product={selectedProduct}
                onBack={() => setShowPayment(false)}
                onConfirmPayment={finalizeOrder}
              />
            </div>
          ) : (
            <div className="mt-8">
              <ConfirmationPage 
                product={selectedProduct} 
                onBack={handleBack} 
                onConfirm={handleConfirmOrder}
              />
            </div>
          )
        ) : isCollectionsPage ? (
          /* SPECIAL PAGE: Collections View */
          <div className="mt-4">
             <CollectionsPage 
               onSelect={(item) => {
                 handleSelectProduct({
                   id: 1, 
                   name: item.name,
                   price: item.price,
                   benefit: item.benefitPercent,
                   profit: item.profitAmount,
                   imageUrl: item.imageUrl
                 });
               }} 
               isApproved={isApproved}
             />
          </div>
        ) : (
          /* PAGE 1: Standard Agenda List View */
          <>
            {/* Hero Title */}
            <div className="text-center mb-8 mt-4 animate-fadeIn relative">
              <h1 className="text-2xl font-bold font-serif tracking-widest mb-6 uppercase">
                {t('agenda')} {currentAgenda}
              </h1>
              
              {/* Approved Stamp on Main Page */}
              {isApproved && (
                <div className="absolute top-0 right-0 md:right-20 rotate-12 border-4 border-green-600 text-green-600 px-4 py-1 text-sm font-bold uppercase tracking-widest opacity-80 pointer-events-none">
                  {t('approved')}
                </div>
              )}

              <div className="max-w-md mx-auto px-4">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-2 text-black">
                  {getSubtitle()}
                </h2>
                <p className="text-xs md:text-sm font-medium leading-relaxed text-gray-900">
                  The House's curation includes fine fragrances for men and women, as well as designer beauty gift sets.
                </p>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-8 md:gap-y-12 animate-fadeIn">
              {currentProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onSelect={handleSelectProduct}
                  isFullCard={isFullCard}
                  isApproved={isApproved} // Pass approval state to lock buttons
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
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
