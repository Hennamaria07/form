import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,  Link} from 'react-router-dom';

const SignUp = () => {
    const rowStyle = {
        background: 'rgba(24, 20, 53, 0.7)',
        borderRadius: '15px',
        padding: '20px',
        minWidth: "100%"
    };
    const containerStyle = {
        minHeight: "100vh",
    }

    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
           try {
            const res = await axios.post("http://localhost:4123/signup", {
                fullname: name,
                email,
                number,
                password
            });
            if(res.data.success) {
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    
    await new Promise((resolve) => setTimeout(resolve , 2000));
    navigate('/')
            }
           } catch (error) {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
           }
        }

        setValidated(true);
    };

    return (
        <Container as={Col} lg="5" md="8" className='d-flex justify-content-center align-items-center' style={containerStyle}>
            <Row style={rowStyle}>
                <ToastContainer />
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label className='font-bold text-white'>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter fullname"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
                            Please provide a valid Name.
                        </Form.Control.Feedback>
        </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='font-bold text-white'>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicnumber">
                        <Form.Label className='font-bold text-white'>Phone Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter number" onChange={(e) => setNumber(e.target.value)} required />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid number.
                        </Form.Control.Feedback>
                    </Form.Group>
                   <Form.Group>
                   <Form.Label htmlFor="inputPassword5"className='font-bold text-white'>Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        required
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                   </Form.Group>
                   {/* <Form.Group>
                   <Form.Label htmlFor="confirmPassword" className='font-bold text-white'>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="confirmPassword"
                        aria-describedby="passwordHelpBlock"
                        required
                        noValidate
                        validated={validatedPass}
                        onChange={(e) => setConfirmPass(e.target.value)} 
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
                   </Form.Group> */}
                    <div className='d-flex justify-content-center'>
                        <Button className='my-3 w-100' variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </div>
                    <Form.Group as={Col} >
        <Form.Label htmlFor="inputPassword5" className='font-bold d-flex justify-content-end text-white'>Already have an account?<Link to={'/'} className='text-decoration-none ps-1' style={{color: "aquamarine"}}>Login</Link> </Form.Label>
        </Form.Group>
                </Form>
            </Row>
        </Container>
    );
};

export default SignUp;
