import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScienceChart } from './components/ScienceChart';
import { InkAlchemist } from './components/InkAlchemist';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Journal } from './components/Journal';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { InkProduct, QuoteItem, ContactMessage, SubmittedQuote, GeneratedInk } from './types';

// Initial Data
const initialProducts: InkProduct[] = [
  {
    id: '1',
    name: 'Ultra-High Sublimation',
    description: 'Engineered for extreme vibrancy and transfer efficiency on polyester substrates. Maximum pigment load.',
    price: 85,
    showPrice: true,
    tags: ['Polyester', 'High Density'],
    variants: [
      { name: 'Cyan', hex: '#00b4d8' },
      { name: 'Magenta', hex: '#d946ef' },
      { name: 'Yellow', hex: '#facc15' },
      { name: 'Jet Black', hex: '#171717' },
    ],
    compatibility: ['Automatic Oval Press', 'Rotary Screen Machine', 'Flatbed Screen Press'],
    specs: {
      viscosity: 25,
      saturation: 98,
      sheen: 'Vibrant Matte'
    }
  },
  {
    id: '2',
    name: 'Reactive Dye Series',
    description: 'Forms a permanent covalent bond with cellulose fibers. Unmatched wash fastness for cotton and viscose.',
    price: 92,
    showPrice: true,
    tags: ['Cotton', 'Permanent'],
    variants: [
      { name: 'Crimson Red', hex: '#e11d48' },
      { name: 'Deep Navy', hex: '#1e3a8a' },
      { name: 'Forest Green', hex: '#14532d' },
      { name: 'Sunset Orange', hex: '#ea580c' },
    ],
    compatibility: ['Industrial Rotary Screen', 'Flatbed Digital Hybrid', 'Continuous Dyeing Range'],
    specs: {
      viscosity: 12,
      saturation: 92,
      sheen: 'Natural Fiber'
    }
  },
  {
    id: '3',
    name: 'Acid Dye Premium',
    description: 'Specially formulated for protein fibers like silk and wool. Superior clarity and penetration.',
    price: 98,
    showPrice: true,
    tags: ['Silk & Wool', 'Vibrant'],
    variants: [
      { name: 'Royal Purple', hex: '#7c3aed' },
      { name: 'Emerald', hex: '#10b981' },
      { name: 'Hot Pink', hex: '#db2777' },
      { name: 'Sapphire', hex: '#2563eb' },
    ],
    compatibility: ['Flatbed Screen Printer', 'Rotary Textile Printer', 'Steam Fixation Line'],
    specs: {
      viscosity: 15,
      saturation: 88,
      sheen: 'Silk Luster'
    }
  },
  {
    id: '4',
    name: 'Soft-Hand Plastisol',
    description: 'Creamy body for smooth screening on 100% cotton with a matte finish and zero-hand feel.',
    price: 65,
    showPrice: true,
    tags: ['Matte', 'Soft Touch'],
    variants: [
      { name: 'Midnight Black', hex: '#121212' },
      { name: 'Ghost White', hex: '#f5f5f5' },
      { name: 'Charcoal', hex: '#404040' },
      { name: 'Navy', hex: '#172554' },
    ],
    compatibility: ['Automatic Screen Press', 'Manual Carousel', 'Belt Oven Curing'],
    specs: {
      viscosity: 85,
      saturation: 100,
      sheen: 'Soft Matte'
    }
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'storefront' | 'admin'>('storefront');
  const [modalData, setModalData] = useState<{product: InkProduct, initialVariantIndex: number} | null>(null);
  
  // App State
  const [products, setProducts] = useState<InkProduct[]>(() => {
    try {
      const saved = localStorage.getItem('inkzone_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch { return initialProducts; }
  });

  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  
  const [submittedQuotes, setSubmittedQuotes] = useState<SubmittedQuote[]>(() => {
    try {
      const saved = localStorage.getItem('inkzone_quotes');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('inkzone_messages');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Cross-Tab Synchronization (Event-based)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      try {
        if (e.key === 'inkzone_products' && e.newValue) setProducts(JSON.parse(e.newValue));
        if (e.key === 'inkzone_quotes' && e.newValue) setSubmittedQuotes(JSON.parse(e.newValue));
        if (e.key === 'inkzone_messages' && e.newValue) setMessages(JSON.parse(e.newValue));
      } catch (err) {
        console.error("Sync error", err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Polling Sync (Fallback for robustness, checks every 1s)
  useEffect(() => {
    const interval = setInterval(() => {
        try {
            const storedQuotes = localStorage.getItem('inkzone_quotes');
            if (storedQuotes) {
                const parsed = JSON.parse(storedQuotes);
                if (JSON.stringify(parsed) !== JSON.stringify(submittedQuotes)) {
                    setSubmittedQuotes(parsed);
                }
            }

            const storedMessages = localStorage.getItem('inkzone_messages');
            if (storedMessages) {
                const parsed = JSON.parse(storedMessages);
                if (JSON.stringify(parsed) !== JSON.stringify(messages)) {
                    setMessages(parsed);
                }
            }
            
            const storedProducts = localStorage.getItem('inkzone_products');
            if (storedProducts) {
                const parsed = JSON.parse(storedProducts);
                if (JSON.stringify(parsed) !== JSON.stringify(products)) {
                    setProducts(parsed);
                }
            }
        } catch (e) {
            // Ignore polling errors
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [submittedQuotes, messages, products]);

  // Persistence Effects
  useEffect(() => {
    const json = JSON.stringify(products);
    if (localStorage.getItem('inkzone_products') !== json) localStorage.setItem('inkzone_products', json);
  }, [products]);

  useEffect(() => {
    const json = JSON.stringify(submittedQuotes);
    if (localStorage.getItem('inkzone_quotes') !== json) localStorage.setItem('inkzone_quotes', json);
  }, [submittedQuotes]);

  useEffect(() => {
    const json = JSON.stringify(messages);
    if (localStorage.getItem('inkzone_messages') !== json) localStorage.setItem('inkzone_messages', json);
  }, [messages]);

  // Handlers
  const handleAddToQuote = (product: InkProduct, variantIndex: number) => {
    const newItem: QuoteItem = {
      productId: product.id,
      productName: product.name,
      variant: product.variants[variantIndex]
    };
    setQuoteItems(prev => [...prev, newItem]);
  };

  const handleAddCustomToQuote = (ink: GeneratedInk) => {
    const details = `Specs: Viscosity ${ink.composition.viscosity} | Pigment ${ink.composition.saturation}% | Finish: ${ink.composition.sheen} | Notes: ${ink.description}`;
    const newItem: QuoteItem = {
      productId: 'custom-ai-' + Math.random().toString(36).substr(2, 9),
      productName: `Custom: ${ink.name}`,
      variant: { name: 'AI Formulation', hex: ink.hex },
      details: details
    };
    setQuoteItems(prev => [...prev, newItem]);
  };

  const handleOpenCategory = (category: string) => {
    let targetProductId = '';
    if (category === 'Plastisol') targetProductId = '4'; 
    else if (category === 'Water-Based') targetProductId = '1';
    else if (category === 'Dyes') targetProductId = '2';
    else if (category === 'Special Effects') targetProductId = '3';

    const product = products.find(p => p.id === targetProductId);
    if (product) {
      setModalData({ product, initialVariantIndex: 0 });
    } else {
      const element = document.getElementById('collection');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (formData: any) => {
    const timestamp = new Date().toLocaleString();
    if (quoteItems.length > 0) {
      const newQuote: SubmittedQuote = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        items: [...quoteItems],
        message: formData.message,
        date: timestamp,
        status: 'Pending'
      };
      setSubmittedQuotes(prev => {
          const updated = [newQuote, ...prev];
          localStorage.setItem('inkzone_quotes', JSON.stringify(updated));
          return updated;
      });
      setQuoteItems([]); 
    } else {
      const newMessage: ContactMessage = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.inquiryType,
        message: formData.message,
        date: timestamp,
        read: false
      };
      setMessages(prev => {
          const updated = [newMessage, ...prev];
          localStorage.setItem('inkzone_messages', JSON.stringify(updated));
          return updated;
      });
    }
  };

  const handleProductUpdate = (updatedProduct: InkProduct) => {
    setProducts(prev => {
        const updated = prev.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        localStorage.setItem('inkzone_products', JSON.stringify(updated));
        return updated;
    });
  };

  const handleProductAdd = (newProduct: InkProduct) => {
    setProducts(prev => {
        const updated = [...prev, newProduct];
        localStorage.setItem('inkzone_products', JSON.stringify(updated));
        return updated;
    });
  };

  const handleProductDelete = (id: string) => {
    setProducts(prev => {
        const updated = prev.filter(p => p.id !== id);
        localStorage.setItem('inkzone_products', JSON.stringify(updated));
        return updated;
    });
  };

  const handleQuoteStatusUpdate = (id: string, status: SubmittedQuote['status']) => {
    setSubmittedQuotes(prev => {
        const updated = prev.map(q => q.id === id ? { ...q, status } : q);
        localStorage.setItem('inkzone_quotes', JSON.stringify(updated));
        return updated;
    });
  };

  const handleMessageRead = (id: string) => {
    setMessages(prev => {
        const updated = prev.map(m => m.id === id ? { ...m, read: true } : m);
        localStorage.setItem('inkzone_messages', JSON.stringify(updated));
        return updated;
    });
  };

  if (currentView === 'admin') {
    return (
      <AdminPanel 
        onExit={() => setCurrentView('storefront')}
        products={products}
        quotes={submittedQuotes}
        messages={messages}
        onUpdateProduct={handleProductUpdate}
        onAddProduct={handleProductAdd}
        onDeleteProduct={handleProductDelete}
        onUpdateQuoteStatus={handleQuoteStatusUpdate}
        onMarkMessageRead={handleMessageRead}
      />
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 text-white selection:bg-gold-400 selection:text-black">
      <Navbar quoteCount={quoteItems.length} onOpenCategory={handleOpenCategory} />
      <main>
        <Hero />
        <section id="collection" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-gold-400 tracking-widest uppercase text-sm mb-3">Professional Series</h2>
             <h3 className="text-4xl font-serif text-white">The Printer's Choice</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={idx} 
                onQuickView={(p, variantIdx) => setModalData({ product: p, initialVariantIndex: variantIdx })}
                onAddToQuote={handleAddToQuote}
              />
            ))}
          </div>
        </section>
        <ScienceChart />
        <InkAlchemist onAddToQuote={handleAddCustomToQuote} />
        <About />
        <Contact quoteItems={quoteItems} onSubmit={handleFormSubmit} />
        <Journal />
      </main>
      <Footer onAdminClick={() => setCurrentView('admin')} />
      {modalData && (
        <ProductModal 
          product={modalData.product} 
          initialVariantIndex={modalData.initialVariantIndex}
          onClose={() => setModalData(null)} 
          onAddToQuote={handleAddToQuote}
        />
      )}
    </div>
  );
};

export default App;