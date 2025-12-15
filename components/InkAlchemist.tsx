import React, { useState } from 'react';
import { generateInkFromMood } from '../services/geminiService';
import { GeneratedInk } from '../types';
import { Sparkles, Loader2, FlaskConical, Check } from 'lucide-react';

interface InkAlchemistProps {
  onAddToQuote: (ink: GeneratedInk) => void;
}

export const InkAlchemist: React.FC<InkAlchemistProps> = ({ onAddToQuote }) => {
  const [mood, setMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedInk, setGeneratedInk] = useState<GeneratedInk | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  const handleGenerate = async () => {
    if (!mood.trim()) return;
    setIsLoading(true);
    setGeneratedInk(null); // Reset previous result while loading
    try {
      const ink = await generateInkFromMood(mood);
      setGeneratedInk(ink);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestSample = () => {
    if (generatedInk) {
      onAddToQuote(generatedInk);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div id="alchemist" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <FlaskConical className="w-12 h-12 text-gold-400 mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">The Color Lab</h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
          Define the palette for your next fashion collection. Describe a vibe, a season, or a texture, 
          and our AI will formulate a custom screen printing ink profile.
        </p>

        <div className="glass p-8 rounded-2xl max-w-2xl mx-auto border border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="e.g., 'Retro 80s neon synthwave' or 'Vintage washed denim'"
              className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 transition-colors"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !mood}
              className="bg-gold-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Sparkles className="h-5 w-5" /> Formulate</>}
            </button>
          </div>

          {generatedInk && (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Visual Representation */}
                <div className="relative group">
                   <div 
                      className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105"
                      style={{ 
                        backgroundColor: generatedInk.hex,
                        boxShadow: `0 0 60px ${generatedInk.hex}40`
                      }}
                   >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 to-transparent"></div>
                      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"></div>
                   </div>
                   {/* Sheen indicator */}
                   <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 rounded-full text-xs text-gold-400 border border-gold-400/30 uppercase tracking-widest whitespace-nowrap">
                      Finish: {generatedInk.composition.sheen}
                   </div>
                </div>

                {/* Details */}
                <div className="text-left space-y-4">
                  <div>
                    <h3 className="text-3xl font-serif text-white">{generatedInk.name}</h3>
                    <p className="text-gray-500 font-mono text-sm">{generatedInk.hex}</p>
                  </div>
                  <p className="text-gray-300 italic border-l-2 border-gold-400 pl-4 py-1">
                    "{generatedInk.description}"
                  </p>
                  
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs uppercase tracking-wider text-gray-500">
                      <span>Viscosity (Creaminess)</span>
                      <span>{generatedInk.composition.viscosity}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1">
                      <div className="bg-white h-1 rounded-full" style={{ width: `${generatedInk.composition.viscosity}%` }}></div>
                    </div>

                    <div className="flex items-center justify-between text-xs uppercase tracking-wider text-gray-500 pt-2">
                      <span>Pigment Load</span>
                      <span>{generatedInk.composition.saturation}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1">
                      <div className="bg-white h-1 rounded-full" style={{ width: `${generatedInk.composition.saturation}%` }}></div>
                    </div>
                  </div>

                  <button 
                    onClick={handleRequestSample}
                    className={`mt-6 w-full py-3 border transition-all text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2 ${
                        isAdded 
                        ? 'bg-green-600 border-green-500 text-white' 
                        : 'border-white/10 hover:bg-white hover:text-black text-gray-300'
                    }`}
                  >
                    {isAdded ? <><Check size={18} /> Added to Quote</> : 'Request Sample Bucket'}
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};