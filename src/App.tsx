import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Experience } from './components/Experience';
import { WhyHireMe } from './components/WhyHireMe';
import { PortfolioSection } from './components/PortfolioSection';
import { Footer } from './components/Footer';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import './styles/global.css';

export function App() {
  return (
    <div className="portfolio-app">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Experience />
        <WhyHireMe />
        <PortfolioSection />
      </main>
      <Footer />
      <ThemeSwitcher />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
