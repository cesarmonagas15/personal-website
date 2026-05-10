import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import WordDrop from './components/WordDrop/WordDrop';
import Guestbook from './components/Guestbook';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="min-h-screen">
      <Analytics/>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <WordDrop />
      <Guestbook />
      <Contact />
    </div>
  );
}

export default App;
