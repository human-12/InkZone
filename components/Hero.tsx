import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000, radius: 250 }; // Increased interaction radius

    class Particle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
      density: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.density = (Math.random() * 40) + 5; // Denser particles for varied movement
        // Mixture of faint white/gold particles
        this.color = Math.random() > 0.8 
            ? 'rgba(212, 175, 55,' 
            : 'rgba(255, 255, 255,';
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Alpha based on size for depth perception
        ctx.fillStyle = this.color + (this.size/10 + 0.1) + ')';
        ctx.fill();
      }

      update() {
        // Boundary check
        if (this.x > width || this.x < 0) this.dx = -this.dx;
        if (this.y > height || this.y < 0) this.dy = -this.dy;

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            // Stronger push away effect - mimicking ink being disturbed
            // Multiplier increased to 3.0 for more viscous displacement
            const directionX = forceDirectionX * force * this.density * 3.0;
            const directionY = forceDirectionY * force * this.density * 3.0;
            
            this.x -= directionX;
            this.y -= directionY;
        } else {
             // Slowly drift
             this.x += this.dx;
             this.y += this.dy;
        }

        this.draw();
      }
    }

    const init = () => {
        particles = [];
        // Adjust particle count for density
        const particleCount = (width * height) / 9000;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    const connect = () => {
        // Dynamic threshold based on screen size
        const threshold = (canvas.width * canvas.height) / 6000;

        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) 
                             + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                
                if (distance < threshold) {
                    // Viscosity effect:
                    // Lines are thicker and more opaque when particles are close (cohesion)
                    // Lines get thinner and fade out as they pull apart (stretching)
                    let opacityValue = 1 - (distance / threshold);
                    
                    if (opacityValue > 0) {
                        ctx.beginPath();
                        // Use a subtle gold/white mix for the "web"
                        ctx.strokeStyle = `rgba(212, 175, 55, ${opacityValue * 0.15})`;
                        // Line width mimics surface tension stretching
                        ctx.lineWidth = opacityValue * 2.5; 
                        
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
    }

    const animate = () => {
        if (!ctx) return;
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => p.update());
        connect();
    }

    init();
    animate();

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        init();
    }

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }
    
    // Reset mouse position when leaving canvas so particles don't get stuck pushed away
    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        if (canvas) canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Abstract Background - Ink Gradient */}
      <div className="absolute inset-0 ink-gradient opacity-90 z-0"></div>
      
      {/* Existing CSS Animations (Blobs) - Subtle color bleed */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-float pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl animate-float pointer-events-none z-0" style={{ animationDelay: '2s' }}></div>

      {/* Canvas for Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-100 pointer-events-auto" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-none">
        <h2 className="text-gold-400 tracking-[0.3em] uppercase text-sm mb-4 animate-pulse">High-Performance Textile Inks</h2>
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight">
          Engineered for <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">The Fabric of Life</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          From high-opacity plastisols to eco-friendly water-based discharge. 
          InkZone formulations bond permanently with fibers, ensuring your designs outlast the garment.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto">
          <button 
            onClick={() => scrollToSection('collection')}
            className="px-8 py-4 bg-white text-black font-semibold tracking-widest hover:bg-gold-400 transition-colors duration-300 w-48"
          >
            CATALOG
          </button>
          <button 
            onClick={() => scrollToSection('science')}
            className="px-8 py-4 border border-white/20 text-white font-semibold tracking-widest hover:border-gold-400 hover:text-gold-400 transition-colors duration-300 w-48 glass"
          >
            TECH SPECS
          </button>
        </div>
      </div>

      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500 z-10 cursor-pointer pointer-events-auto"
        onClick={() => scrollToSection('collection')}
      >
        <ArrowDown size={24} />
      </div>
    </div>
  );
};