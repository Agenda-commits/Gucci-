
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CollectionsPage } from './components/CollectionsPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { PaymentPage } from './components/PaymentPage';
import { Footer } from './components/Footer';
import { GET_PRODUCTS } from './constants';
import { Product } from './types';

const App: React.FC = () => {
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

  // Save to localStorage whenever approvedAgendas changes
  useEffect(() => {
    localStorage.setItem('gucci_approved_agendas', JSON.stringify(approvedAgendas));
  }, [approvedAgendas]);

  // Default to Agenda 1 on load
  const [currentAgenda, setCurrentAgenda] = useState<number>(1);

  // Initialize currentAgenda based on progress on mount
  useEffect(() => {
    // Find the highest approved agenda number
    let maxApproved = 0;
    approvedAgendas.forEach(id => {
      if (id > maxApproved && id < 100) maxApproved = id;
    });

    // If maxApproved is 0, stick to 1.
    // If maxApproved is 1, go to 2.
    // If maxApproved is 5, go to Collection (100).
    if (maxApproved > 0) {
      if (maxApproved >= 5) {
         setCurrentAgenda(100);
      } else {
         setCurrentAgenda(maxApproved + 1);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Helper to check if an agenda is locked
  const isAgendaLocked = (agendaId: number) => {
    // Agenda 1 is always open
    if (agendaId === 1) return false;
    // Collections (100) is open only if Agenda 1 is approved
    if (agendaId === 100) return !approvedAgendas.includes(1);
    
    // Sequential locking: Agenda N is locked if Agenda N-1 is NOT in approved list
    return !approvedAgendas.includes(agendaId - 1);
  };

  // Handle Agenda Selection from Header Menu
  const handleAgendaSelect = (agendaId: number) => {
    if (isAgendaLocked(agendaId)) {
      alert("Please complete the previous Agenda to unlock this one.");
      return;
    }
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
    // 1. Mark current agenda as approved if not already
    if (!approvedAgendas.includes(currentAgenda)) {
      const newApproved = [...approvedAgendas, currentAgenda];
      setApprovedAgendas(newApproved);
    }

    if (selectedProduct) {
      if (currentAgenda === 1) {
        // Agenda 1 specific logic - Updated Number
        const phoneNumber = "6282310653328";
        const message = `Halo Admin, saya telah memilih Agenda no 1 Paket No ${selectedProduct.id} harga Rp ${selectedProduct.price}. Mohon proses paket saya:\nProduk: ${selectedProduct.name}\nKeuntungan: ${selectedProduct.profit}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      } else {
        // Logic for Agenda 2, 3, 4, 5 and Collection (100)
        const phoneNumber = "6281385616098";
        const agendaName = currentAgenda === 100 ? "COLLECTION" : `${currentAgenda}`;
        
        // Fix for Collection Product ID logic for WA message
        const productId = currentAgenda === 100 ? "1" : selectedProduct.id;

        // Message format for Advisor
        const message = `Hallo , Advisor saya telah memilih Agenda no ${agendaName} Paket No ${productId} harga Rp ${selectedProduct.price}. Mohon proses paket saya:\nProduk: ${selectedProduct.name}\nKeuntungan: ${selectedProduct.profit}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      }
    }

    // Auto-advance to next agenda if available and not finished (only for numbered agendas)
    if (currentAgenda < 5) {
      setCurrentAgenda(currentAgenda + 1);
    }

    // 3. Return to list view and reset state
    setShowPayment(false);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get products based on current Agenda (only needed for 1-5)
  const currentProducts = GET_PRODUCTS(currentAgenda);

  // Determine if products should be displayed as full cards (cover) or contained (PNG style)
  // Agenda 1 uses full background JPGs
  const isFullCard = currentAgenda === 1;
  const isCollectionsPage = currentAgenda === 100;
  
  // Check if CURRENT agenda is approved to lock buttons
  const isApproved = approvedAgendas.includes(currentAgenda);

  // Dynamic Subtitle Logic
  const getSubtitle = () => {
    if (currentAgenda === 4 || currentAgenda === 5) {
      return "BENEFIT 30%";
    }
    return "BENEFIT 20%";
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-gray-200 flex flex-col">
      <Header 
        currentAgenda={currentAgenda} 
        onSelectAgenda={handleAgendaSelect} 
        approvedAgendas={approvedAgendas}
      />

      <main className="flex-grow max-w-4xl mx-auto px-4 md:px-8 pt-2 w-full relative">
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
                AGENDA {currentAgenda}
              </h1>
              
              {/* Approved Stamp on Main Page */}
              {isApproved && (
                <div className="absolute top-0 right-0 md:right-20 rotate-12 border-4 border-green-600 text-green-600 px-4 py-1 text-sm font-bold uppercase tracking-widest opacity-80 pointer-events-none">
                  APPROVED
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
      
      {/* Simple animation style */}
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

export default App;
