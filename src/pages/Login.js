import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const navigate = useNavigate();

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', formData); 
            const user = response.data.user;
            const token = response.data.authorization.token;
            localStorage.setItem('authToken', token);
            navigate('/home', { state: { user: user }});
            toast.success('Login successful!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
      };

    return(
        <>
        <div className="login-container">
        <h1 className="logo">Login</h1>
        <div className="login-form">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange} 
                    required
                    />
            </Form.Group>
          
            <div className="login-buttons">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </Form>
        <hr/>
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
        </div>
        </div>
        </>
    );
}
export default Login;