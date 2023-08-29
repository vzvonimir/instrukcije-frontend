import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../css/register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        city: '',
        role: '',
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleRegistration = async (e) => {
        e.preventDefault();
      
        try {
          await api.post('/register', formData);
          navigate('/');
          toast.success('Registration successful!', {
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
        <div className="register-container">
        <h1 className="logo">Sign Up</h1>
        <div className="register-form">
        <Form onSubmit={handleRegistration}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange} 
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password"
                    placeholder="Confirm Password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleInputChange}
                    >
                        <option>Choose...</option>
                        <option value="2">Student</option>
                        <option value="3">Instructor</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
        <hr/>
        <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
        </div>
        </>
    );
}
export default Register;