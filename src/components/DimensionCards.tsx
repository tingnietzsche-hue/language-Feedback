import { motion } from 'motion/react';
import { Dimension } from '../types';
import Counter from './Counter';
import { MessageSquare, Users, Zap, CheckCircle, Globe } from 'lucide-react';

const icons: Record<string, any> = {
  MessageSquare,
  Users,
  Zap,
  CheckCircle,
  Globe,
};

export default function DimensionCards({ dimensions }: { dimensions: Dimension[] }) {
  return (
    <div className="mt-12 flex flex-col gap-8 px-5 pb-32">
      {dimensions.map((dim, idx) => (
        <Card key={dim.key} dimension={dim} index={idx} />
      ))}
    </div>
  );
}

function Card({ dimension, index }: { dimension: Dimension, index: number }) {
  const Icon = icons[dimension.icon];

  return (
    <motion.div
      id={`card-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-gray-100 ring-1 ring-gray-100 transition-all hover:shadow-2xl hover:shadow-gray-200"
    >
      {/* Background Patterns */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none transition-all duration-700"
        style={{ color: dimension.color }}
      >
        {dimension.key === 'expressiveness' && <SoundWaveBackground />}
        {dimension.key === 'interaction' && <ConversationBackground />}
        {dimension.key === 'activity' && <HeatmapBackground />}
        {dimension.key === 'accuracy' && <CheckmarkBackground />}
        {dimension.key === 'global' && <WorldMapBackground />}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div 
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg"
            style={{ backgroundColor: dimension.color }}
          >
            <Icon size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{dimension.label}</h3>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Dimension {index + 1}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          {dimension.description}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {dimension.details.map((detail, dIdx) => (
            <div key={dIdx} className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                {detail.label}
              </span>
              <span className="mt-1 text-xl font-black text-gray-900">
                <Counter value={detail.value} />
              </span>
            </div>
          ))}
        </div>

        {/* Visualizer Mini-component */}
        <div className="mt-6 flex h-2 w-full overflow-hidden rounded-full bg-gray-50">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${dimension.current}%` }}
            transition={{ duration: 1.5, delay: 0.2 }}
            style={{ backgroundColor: dimension.color }}
            className="h-full rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

// Background Pattern Components
function SoundWaveBackground() {
  return (
    <div className="flex h-full w-full items-center justify-around px-8">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-current"
          style={{ height: `${Math.random() * 80 + 20}%` }}
        />
      ))}
    </div>
  );
}

function ConversationBackground() {
  return (
    <div className="relative h-full w-full">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-2xl bg-current opacity-20"
          style={{
            width: '40%',
            height: '15%',
            left: i % 2 === 0 ? '5%' : '55%',
            top: `${15 + i * 15}%`,
          }}
        />
      ))}
    </div>
  );
}

function HeatmapBackground() {
  return (
    <div className="grid h-full w-full grid-cols-8 grid-rows-4 gap-1 p-4">
      {[...Array(32)].map((_, i) => (
        <div
          key={i}
          className="rounded-sm bg-current"
          style={{ opacity: Math.random() }}
        />
      ))}
    </div>
  );
}

function CheckmarkBackground() {
  return (
    <div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-8 p-8">
       {[...Array(12)].map((_, i) => (
         <div key={i} className="flex items-center justify-center">
            <CheckCircle size={40} />
         </div>
       ))}
    </div>
  );
}

function WorldMapBackground() {
  return (
     <div className="relative h-full w-full p-4">
        <svg viewBox="0 0 200 100" className="h-full w-full fill-current">
          <path d="M20,40 Q60,10 100,50 T180,30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M30,80 Q90,90 150,60 T190,10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="20" cy="40" r="3" />
          <circle cx="100" cy="50" r="3" />
          <circle cx="180" cy="30" r="3" />
        </svg>
     </div>
  );
}
