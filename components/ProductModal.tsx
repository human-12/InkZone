import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, FileText, Printer, Activity, Check } from 'lucide-react';
import { InkProduct } from '../types';

interface ProductModalProps {
  product: InkProduct;
  initialVariantIndex: number;
  onClose: () => void;
  onAddToQuote: (product: InkProduct, variantIndex: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, initialVariantIndex, onClose, onAddToQuote }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(initialVariantIndex);
  const [isAdded, setIsAdded] = useState(false);
  const currentVariant = product.variants[selectedVariantIndex];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddToQuote = () => {
      onAddToQuote(product, selectedVariantIndex);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative bg-ink-900 border border-white/10 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
            
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white hover:text-black rounded-full text-white transition-colors"
            >
                <X size={20} />
            </button>

            {/* Visual Side */}
            <div className="w-full md:w-1/2 relative bg-gray-900 min-h-[300px] shrink-0">
                <div 
                  className="absolute inset-0 opacity-40 transition-colors duration-500"
                  style={{ background: `radial-gradient(circle at center, ${currentVariant.hex}, #050505)` }}
                ></div>
                
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 relative">
                         <div className="absolute -top-4 left-[-10%] right-[-10%] h-8 bg-gray-800 rounded-sm border border-white/10 shadow-lg z-20"></div>
                         <div className="w-full h-full border-x border-b border-white/20 rounded-b-xl backdrop-blur-sm bg-white/5 shadow-2xl flex items-end justify-center overflow-hidden z-10">
                            <div 
                              className="w-full bg-current h-[85%] transition-colors duration-500" 
                              style={{ color: currentVariant.hex, opacity: 0.9 }}
                            ></div>
                         </div>
                         <div className="absolute top-1/3 left-4 right-4 h-20 bg-black/60 border border-white/10 z-20 flex flex-col items-center justify-center">
                            <span className="text-[10px] text-gold-400 uppercase tracking-widest mb-1">InkZone Pro</span>
                            <span className="text-xs text-white font-serif">{product.name}</span>
                            <span className="text-[10px] text-gray-400 font-mono mt-1">{currentVariant.name}</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* Details Side */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-ink-950">
                <div className="flex flex-wrap gap-2 mb-6">
                    {product.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400">
                            {tag}
                        </span>
                    ))}
                </div>

                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight">{product.name}</h2>
                <p className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
                    <span className="w-8 h-px bg-gold-400/50"></span>
                    {currentVariant.name}
                </p>

                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
                    <span className="text-3xl text-white font-light">
                         {product.showPrice !== false ? `$${product.price}` : 'Price upon Request'}
                         {product.showPrice !== false && <span className="text-lg text-gray-500 font-normal ml-1">/ Unit</span>}
                    </span>
                    <span className="text-[10px] text-gold-400 uppercase tracking-widest bg-gold-400/10 px-2 py-1 rounded border border-gold-400/20">Bulk Volume</span>
                </div>

                {/* Color Selection in Modal */}
                <div className="mb-6">
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-3">Available Colors</label>
                    <div className="flex flex-wrap gap-3">
                        {product.variants.map((variant, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedVariantIndex(i)}
                                className={`w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center group ${selectedVariantIndex === i ? 'border-white ring-2 ring-gold-400 ring-offset-2 ring-offset-black' : 'border-white/20 hover:border-white/60'}`}
                                style={{ backgroundColor: variant.hex }}
                                title={variant.name}
                            >
                                {selectedVariantIndex === i && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Compatibility Section */}
                {product.compatibility && product.compatibility.length > 0 && (
                  <div className="mb-8 border-t border-white/5 pt-6">
                      <div className="flex items-center gap-2 mb-3">
                          <Printer size={14} className="text-gold-400" />
                          <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Engineered For</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                          {product.compatibility.map((item, idx) => (
                              <span 
                                key={idx} 
                                className="text-[11px] text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm hover:border-gold-400/30 transition-colors cursor-default"
                              >
                                  {item}
                              </span>
                          ))}
                      </div>
                  </div>
                )}

                <p className="text-gray-300 leading-relaxed mb-6">
                    {product.description}
                </p>

                {/* Technical Specifications Section */}
                {product.specs && (
                  <div className="mb-6 bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-4">
                        <Activity size={14} className="text-gold-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white">Technical Specifications</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                         {/* Viscosity */}
                         <div className="col-span-2 sm:col-span-1">
                            <div className="flex justify-between text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                                <span>Viscosity</span>
                                <span>{product.specs.viscosity}/100</span>
                            </div>
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-white/80" style={{ width: `${product.specs.viscosity}%` }}></div>
                            </div>
                         </div>
                         
                         {/* Saturation */}
                         <div className="col-span-2 sm:col-span-1">
                            <div className="flex justify-between text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                                <span>Pigment Load</span>
                                <span>{product.specs.saturation}%</span>
                            </div>
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-white/80" style={{ width: `${product.specs.saturation}%` }}></div>
                            </div>
                         </div>

                         {/* Sheen */}
                         <div className="col-span-2 pt-2 border-t border-white/5 flex justify-between items-center mt-1">
                             <span className="text-[10px] uppercase tracking-wider text-gray-500">Finish / Sheen</span>
                             <span className="text-xs text-gold-400 font-mono tracking-wide border border-gold-400/20 bg-gold-400/5 px-2 py-0.5 rounded-sm">{product.specs.sheen}</span>
                         </div>
                      </div>
                  </div>
                )}

                <div className="text-sm text-gray-500 mb-8 border-l-2 border-white/10 pl-4 py-1 italic">
                    Engineered for professional screen printers requiring consistent coverage and fast flash times. 
                    Optimal cure temperature: 320°F (160°C).
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <button 
                        onClick={handleAddToQuote}
                        className={`flex-1 text-black py-3 sm:py-4 font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 text-sm ${isAdded ? 'bg-green-600 text-white' : 'bg-white hover:bg-gold-400'}`}
                    >
                        {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />} 
                        {isAdded ? 'Added to Quote' : 'Add to Quote'}
                    </button>
                    <button className="flex-1 border border-white/20 text-white py-3 sm:py-4 font-bold tracking-widest uppercase hover:border-gold-400 hover:text-gold-400 transition-colors flex items-center justify-center gap-2 text-sm">
                         <FileText size={18} /> Specs
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};