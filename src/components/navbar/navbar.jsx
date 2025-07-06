import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const location = useLocation();
  // Get user role from localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userRole = userData.role;
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          AgriConnect Nepal
        </Link>
        <ul className="nav-menu">          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/contact" 
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/agrimarket" 
              className={`nav-link ${location.pathname === '/agrimarket' ? 'active' : ''}`}
            >
              AgriMarket
            </Link>
          </li>
          {isAuthenticated ? (
            <>              <li className="nav-item">
                <Link 
                  to={userRole === 'admin' ? "/admin" : "/dashboard"}
                  className={`nav-link ${location.pathname === (userRole === 'admin' ? '/admin' : '/dashboard') ? 'active' : ''}`}
                >
                  {userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link 
                to="/login" 
                className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Login/Signup
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;