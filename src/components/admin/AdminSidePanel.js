import '../../css/admin-css/adminsidepanel.css';
import { NavLink, useLocation, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUsers, FaUser, FaTags, FaBook  } from 'react-icons/fa'; 
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UsernameWithIcon({user}) {
    return (
      <div className="admin-settings">
        <FaUser className='side-icon'/>
        <span>{user.first_name} {user.last_name}</span>
      </div>
    );
  }

function AdminSidePanel({user}) {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = user;

    
  const handleNavigateToHome = () => {
    navigate('/home', { state: { user: userData } });
  };

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      await api.post('/logout', null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      localStorage.removeItem('authToken');

      navigate('/', { state: null });
      toast.success('Logout successful!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

    return (
        <>
         <div className='admin-sidebar'>
        <Nav className="flex-column">
            <Navbar.Brand onClick={handleNavigateToHome} className="admin-sidebar-logo" style={{ cursor: 'pointer' }}>
                Learn App
            </Navbar.Brand>
            <hr />
            <Link to="/admin-panel" className={`side-link ${location.pathname === '/admin-panel' ? 'active' : ''}`}>
                <FaUsers className="side-icon" /> Users
            </Link>
            <NavLink to="/admin-panel/categories" className={`side-link ${location.pathname.includes('/categories') ? 'active' : ''}`}>
                <FaTags className="side-icon" /> Categories
            </NavLink>
            <NavLink to="/admin-panel/subjects" className={`side-link ${location.pathname.includes('/subjects') ? 'active' : ''}`}>
                <FaBook className="side-icon" /> Subjects
            </NavLink>
        </Nav>
       
       <div className='custom-dropdown'>
        <hr />
        <NavDropdown title={user ? <UsernameWithIcon user={user} /> : "Username"} 
         id="navbarScrollingDropdown" align="end" className="custom-dropdown"> 
            <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                {user && user.role === '1' &&(
                    <NavDropdown.Item onClick={() => navigate('/admin-panel')} >Admin Panel</NavDropdown.Item>
                )}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
        </div>
        </div>
        </>
    );
}

export default AdminSidePanel;