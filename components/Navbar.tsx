import React, { useState, useEffect } from 'react';
import { Menu, X, Droplet, ShoppingBag, ChevronDown } from 'lucide-react';

interface NavbarProps {
  quoteCount: number;
  onOpenCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ quoteCount, onOpenCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 pointer-events-none">
      <nav 
        className={`
          pointer-events-auto
          relative
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          backdrop-blur-xl
          w-full max-w-5xl
          ${isOpen ? 'overflow-hidden rounded-[2rem] bg-ink-900/95' : 'rounded-full glass'}
          ${scrolled && !isOpen ? 'py-3 px-6 bg-black/80' : 'py-4 px-6 md:px-8'}
        `}
      >
        <div className="flex items-center justify-between relative z-10">
          {/* Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className={`bg-white/5 p-2 rounded-full group-hover:bg-gold-400/20 transition-colors ring-1 ring-white/10 ${scrolled && !isOpen ? 'scale-90' : ''}`}>
               <Droplet className="h-4 w-4 text-gold-400 fill-current" />
            </div>
            <span className={`text-lg font-serif font-bold tracking-wider text-white group-hover:text-gold-400 transition-colors ${isOpen ? 'opacity-0 md:opacity-100 hidden md:block' : ''}`}>
              InkZone
            </span>
            {isOpen && <span className="md:hidden text-lg font-serif font-bold text-white">Menu</span>}
          </div>
          
          {/* Desktop Links - Hidden on Mobile */}
          <div className={`hidden md:flex items-center gap-8 ${isOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            
            {/* Collection Dropdown */}
            <div className="relative group">
              <button
                onClick={() => scrollToSection('collection')}
                className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-white transition-colors tracking-[0.2em] uppercase group-hover:text-gold-400 py-2"
              >
                Collection <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                <div className="bg-ink-900 border border-white/10 rounded-xl p-1 shadow-2xl backdrop-blur-xl overflow-hidden">
                  {['Plastisol', 'Water-Based', 'Dyes', 'Special Effects'].map((cat) => (
                    <button 
                      key={cat}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCategory(cat);
                      }}
                      className="block w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {['Science', 'Alchemist', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-xs font-medium text-gray-400 hover:text-white transition-colors tracking-[0.2em] uppercase hover:scale-105 transform duration-300"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
             <button 
                onClick={() => scrollToSection(quoteCount > 0 ? 'contact' : 'collection')}
                className={`
                  hidden md:flex items-center justify-center gap-2
                  bg-white text-black px-6 py-2 rounded-full 
                  hover:bg-gold-400 hover:text-black hover:scale-105 
                  transition-all duration-300 
                  font-bold text-[10px] tracking-widest uppercase
                  ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                  ${scrolled ? 'py-1.5' : ''}
                `}
              >
                {quoteCount > 0 ? (
                  <>
                    <ShoppingBag size={14} /> Request Quote ({quoteCount})
                  </>
                ) : (
                  'Shop Now'
                )}
              </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
            className={`
                md:hidden transition-all duration-500 ease-in-out
                ${isOpen ? 'max-h-[500px] opacity-100 mt-8 mb-4' : 'max-h-0 opacity-0 mt-0'}
            `}
        >
          <div className="flex flex-col items-center space-y-6">
            {['Collection', 'Science', 'Alchemist', 'About', 'Contact'].map((item, idx) => (
               <button
                 key={item}
                 onClick={() => scrollToSection(item.toLowerCase())}
                 className="text-xl font-serif text-gray-300 hover:text-gold-400 transition-colors w-full text-center py-2"
                 style={{ transitionDelay: `${idx * 50}ms` }}
               >
                 {item}
               </button>
            ))}
            <div className="w-12 h-px bg-white/10 my-4"></div>
            <button 
                onClick={() => scrollToSection(quoteCount > 0 ? 'contact' : 'collection')}
                className="bg-white text-black px-8 py-3 rounded-full font-bold text-xs tracking-widest uppercase w-full max-w-xs hover:bg-gold-400 transition-colors flex items-center justify-center gap-2"
            >
                {quoteCount > 0 ? `Complete Request (${quoteCount})` : 'Shop Collection'}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};