import React, { useEffect, useRef, useState } from 'react';

export const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Observer for fade-in animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: "0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Scroll handler for parallax effect
    const handleScroll = () => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            // Calculate offset based on distance from viewport top
            // Using rect.top is robust against layout shifts above
            // Only update if roughly in view to save resources
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                 setParallaxOffset(rect.top * 0.15);
            }
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
        id="about" 
        ref={sectionRef} 
        className="py-32 relative overflow-hidden bg-ink-900"
    >
        {/* Parallax Background Layer */}
        <div 
            className="absolute inset-0 w-full z-0 opacity-20"
            style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '140%', // Extra height to accommodate movement without gaps
                top: '-20%',    // Center the overflow
                transform: `translateY(${parallaxOffset}px)`,
                transition: 'transform 0.05s linear' // Slight smoothing
            }}
        ></div>
        
        {/* Gradient Overlay for seamless integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900/95 to-ink-950 z-0"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 
                className={`text-gold-400 tracking-widest uppercase text-sm mb-6 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
                Our Philosophy
            </h2>
            <h3 
                className={`text-4xl md:text-6xl font-serif text-white mb-8 transition-all duration-1000 delay-200 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
                Chemistry Meets Canvas
            </h3>
            
            <div className={`space-y-6 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                    At InkZone, we believe that the ink is the soul of the garment.
                    Founded by a collective of chemical engineers and screen print masters,
                    we set out to solve the industry's oldest problems: cracking, fading, and rough hand feel.
                </p>
                
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto my-8"></div>
                
                <p className="text-gray-400 font-light text-lg">
                    Every jar that leaves our facility is tested against <span className="text-gold-400 font-medium">50 industrial wash cycles</span>.
                    We don't just sell ink; we sell permanence.
                </p>
            </div>
            
            {/* Seal / Signature Element */}
            <div className={`mt-16 transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="inline-flex items-center justify-center border border-white/10 bg-white/5 px-8 py-3 rounded-full backdrop-blur-sm">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                        Est. 2024 • Lahore, PK
                    </span>
                </div>
            </div>
        </div>
    </section>
  );
};