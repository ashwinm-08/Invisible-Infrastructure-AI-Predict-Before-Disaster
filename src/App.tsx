import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { FileAnalyzer } from './components/FileAnalyzer';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Architecture } from './components/Architecture';
import { HealthMap } from './components/HealthMap';
import { Impact } from './components/Impact';
import { Roadmap } from './components/Roadmap';
import { Team } from './components/Team';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <FileAnalyzer />
        <HowItWorks />
        <Features />
        <Architecture />
        <HealthMap />
        <Impact />
        <Roadmap />
        <Team />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
