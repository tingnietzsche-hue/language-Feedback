import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { Dimension, ReportData } from '../types';

interface Props {
  data: ReportData;
  onVertexClick: (index: number) => void;
}

export default function RadarHero({ data, onVertexClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const size = 310;
  const center = size / 2;
  const radius = size * 0.38;

  const getPoints = (values: number[]) => {
    return values.map((val, i) => {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const r = (val / 100) * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
      };
    });
  };

  const currentPoints = getPoints(data.dimensions.map(d => d.current));
  const previousPoints = getPoints(data.dimensions.map(d => d.previous));

  const currentPath = currentPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  const previousPath = previousPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="relative flex w-full flex-col items-start pt-8 pb-4 overflow-hidden bg-white">
      {/* Background Texture Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
      </div>

      {/* New Requested Title Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-10 px-8 mb-4 flex flex-col"
      >
        <span className="text-xs font-bold text-slate-400 tracking-[0.2em] mb-3">Q4 · 2025</span>
        <h2 className="text-3xl font-black leading-[1.2] tracking-tight text-slate-800">
          这是你的<span className="text-blue-500">双周</span><br />
          语言<span className="text-emerald-400">全景反馈</span>
        </h2>
      </motion.div>

      <motion.div
        ref={containerRef}
        className="relative z-10 h-[320px] w-full flex items-center justify-center"
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible drop-shadow-2xl">
          {/* Background Pentagons */}
          {[1, 0.8, 0.6, 0.4, 0.2].map((scale) => {
            const pts = getPoints([100, 100, 100, 100, 100].map(v => v * scale));
            const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
            return (
              <path
                key={scale}
                d={path}
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Axes */}
          {getPoints([100, 100, 100, 100, 100]).map((p, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="#F1F5F9"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          ))}

          {/* Previous Season (Dashed) */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            d={previousPath}
            fill="#64748B"
            fillOpacity="0.05"
            stroke="#64748B"
            strokeWidth="2"
            strokeDasharray="6 4"
          />

          {/* Current Season (Growth Animation) - Solid Fill & Stroke */}
          <motion.path
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              damping: 15,
              stiffness: 90,
              duration: 1.5,
              delay: 0.6 
            }}
            d={currentPath}
            fill="url(#radarGradient)"
            stroke="#00B4FF"
            strokeWidth="3"
            style={{ transformOrigin: 'center' }}
            className="filter drop-shadow-[0_0_12px_rgba(0,180,255,0.4)]"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00B4FF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00D1B2" stopOpacity="0.65" />
            </linearGradient>
          </defs>

          {/* Vertices (Clickable) */}
          {currentPoints.map((p, i) => (
            <g key={i} onClick={() => onVertexClick(i)} className="cursor-pointer group">
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                cx={p.x}
                cy={p.y}
                r="7"
                fill="white"
                stroke={data.dimensions[i].color}
                strokeWidth="3"
                className="transition-all group-hover:scale-125 shadow-xl"
              />
              <text
                x={p.x + (p.x > center ? 14 : -14)}
                y={p.y + (p.y > center ? 20 : -14)}
                textAnchor={p.x > center ? "start" : "end"}
                className="fill-gray-900 text-[11px] font-black tracking-widest pointer-events-none select-none uppercase"
                style={{ filter: 'drop-shadow(0px 1px 1px rgba(255,255,255,0.8))' }}
              >
                {data.dimensions[i].label}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Personality Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="relative z-10 -mt-2 flex flex-col items-center px-6 text-center"
      >
        <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.5em] mb-1 opacity-80">Global Language Profile</span>
        <h1 className="text-4xl font-display font-black text-gray-900 tracking-tighter personality-glow">
          【{data.title}】
        </h1>
        <p className="mt-1 text-[13px] text-gray-400 font-medium leading-tight max-w-[280px]">
          {data.slogan}
        </p>
      </motion.div>
    </div>
  );
}
