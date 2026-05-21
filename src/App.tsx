import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ClassIXPage from './pages/ClassIXPage';
import ClassXPage from './pages/ClassXPage';
import UnitDetailPage from './pages/UnitDetailPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import { LanguageProvider } from './i18n/LanguageContext';
import TMSOverlay from './i18n/tms/components/TMSOverlay';

function Shell() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-brand-dark text-gray-200">
      {!isLogin && <Navbar />}
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/class-ix" element={<ProtectedRoute><ClassIXPage /></ProtectedRoute>} />
          <Route path="/class-x" element={<ProtectedRoute><ClassXPage /></ProtectedRoute>} />
          <Route path="/class-ix/unit/:unitNumber" element={<ProtectedRoute><UnitDetailPage /></ProtectedRoute>} />
          <Route path="/class-x/unit/:unitNumber" element={<ProtectedRoute><UnitDetailPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isLogin && <Footer />}
      <TMSOverlay />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <HashRouter>
          <Shell />
        </HashRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
