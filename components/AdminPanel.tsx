import React, { useState, useEffect, useRef } from 'react';
import { InkProduct, SubmittedQuote, ContactMessage } from '../types';
import { 
  LayoutDashboard, Package, MessageSquare, FileText, LogOut, 
  Plus, Trash2, Edit2, Search, Check, X, ChevronRight, Eye, EyeOff, Bell, Activity, Radio
} from 'lucide-react';

interface AdminPanelProps {
  onExit: () => void;
  products: InkProduct[];
  quotes: SubmittedQuote[];
  messages: ContactMessage[];
  onUpdateProduct: (p: InkProduct) => void;
  onAddProduct: (p: InkProduct) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateQuoteStatus: (id: string, status: SubmittedQuote['status']) => void;
  onMarkMessageRead: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onExit, products, quotes, messages, 
  onUpdateProduct, onAddProduct, onDeleteProduct, 
  onUpdateQuoteStatus, onMarkMessageRead 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'quotes' | 'messages'>('dashboard');
  const [notification, setNotification] = useState<{type: 'quote' | 'message', text: string} | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  const prevQuotesLength = useRef(quotes.length);
  const prevMessagesLength = useRef(messages.length);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<InkProduct>>({});

  // Detect new Quotes
  useEffect(() => {
    if (quotes.length > prevQuotesLength.current) {
        setNotification({ type: 'quote', text: 'New Quote Request Received' });
        const timer = setTimeout(() => setNotification(null), 4000);
        return () => clearTimeout(timer);
    }
    prevQuotesLength.current = quotes.length;
  }, [quotes]);

  // Detect new Messages
  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
        setNotification({ type: 'message', text: 'New Message Received' });
        const timer = setTimeout(() => setNotification(null), 4000);
        return () => clearTimeout(timer);
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') setIsAuthenticated(true);
    else alert('Invalid password');
  };

  const handleSimulateIncoming = () => {
    setIsSimulating(true);
    // Inject fake data to LocalStorage to verify if Polling/Sync is working
    const fakeMsg: ContactMessage = {
      id: 'test-' + Date.now(),
      name: "System Test",
      email: "test@inkzone.com",
      type: "Connectivity Test",
      message: "This is a simulated message to verify the real-time sync heartbeat. If you see this, the connection is active.",
      date: new Date().toLocaleString(),
      read: false
    };

    setTimeout(() => {
        const current = JSON.parse(localStorage.getItem('inkzone_messages') || '[]');
        localStorage.setItem('inkzone_messages', JSON.stringify([fakeMsg, ...current]));
        setIsSimulating(false);
    }, 500);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productToSave = {
        ...editingProduct,
        id: editingProduct.id || Math.random().toString(36).substr(2, 9),
        tags: typeof editingProduct.tags === 'string' ? (editingProduct.tags as string).split(',').map((t: string) => t.trim()) : editingProduct.tags || [],
        compatibility: typeof editingProduct.compatibility === 'string' ? (editingProduct.compatibility as string).split(',').map((t: string) => t.trim()) : editingProduct.compatibility || [],
        variants: editingProduct.variants || [{ name: 'Black', hex: '#000000' }],
        showPrice: editingProduct.showPrice !== false,
        specs: editingProduct.specs || { viscosity: 50, saturation: 50, sheen: 'Standard' }
    } as InkProduct;

    if (editingProduct.id) onUpdateProduct(productToSave);
    else onAddProduct(productToSave);
    setIsEditingProduct(false);
    setEditingProduct({});
  };

  const handleEditClick = (product: InkProduct) => {
      setEditingProduct(product);
      setIsEditingProduct(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center p-4">
        <div className="bg-ink-900 border border-white/10 p-8 rounded-2xl w-full max-w-md text-center">
          <h2 className="text-2xl font-serif text-white mb-6">InkZone Admin</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400"
              placeholder="Enter Access Key"
            />
            <button type="submit" className="w-full bg-gold-400 text-black font-bold py-3 rounded-lg hover:bg-gold-500 transition-colors">
              Enter System
            </button>
            <button type="button" onClick={onExit} className="text-gray-500 text-xs hover:text-white uppercase tracking-widest mt-4">
                Return to Store
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 flex text-gray-300 font-sans relative">
      
      {/* Toast Notification */}
      {notification && (
        <div className="absolute top-6 right-6 z-50 animate-in slide-in-from-right fade-in duration-300">
            <div className="bg-ink-900 border border-gold-400/30 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4">
                <div className="p-2 bg-gold-400/10 rounded-full text-gold-400">
                    <Bell size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gold-400 uppercase tracking-wider">Update</h4>
                    <p className="text-sm">{notification.text}</p>
                </div>
                <button onClick={() => setNotification(null)} className="ml-2 text-gray-500 hover:text-white">
                    <X size={14} />
                </button>
            </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/5 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-white/5">
            <h1 className="text-xl font-serif text-white">InkZone <span className="text-gold-400">CMS</span></h1>
            <div className="flex items-center gap-2 mt-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-green-500 font-bold">System Live</span>
            </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                { id: 'products', icon: Package, label: 'Products' },
                { id: 'quotes', icon: FileText, label: 'Quotations' },
                { id: 'messages', icon: MessageSquare, label: 'Messages' },
            ].map(item => (
                <button 
                    key={item.id}
                    onClick={() => {
                        setActiveTab(item.id as any);
                        setIsEditingProduct(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-gold-400 text-black font-medium' : 'hover:bg-white/5'}`}
                >
                    <item.icon size={18} />
                    {item.label}
                    {item.id === 'quotes' && quotes.filter(q => q.status === 'Pending').length > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            {quotes.filter(q => q.status === 'Pending').length}
                        </span>
                    )}
                    {item.id === 'messages' && messages.filter(m => !m.read).length > 0 && (
                        <span className="ml-auto bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            {messages.filter(m => !m.read).length}
                        </span>
                    )}
                </button>
            ))}
        </nav>
        <div className="p-4 border-t border-white/5">
            <button onClick={onExit} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg w-full transition-colors">
                <LogOut size={18} /> Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-serif text-white">Overview</h2>
                    <button 
                        onClick={handleSimulateIncoming} 
                        disabled={isSimulating}
                        className="bg-white/5 border border-white/10 text-xs uppercase tracking-widest px-4 py-2 rounded hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                        {isSimulating ? <Activity className="animate-spin" size={14} /> : <Radio size={14} />} 
                        {isSimulating ? 'Injecting Data...' : 'Simulate Incoming Message'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-ink-900 border border-white/10 p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><Package size={24} /></div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Total Inventory</span>
                        </div>
                        <span className="text-4xl font-bold text-white">{products.length}</span>
                        <p className="text-sm text-gray-500 mt-2">Active SKUs</p>
                    </div>
                    <div className="bg-ink-900 border border-white/10 p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-gold-400/10 rounded-lg text-gold-400"><FileText size={24} /></div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Pending Quotes</span>
                        </div>
                        <span className="text-4xl font-bold text-white">{quotes.filter(q => q.status === 'Pending').length}</span>
                        <p className="text-sm text-gray-500 mt-2">Action required</p>
                    </div>
                    <div className="bg-ink-900 border border-white/10 p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><MessageSquare size={24} /></div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Unread Messages</span>
                        </div>
                        <span className="text-4xl font-bold text-white">{messages.filter(m => !m.read).length}</span>
                        <p className="text-sm text-gray-500 mt-2">In inbox</p>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'products' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-serif text-white">Product Management</h2>
                    {!isEditingProduct && (
                        <button 
                            onClick={() => { setEditingProduct({}); setIsEditingProduct(true); }} 
                            className="bg-gold-400 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gold-500"
                        >
                            <Plus size={16} /> Add Product
                        </button>
                    )}
                </div>

                {isEditingProduct ? (
                    <div className="bg-ink-900 border border-white/10 rounded-xl p-8 max-w-3xl">
                        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                             <h3 className="text-xl text-white">{editingProduct.id ? 'Edit Product' : 'New Product'}</h3>
                             <button onClick={() => setIsEditingProduct(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSaveProduct} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Product Name</label>
                                    <input 
                                        required 
                                        className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-white" 
                                        value={editingProduct.name || ''} 
                                        onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Base Price ($)</label>
                                    <input 
                                        required 
                                        type="number"
                                        className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-white" 
                                        value={editingProduct.price || ''} 
                                        onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                                    />
                                </div>
                            </div>

                             {/* Show Price Toggle */}
                            <div className="flex items-center gap-3 bg-black/20 p-3 rounded border border-white/5">
                                <button 
                                    type="button"
                                    onClick={() => setEditingProduct({...editingProduct, showPrice: editingProduct.showPrice === false})}
                                    className={`w-10 h-6 rounded-full p-1 transition-colors ${editingProduct.showPrice !== false ? 'bg-gold-400' : 'bg-gray-600'}`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${editingProduct.showPrice !== false ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                </button>
                                <span className="text-sm text-gray-300">Display Price on Storefront</span>
                            </div>
                            
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Description</label>
                                <textarea 
                                    required 
                                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-white" 
                                    rows={3}
                                    value={editingProduct.description || ''} 
                                    onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Tags (comma separated)</label>
                                    <input 
                                        className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-white" 
                                        value={editingProduct.tags?.toString() || ''} 
                                        onChange={e => setEditingProduct({...editingProduct, tags: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Compatibility (comma separated)</label>
                                    <input 
                                        className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-white" 
                                        value={editingProduct.compatibility?.toString() || ''} 
                                        onChange={e => setEditingProduct({...editingProduct, compatibility: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-black/20 p-4 rounded border border-white/5">
                                <h4 className="text-sm font-bold text-gold-400 mb-4 uppercase">Specs</h4>
                                <div className="grid grid-cols-3 gap-4">
                                     <div>
                                        <label className="block text-[10px] uppercase text-gray-500 mb-1">Viscosity (0-100)</label>
                                        <input type="number" className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white" 
                                            value={editingProduct.specs?.viscosity || 50} 
                                            onChange={e => setEditingProduct({...editingProduct, specs: {...(editingProduct.specs as any), viscosity: parseInt(e.target.value)}})}
                                        />
                                     </div>
                                     <div>
                                        <label className="block text-[10px] uppercase text-gray-500 mb-1">Saturation (0-100)</label>
                                        <input type="number" className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white" 
                                            value={editingProduct.specs?.saturation || 50} 
                                            onChange={e => setEditingProduct({...editingProduct, specs: {...(editingProduct.specs as any), saturation: parseInt(e.target.value)}})}
                                        />
                                     </div>
                                     <div>
                                        <label className="block text-[10px] uppercase text-gray-500 mb-1">Sheen</label>
                                        <input className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white" 
                                            value={editingProduct.specs?.sheen || ''} 
                                            onChange={e => setEditingProduct({...editingProduct, specs: {...(editingProduct.specs as any), sheen: e.target.value}})}
                                        />
                                     </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded hover:bg-gold-400 transition-colors">
                                Save Product
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {products.map(product => (
                            <div key={product.id} className="bg-ink-900 border border-white/5 p-4 rounded-lg flex items-center justify-between hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-black rounded border border-white/10 flex items-center justify-center">
                                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: product.variants[0]?.hex }}></div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium flex items-center gap-2">
                                            {product.name}
                                            {product.showPrice === false && <EyeOff size={14} className="text-gray-500" title="Price Hidden" />}
                                        </h4>
                                        <p className="text-sm text-gray-500">${product.price} • {product.variants.length} Colors</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEditClick(product)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded"><Edit2 size={18} /></button>
                                    <button onClick={() => onDeleteProduct(product.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}

        {activeTab === 'quotes' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-serif text-white mb-8">Quote Requests</h2>
                <div className="space-y-4">
                    {quotes.length === 0 ? <p className="text-gray-500 italic">No quotes found.</p> : quotes.map(quote => (
                        <div key={quote.id} className={`bg-ink-900 border rounded-xl p-6 transition-all ${quote.status === 'Pending' ? 'border-gold-400/50' : 'border-white/5 opacity-75'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-lg font-bold text-white">{quote.name}</h4>
                                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded border ${
                                            quote.status === 'Pending' ? 'text-gold-400 border-gold-400 bg-gold-400/10' : 
                                            quote.status === 'Processed' ? 'text-green-400 border-green-400 bg-green-400/10' : 
                                            'text-gray-500 border-gray-500'
                                        }`}>{quote.status}</span>
                                    </div>
                                    <p className="text-sm text-gray-500">{quote.email} • {quote.phone ? quote.phone + ' • ' : ''}{quote.date}</p>
                                </div>
                                {quote.status === 'Pending' && (
                                    <button 
                                        onClick={() => onUpdateQuoteStatus(quote.id, 'Processed')}
                                        className="text-xs bg-white/10 hover:bg-gold-400 hover:text-black text-white px-3 py-1.5 rounded transition-colors"
                                    >
                                        Mark Processed
                                    </button>
                                )}
                            </div>
                            
                            <div className="bg-black/30 rounded p-4 mb-4 text-sm border border-white/5">
                                <p className="text-gray-300 italic">"{quote.message}"</p>
                            </div>

                            <div className="space-y-3">
                                {quote.items.map((item, i) => (
                                    <div key={i} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">{item.productName}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-600 text-xs">{item.variant.name}</span>
                                                <div className="w-3 h-3 rounded-full border border-white/10" style={{ backgroundColor: item.variant.hex }}></div>
                                            </div>
                                        </div>
                                        {item.details && (
                                            <p className="text-xs text-gold-400/80 mt-1 font-mono pl-2 border-l border-gold-400/30">
                                                {item.details}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'messages' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-serif text-white mb-8">Messages</h2>
                <div className="space-y-4">
                    {messages.length === 0 ? <p className="text-gray-500 italic">No messages found.</p> : messages.map(msg => (
                        <div 
                            key={msg.id} 
                            onClick={() => onMarkMessageRead(msg.id)}
                            className={`bg-ink-900 border rounded-xl p-6 cursor-pointer transition-all hover:border-white/20 ${!msg.read ? 'border-l-4 border-l-blue-500 border-y-white/5 border-r-white/5 bg-blue-900/10' : 'border-white/5'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="text-white font-medium">{msg.name}</h4>
                                    <p className="text-xs text-gray-500">{msg.email}{msg.phone ? ' • ' + msg.phone : ''}</p>
                                </div>
                                <span className="text-xs text-gray-600">{msg.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded text-gray-400">{msg.type}</span>
                                {!msg.read && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{msg.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </main>
    </div>
  );
};