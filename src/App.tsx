import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
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

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-x-hidden ${
      theme === 'dark' ? 'bg-[#0A0E14] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
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

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
