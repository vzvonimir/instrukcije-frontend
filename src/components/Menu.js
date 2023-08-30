import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/menu.css';
import { FiUser } from 'react-icons/fi';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UsernameWithIcon({user}) {
    return (
      <div className="d-flex align-items-center">
        <span className="me-2">{user.first_name} {user.last_name}</span>
        <FiUser size={24} />
      </div>
    );
  }

function Menu({ user }){

  const navigate = useNavigate();

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
        <Navbar expand="lg" className="custom-navbar">
        <Container fluid>
            <Navbar.Brand onClick={() => navigate('/home', { state: { user: user } })} className="pointer-cursor">Learn App</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                <Nav.Link href="#action1">Subjects</Nav.Link>
                <Nav.Link href="#action2">Instructors</Nav.Link>
                <Nav.Link href="#action2">Contact</Nav.Link>
                </Nav>
                <NavDropdown title={user ? <UsernameWithIcon user={user} /> : "Username"} id="navbarScrollingDropdown" align="end">
                       <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                       {user && user.role === '1' &&(
                         <NavDropdown.Item onClick={() => navigate('/admin-panel')}>Admin Panel</NavDropdown.Item>
                       )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </>
    );
}

export default Menu;