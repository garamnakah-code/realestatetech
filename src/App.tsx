import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Specifications from '@/components/Specifications';
import Prospectus from '@/components/Prospectus';
import Booking from '@/components/Booking';
import ChatWidget from '@/components/ChatWidget';
import B2BSection from '@/components/B2BSection';

function App() {
  return (
    <div className="relative min-h-screen bg-obsidian text-white">
      <Navbar />
      <main>
        <Hero />
        <Specifications />
        <Prospectus />
        <Booking />
      </main>
      <B2BSection />
      <ChatWidget />
    </div>
  );
}

export default App;
