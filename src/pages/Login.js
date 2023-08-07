import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/login.css';
import { Link } from 'react-router-dom';

function Login(){
    return(
        <>
        <div className="login-container">
        <h1 className="logo">Login</h1>
        <div className="login-form">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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