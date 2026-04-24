import { motion } from 'motion/react';
import { X, Download, Share } from 'lucide-react';
import { ReportData } from '../types';

export default function PosterOverlay({ data, onClose }: { data: ReportData, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        className="relative max-h-full w-full max-w-sm overflow-hidden rounded-[32px] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Graffiti Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -right-10 bottom-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
          
          {/* Abstract Graffiti Shapes */}
          <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 100 100">
             <path d="M10,10 L30,40 L50,10 L70,40 L90,10" fill="none" stroke="#00B4FF" strokeWidth="5" strokeLinecap="round" />
             <circle cx="80" cy="80" r="15" fill="none" stroke="#00D1B2" strokeWidth="3" />
             <rect x="10" y="70" width="20" height="20" fill="none" stroke="#FF4D4D" strokeWidth="2" transform="rotate(15 20 80)" />
          </svg>
          
          {/* Flag symbols (simplified as colored rects for "graffiti" look) */}
          <div className="absolute top-10 right-10 flex gap-2">
            <div className="h-4 w-6 rounded-sm bg-red-500" />
            <div className="h-4 w-6 rounded-sm bg-blue-500" />
            <div className="h-4 w-6 rounded-sm bg-yellow-400" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col p-8">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg">
              <GlobeIcon />
            </div>
            <button onClick={onClose} className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200">
              <X size={20} />
            </button>
          </div>

          <div className="mt-10">
            <span className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase">Language Insight Report</span>
            <h2 className="mt-2 text-5xl font-black tracking-tighter text-gray-900 line-clamp-2">
              {data.title}
            </h2>
            <p className="mt-4 text-lg font-bold italic leading-tight text-gray-400 underline decoration-green-400 decoration-4 underline-offset-4">
              {data.slogan}
            </p>
          </div>

          {/* Mini Radar Visualization (Static) */}
          <div className="mt-12 flex h-48 items-center justify-center rounded-3xl bg-gray-50/50">
             <div className="h-32 w-32 rounded-full border-4 border-dashed border-gray-200 relative flex items-center justify-center">
                <div className="absolute inset-4 rounded-full bg-blue-500/20 border-2 border-blue-500" />
                <div className="absolute inset-8 rounded-full bg-green-500/20 border-2 border-green-500" />
                <div className="h-1 w-1 bg-white rounded-full shadow-lg" />
             </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-gray-100 pt-8">
            {data.dimensions.map((dim) => (
              <div key={dim.key} className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{dim.label}</span>
                <span className="text-xl font-black text-gray-900 transition-all">{dim.current}%</span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex gap-4">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gray-900 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90">
              <Download size={16} /> 保存图片
            </button>
            <button className="flex items-center justify-center rounded-2xl bg-blue-500 px-6 text-white transition-opacity hover:opacity-90">
              <Share size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}
