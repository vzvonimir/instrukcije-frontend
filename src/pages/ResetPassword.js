import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/reset.css';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ResetPassword(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        key:''
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
            const response = await api.post('/resetPassword', formData); 
            navigate('/');
            toast.success(response.data.message, {
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
        <div className="reset-container">
        <h1 className="logo">Reset Password</h1>
        <div className="reset-form">
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password Confiramtion</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password Confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange} 
                    required
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Key</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Key"
                    name="key"
                    value={formData.key}
                    onChange={handleChange} 
                    required
                    />
            </Form.Group>
          
            <div className="reset-buttons">
              <Button variant="primary" type="submit">
                Reset
              </Button>
            </div>
        </Form>
        <hr/>
        </div>
        </div>
        </>
    );
}
export default ResetPassword;