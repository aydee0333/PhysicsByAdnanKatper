import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import PhysicsBackground from '../components/PhysicsBackground';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <PhysicsBackground />
      <div className="blob w-72 h-72 bg-brand-purple top-10 -left-10" style={{ animationDelay: '0s' }} />
      <div className="blob w-56 h-56 bg-brand-cyan bottom-10 -right-10" style={{ animationDelay: '5s' }} />

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <div className="glass-card-strong rounded-3xl p-10 md:p-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-3">404</h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
            Page not found. The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-cyan/20 text-brand-cyan font-semibold hover:bg-brand-cyan/30 transition-colors"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
