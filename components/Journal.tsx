import React from 'react';
import { ArrowRight, Calendar, User, Bookmark } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "The Alchemy of Curing: Why Exact Temperature Matters",
    excerpt: "Achieving the perfect polymer bond requires more than just heat. We dive deep into the molecular changes that occur at 320°F.",
    date: "Oct 12, 2023",
    author: "Dr. A. Vance",
    category: "Technique"
  },
  {
    id: 2,
    title: "Eco-Evolution: The Rise of High-Solid Water Based Inks",
    excerpt: "How modern water-based formulations are rivaling plastisol in opacity while maintaining a breathable soft hand.",
    date: "Nov 05, 2023",
    author: "M. Chen",
    category: "Sustainability"
  },
  {
    id: 3,
    title: "Mastering Halftones on Dark Garments",
    excerpt: "A guide to dot gain compensation and mesh selection when printing photorealistic gradients on black cotton.",
    date: "Dec 18, 2023",
    author: "J. Print",
    category: "Tutorial"
  },
  {
    id: 4,
    title: "Discharge Inks: The Chemistry of Removal",
    excerpt: "Understanding the zinc-formaldehyde-sulfoxylate reaction that removes dye from cotton to create a soft, bright underbase.",
    date: "Jan 12, 2024",
    author: "Dr. S. Khan",
    category: "Chemistry"
  }
];

export const Journal: React.FC = () => {
  // Create a seamless loop by doubling the content enough times to fill screens
  // We double the source array first to ensure we have enough base content, 
  // then we duplicate THAT set for the animation logic (Content + Content).
  const baseSet = [...articles, ...articles]; 
  const carouselItems = [...baseSet, ...baseSet]; 

  return (
    <section id="journal" className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
       {/* Ambient background glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end">
            <div className="mb-6 md:mb-0">
                <h2 className="text-gold-400 tracking-widest uppercase text-sm mb-3">The Ink Log</h2>
                <h3 className="text-4xl font-serif text-white">Insights & Technique</h3>
            </div>
            <button className="text-white hover:text-gold-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors border-b border-white/20 pb-1 hover:border-gold-400">
                View All Articles <ArrowRight size={14} />
            </button>
        </div>
      </div>

      <div className="relative w-full">
        {/* Gradient Masks for smooth fade in/out */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

        {/* Carousel Track */}
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
            {carouselItems.map((article, index) => (
                <div 
                    key={`${article.id}-${index}`} 
                    className="w-[300px] md:w-[400px] mx-4 flex-shrink-0 group flex flex-col bg-ink-900 border border-white/10 rounded-xl overflow-hidden hover:border-gold-400/30 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.05)] cursor-pointer relative h-[320px]"
                >
                    {/* Abstract Background Element to replace image */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gold-400/10 transition-colors duration-500 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-900/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    <div className="p-8 flex flex-col h-full relative z-10">
                        {/* Header: Category & Date */}
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] uppercase tracking-widest text-gold-400 border border-gold-400/20 px-2 py-1 rounded bg-gold-400/5 backdrop-blur-sm">
                                {article.category}
                            </span>
                            <Bookmark size={16} className="text-white/20 group-hover:text-gold-400 transition-colors" />
                        </div>

                        {/* Title */}
                        <h4 className="text-xl font-serif text-white mb-4 group-hover:text-gold-400 transition-colors leading-tight line-clamp-2">
                            {article.title}
                        </h4>
                        
                        {/* Excerpt */}
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 border-l border-white/10 pl-4 line-clamp-3">
                            {article.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                             <div className="flex flex-col">
                                 <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500">
                                    <User size={12} /> {article.author}
                                 </span>
                                 <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 mt-1">
                                    <Calendar size={12} /> {article.date}
                                 </span>
                             </div>
                             <div className="flex items-center text-white text-xs font-bold uppercase tracking-widest group-hover:text-gold-400 transition-colors">
                                <span className="relative pb-1">
                                    Read
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                                <ArrowRight size={14} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};