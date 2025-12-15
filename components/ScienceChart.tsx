import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { subject: 'Wash Fastness', A: 98, B: 60, fullMark: 100 },
  { subject: 'Elasticity (Stretch)', A: 95, B: 55, fullMark: 100 },
  { subject: 'Opacity', A: 92, B: 75, fullMark: 100 },
  { subject: 'Screen Open Time', A: 90, B: 65, fullMark: 100 },
  { subject: 'Soft Hand Feel', A: 85, B: 50, fullMark: 100 },
  { subject: 'Cure Speed', A: 94, B: 70, fullMark: 100 },
];

export const ScienceChart: React.FC = () => {
  return (
    <div id="science" className="py-24 bg-ink-950 relative overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 h-[400px] w-full glass rounded-2xl border border-white/5 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="InkZone Plastisol+"
                    dataKey="A"
                    stroke="#d4af37"
                    strokeWidth={2}
                    fill="#d4af37"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Generic Standard Ink"
                    dataKey="B"
                    stroke="#525252"
                    strokeWidth={1}
                    fill="#525252"
                    fillOpacity={0.1}
                  />
                  <Legend wrapperStyle={{ color: '#fff', fontSize: '14px', paddingTop: '20px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-gold-400 tracking-widest uppercase text-sm mb-2">Technical Performance</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">Fiber-Bond Technology</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Textile printing demands durability. Our proprietary resin systems ensure that prints stretch with the fabric
                without cracking, while maintaining vibrancy after hundreds of industrial wash cycles.
                Whether you are printing on 100% cotton or high-stretch performance poly, InkZone adapts.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gold-400"></span>
                  <span><strong>Crack-Resistant:</strong> high elongation polymers for sportswear.</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gold-400"></span>
                  <span><strong>Flash-Cure Optimized:</strong> Reduces production dwell time.</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gold-400"></span>
                  <span><strong>Eco-Compliant:</strong> Phthalate-free and heavy-metal free.</span>
                </li>
              </ul>
            </div>

          </div>
       </div>
    </div>
  );
};