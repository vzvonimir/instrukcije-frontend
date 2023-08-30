import '../../css/admin-css/adminsidepanel.css';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaHome, FaUser } from 'react-icons/fa'; 
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function UsernameWithIcon({user}) {
    return (
      <div className="admin-settings">
        <FaUser className='side-icon'/>
        <span>{user.first_name} {user.last_name}</span>
      </div>
    );
  }

function AdminSidePanel({user}) {
    const navigate = useNavigate();
    const userData = user;

    
  const handleNavigateToHome = () => {
    navigate('/home', { state: { user: userData } });
  };

    return (
        <>
         <div className='admin-sidebar'>
        <Nav className="flex-column">
            <Navbar.Brand onClick={handleNavigateToHome} className="admin-sidebar-logo">
                Learn App
            </Navbar.Brand>
            <hr />
            <NavLink to="/admin-panel" className="side-link">
                <FaHome className="side-icon" /> Users
            </NavLink>
            <NavLink to="/profile" className="side-link">
                <FaUser className="side-icon" /> Profile
            </NavLink>
        </Nav>
       
       <div className='custom-dropdown'>
        <hr />
        <NavDropdown title={user ? <UsernameWithIcon user={user} /> : "Username"} 
         id="navbarScrollingDropdown" align="end" className="custom-dropdown"> 
            <NavDropdown.Item>Profile</NavDropdown.Item>
                {user && user.role === '1' &&(
                    <NavDropdown.Item >Admin Panel</NavDropdown.Item>
                )}
            <NavDropdown.Divider />
            <NavDropdown.Item>Logout</NavDropdown.Item>
        </NavDropdown>
        </div>
        </div>
        </>
    );
}

export default AdminSidePanel;