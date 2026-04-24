/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import IntroScanner from './components/IntroScanner';
import RadarHero from './components/RadarHero';
import DimensionCards from './components/DimensionCards';
import CTASection from './components/CTASection';
import PosterOverlay from './components/PosterOverlay';
import { MOCK_DATA } from './constants';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showPoster, setShowPoster] = useState(false);

  const scrollToCard = (index: number) => {
    const element = document.getElementById(`card-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-600">
      <AnimatePresence>
        {showIntro && (
          <IntroScanner onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <main className="mx-auto max-w-lg bg-white pb-20 shadow-2xl shadow-blue-50/50">
          {/* Header Section */}
          <RadarHero 
            data={MOCK_DATA} 
            onVertexClick={scrollToCard} 
          />

          {/* Cards Section */}
          <DimensionCards 
            dimensions={MOCK_DATA.dimensions} 
          />

          {/* Bottom Actions */}
          <CTASection 
            onGeneratePoster={() => setShowPoster(true)} 
          />

          {/* Poster Overlay */}
          <AnimatePresence>
            {showPoster && (
              <PosterOverlay 
                data={MOCK_DATA} 
                onClose={() => setShowPoster(false)} 
              />
            )}
          </AnimatePresence>
        </main>
      )}
    </div>
  );
}

