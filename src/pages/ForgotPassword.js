import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/forgotpassword.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api';

function ForgotPassword(){
    const [formData, setFormData] = useState({
        email: '',
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
            const response = await api.post('/requestValidationKey', formData); 
            navigate('/resetpassword');
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
        <div className="forgotpassword-container">
        <h1 className="logo">Forgot Password?</h1>
        <div className="forgotpassword-form">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" 
                    name="email"
                    onChange={handleChange}
                    required/>
                <Form.Text className="text-muted">
                    We'll send reset code to your email.
                </Form.Text>
            </Form.Group>
            <div className="forgotpassword-buttons">
              <Button variant="primary" type="submit">
                Send
              </Button>
              <Link to="/">Go Back</Link>
            </div>
        </Form>
        </div>
        </div>
        </>
    );
}
export default ForgotPassword;