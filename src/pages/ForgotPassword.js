import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/forgotpassword.css';
import { Link } from 'react-router-dom';

function ForgotPassword(){
    return(
        <>
        <div className="forgotpassword-container">
        <h1 className="logo">Forgot Password?</h1>
        <div className="forgotpassword-form">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
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