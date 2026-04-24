import { motion, AnimatePresence } from 'motion/react';
import { Share2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function CTASection({ onGeneratePoster }: { onGeneratePoster: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-6">
      <div className="mx-auto max-w-lg overflow-hidden rounded-3xl bg-white/80 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl ring-1 ring-gray-100">
        <div className="flex flex-col gap-2 p-4">
          {/* Challenge Link */}
          <div className="px-2 pb-2">
            <button className="flex items-center gap-2 group w-full text-left">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-xs font-medium text-gray-500 line-clamp-1">
                你的“准确度”距离下一级人格还差一次纠错，去跟语伴请教一下？
              </p>
              <ArrowRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform ml-auto" />
            </button>
          </div>

          <div className="h-[1px] w-full bg-gray-100" />

          {/* Social Action Button */}
          <button 
            onClick={onGeneratePoster}
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-500 to-green-400 rounded-xl text-white font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform text-sm"
          >
            <Share2 size={16} />
            生成战报海报
          </button>
        </div>
      </div>
    </div>
  );
}
