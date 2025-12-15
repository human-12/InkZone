import React, { useState } from 'react';
import { InkProduct } from '../types';
import { Eye, ShoppingCart, Check } from 'lucide-react';

interface ProductCardProps {
  product: InkProduct;
  index: number;
  onQuickView: (product: InkProduct, variantIndex: number) => void;
  onAddToQuote: (product: InkProduct, variantIndex: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, onQuickView, onAddToQuote }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const currentVariant = product.variants[selectedVariantIndex];

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToQuote(product, selectedVariantIndex);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col h-full">
      <div className="aspect-[4/4] overflow-hidden rounded-xl bg-ink-900 border border-white/5 relative group-hover:border-white/10 transition-colors">
        
        {/* Ambient Glow Gradient */}
        <div 
          className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-30"
          style={{ background: `radial-gradient(circle at 50% 60%, ${currentVariant.hex}, transparent 60%)` }}
        ></div>

        {/* Ink Tub/Bucket Representation */}
        <div className="absolute inset-0 flex items-center justify-center translate-y-6 group-hover:translate-y-4 transition-transform duration-700 ease-out">
            {/* The Bucket Container */}
            <div className="w-36 h-44 relative">
                 
                 {/* Wire Handle */}
                 <div className="absolute -top-10 left-3 right-3 h-14 rounded-t-[2rem] border-2 border-white/20 z-0 transform -rotate-6 opacity-60"></div>

                 {/* Lid Top */}
                 <div className="absolute -top-3 -left-1 -right-1 h-5 bg-ink-800 rounded-sm border border-white/10 shadow-lg z-30">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                 </div>

                 {/* Main Bucket Body (Glass/Plastic) */}
                 <div className="w-full h-full border border-white/10 border-t-0 rounded-b-2xl backdrop-blur-sm bg-white/[0.03] shadow-2xl flex items-end justify-center overflow-hidden z-20 relative">
                    
                    {/* Glass Reflections */}
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent z-40 pointer-events-none"></div>
                    <div className="absolute top-2 left-2 w-1 h-[90%] bg-white/20 blur-[1px] rounded-full z-40 opacity-50"></div>

                    {/* The Liquid Ink */}
                    <div 
                      className="absolute bottom-0 w-full transition-all duration-1000 ease-in-out group-hover:h-[85%] h-[75%]"
                      style={{ 
                        backgroundColor: currentVariant.hex,
                        boxShadow: `inset 0 0 20px rgba(0,0,0,0.5), 0 0 30px ${currentVariant.hex}40`
                      }}
                    >
                        {/* Ripple/Wave Animation */}
                        <div className="absolute -top-12 left-[-50%] right-[-50%] h-24 bg-white/[0.15] rounded-[40%] animate-spin" style={{ animationDuration: '6s' }}></div>
                        <div className="absolute -top-12 left-[-50%] right-[-50%] h-24 bg-black/[0.2] rounded-[45%] animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
                        
                        {/* Surface Glint */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30"></div>
                    </div>

                    {/* Label */}
                    <div className="absolute top-[25%] left-0 right-0 bg-black/40 backdrop-blur-md border-y border-white/5 py-3 z-30 flex flex-col items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
                        <span className="text-[6px] text-gold-400 uppercase tracking-[0.2em] mb-1">Premium Series</span>
                        <span className="text-[10px] text-white font-serif font-bold tracking-wide">{product.name.split(' ')[0]}</span>
                    </div>
                 </div>
                 
                 {/* Floor Reflection/Shadow */}
                 <div 
                    className="absolute -bottom-6 left-2 right-2 h-4 rounded-[100%] blur-xl opacity-30 transition-colors duration-500"
                    style={{ backgroundColor: currentVariant.hex }}
                 ></div>
            </div>
        </div>

        {/* Tags */}
        <div className="absolute top-3 right-3 z-30 flex flex-col items-end gap-1">
           {product.tags.map(tag => (
             <span key={tag} className="text-[8px] uppercase tracking-widest text-white/80 bg-black/60 border border-white/5 px-2 py-1 rounded backdrop-blur-md">{tag}</span>
           ))}
        </div>
      </div>

      {/* Product Info below card */}
      <div className="mt-5 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-serif text-white group-hover:text-gold-400 transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2 h-8">{product.description}</p>
        </div>
        <div className="text-right shrink-0 ml-4 flex flex-col items-end">
             <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest border border-gold-400/20 bg-gold-400/5 px-2 py-1 rounded">
                {product.showPrice !== false ? `From $${product.price}` : 'Price on Request'}
             </span>
        </div>
      </div>

      {/* Color Selector */}
      <div className="mt-4 flex gap-2">
        {product.variants.map((variant, i) => (
            <button
                key={`${product.id}-${i}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVariantIndex(i);
                }}
                className={`w-6 h-6 rounded-full border transition-all duration-300 relative overflow-hidden ${
                  selectedVariantIndex === i 
                    ? 'border-white scale-110 ring-1 ring-gold-400 ring-offset-2 ring-offset-ink-950' 
                    : 'border-white/10 hover:scale-110 hover:border-white/50'
                }`}
                style={{ backgroundColor: variant.hex }}
                title={variant.name}
            >
                {/* Shine on swatch */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
            </button>
        ))}
      </div>
      
      {/* Actions */}
      <div className="mt-6 grid grid-cols-2 gap-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
        <button 
          onClick={() => onQuickView(product, selectedVariantIndex)}
          className="flex items-center justify-center gap-2 py-2.5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:border-gold-400 hover:text-gold-400 transition-colors bg-white/5 hover:bg-white/10 rounded"
        >
          <Eye size={14} /> Quick View
        </button>
        <button 
          onClick={handleAddClick}
          className={`flex items-center justify-center gap-2 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded ${
            isAdded 
                ? 'bg-green-600 text-white border border-green-500' 
                : 'bg-white text-black hover:bg-gold-400 hover:border-gold-400 border border-white'
          }`}
        >
          {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />} 
          {isAdded ? 'Added' : 'Quote'}
        </button>
      </div>
    </div>
  );
};