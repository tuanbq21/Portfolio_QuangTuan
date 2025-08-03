import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo font-bitcount" style={{ fontWeight: 300 }}>
          PORTFOLIO
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-item font-dm-sans ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/photos" 
            className={`nav-item font-dm-sans ${location.pathname === '/photos' ? 'active' : ''}`}
          >
            Photos
          </Link>
          <Link 
            to="/contact" 
            className={`nav-item font-dm-sans ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 