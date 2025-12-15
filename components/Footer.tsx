import React from 'react';

interface FooterProps {
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-serif font-bold text-white mb-8">InkZone</h2>
        <div className="flex justify-center space-x-8 mb-8">
          <a href="#about" className="text-gray-500 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest">About Us</a>
          <a href="#contact" className="text-gray-500 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest">Contact</a>
          <a href="#" className="text-gray-500 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest">Instagram</a>
          <a href="#" className="text-gray-500 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest">Twitter</a>
          <a href="#journal" className="text-gray-500 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest">Journal</a>
        </div>
        <p className="text-gray-600 text-xs flex flex-col items-center gap-2">
          <span>© {new Date().getFullYear()} InkZone. Engineered in Silence.</span>
          <button onClick={onAdminClick} className="text-gray-800 hover:text-gray-600 transition-colors mt-2 text-[10px] uppercase">Admin Entry</button>
        </p>
      </div>
    </footer>
  );
};