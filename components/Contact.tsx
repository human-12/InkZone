import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2, ShoppingBag } from 'lucide-react';
import { QuoteItem } from '../types';

interface ContactProps {
  quoteItems: QuoteItem[];
  onSubmit: (data: any) => void;
}

export const Contact: React.FC<ContactProps> = ({ quoteItems, onSubmit }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Wholesale Order',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API delay
    setTimeout(() => {
      onSubmit(formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', inquiryType: 'Wholesale Order', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-ink-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-gold-400 tracking-widest uppercase text-sm mb-2">Get in Touch</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">Start a Project</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Whether you're looking for custom formulation, wholesale pricing for your print shop, or technical support, our team of chemists is ready to assist.
            </p>

            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-gold-400">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-1">Headquarters & Lab</h4>
                        <p className="text-gray-500 text-sm">Plot 88, Sundar Industrial Estate<br />Lahore, Pakistan</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-gold-400">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-1">Email Us</h4>
                        <p className="text-gray-500 text-sm">formulations@inkzone.com<br />support@inkzone.com</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-gold-400">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-1">Call Line</h4>
                        <p className="text-gray-500 text-sm">+92 (42) 3512-9663<br />Mon-Fri, 9am - 6pm PKT</p>
                    </div>
                </div>
            </div>
          </div>

          <div className="bg-ink-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 min-h-[500px] flex flex-col items-center justify-center">
            {formStatus === 'success' ? (
                <div className="text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-2">Message Sent</h3>
                    <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                        Thank you for contacting InkZone. One of our specialists will respond to your inquiry within 24 hours.
                    </p>
                    <button 
                        onClick={() => setFormStatus('idle')}
                        className="text-gold-400 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors"
                    >
                        Send Another Message
                    </button>
                </div>
            ) : (
                <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                    
                    {quoteItems.length > 0 && (
                        <div className="bg-black/30 border border-white/10 rounded-lg p-4 mb-2 animate-in slide-in-from-top-4">
                            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5">
                                <ShoppingBag size={14} className="text-gold-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-white">Selected Formulations</span>
                                <span className="ml-auto text-xs text-gray-500">{quoteItems.length} items</span>
                            </div>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700">
                                {quoteItems.map((item, idx) => (
                                    <div key={idx} className="group border-b border-white/5 last:border-0 pb-2 mb-2 last:mb-0">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-300 font-medium">{item.productName}</span>
                                            <div className="flex items-center gap-2">
                                                <div 
                                                    className="w-3 h-3 rounded-full border border-white/20" 
                                                    style={{ backgroundColor: item.variant.hex }}
                                                ></div>
                                            </div>
                                        </div>
                                        {item.details && (
                                            <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{item.details}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Name</label>
                            <input 
                                required
                                type="text" 
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" 
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Email</label>
                            <input 
                                required
                                type="email" 
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" 
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Phone</label>
                            <input 
                                type="tel" 
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" 
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                        <div>
                             <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Inquiry Type</label>
                             <select 
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors appearance-none"
                                value={formData.inquiryType}
                                onChange={e => setFormData({...formData, inquiryType: e.target.value})}
                             >
                                <option className="text-black" value="Wholesale Order">Wholesale Order</option>
                                <option className="text-black" value="Custom Formulation">Custom Formulation</option>
                                <option className="text-black" value="Technical Support">Technical Support</option>
                                <option className="text-black" value="Other">Other</option>
                             </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Message</label>
                        <textarea 
                            required
                            rows={4} 
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors" 
                            placeholder={quoteItems.length > 0 ? "I am interested in a quote for the selected items above. Please include shipping to..." : "Tell us about your project..."}
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-white text-black font-bold tracking-widest uppercase py-4 rounded-lg hover:bg-gold-400 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {formStatus === 'submitting' ? (
                            <>Sending... <Loader2 size={16} className="animate-spin" /></>
                        ) : (
                            <>Send Message <Send size={16} className="group-hover:translate-x-1 transition-transform" /></>
                        )}
                    </button>
                </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};