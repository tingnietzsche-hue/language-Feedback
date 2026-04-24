import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function IntroScanner({ onComplete }: { onComplete: () => void }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      <div className="relative h-64 w-64">
        {/* Background Circles */}
        <div className="absolute inset-0 rounded-full border border-blue-100 opacity-20" />
        <div className="absolute inset-8 rounded-full border border-blue-200 opacity-40" />
        <div className="absolute inset-16 rounded-full border border-blue-300 opacity-60" />

        {/* Scanning Line */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 origin-center"
        >
          <div className="absolute left-1/2 top-0 h-1/2 w-1 origin-bottom bg-gradient-to-t from-blue-500 to-transparent blur-[2px]" />
        </motion.div>

        {/* Pulse Center */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />

        {/* Floating Data Points */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              x: Math.cos(i * 60) * 80,
              y: Math.sin(i * 60) * 80
            }}
            transition={{ 
              duration: 1, 
              delay: i * 0.3, 
              repeat: Infinity,
              repeatDelay: 0.5
            }}
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h2 className="text-sm font-medium tracking-[0.2em] text-gray-400 uppercase">
          Scanning Language Frequency
        </h2>
        <div className="mt-4 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              className="h-1 w-1 rounded-full bg-blue-500"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
