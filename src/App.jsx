import Navbar   from './components/Navbar';
import DotNav   from './components/DotNav';
import Hero     from './components/Hero';
import About    from './components/About';
import Stack    from './components/Stack';
import Projects from './components/Projects';
import Contact  from './components/Contact';
import Footer   from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <DotNav />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
