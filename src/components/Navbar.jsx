import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Labs', path: '/labs' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-3xl font-extrabold tracking-wider hover:text-accent transition-colors duration-300">
          SECOND <span className="text-secondary">OPERATOR</span>
        </Link>
        <div className="hidden md:flex items-center space-x-10 text-lg font-semibold">
          {links.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative hover:text-white transition-colors duration-300 ${
                location.pathname === link.path ? 'text-white' : 'text-secondary'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
