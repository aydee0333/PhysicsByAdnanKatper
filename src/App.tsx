import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ClassIXPage from './pages/ClassIXPage';
import ClassXPage from './pages/ClassXPage';
import UnitDetailPage from './pages/UnitDetailPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-brand-dark text-gray-200 font-poppins">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/class-ix" element={<ClassIXPage />} />
            <Route path="/class-x" element={<ClassXPage />} />
            <Route path="/class-ix/unit/:unitNumber" element={<UnitDetailPage />} />
            <Route path="/class-x/unit/:unitNumber" element={<UnitDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
