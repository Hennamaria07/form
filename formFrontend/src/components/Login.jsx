import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const res = await axios.post("http://localhost:4123/login", {
                email,
                password
            });
            try {
                if(res.data.sucess){
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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='font-bold text-white'>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Label htmlFor="inputPassword5" className='font-bold text-white'>Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Your password must be 8-20 characters long, contain letters and numbers,
                        and must not contain spaces, special characters, or emoji.
                    </Form.Control.Feedback>
                   
      <Row className="mt-3">
      <Form.Group as={Col} id="formGridCheckbox">
        <Form.Check type="checkbox" className='text-white font-bold' label="Remember me" />
      </Form.Group>

        <Form.Group as={Col} >
        <Form.Label htmlFor="inputPassword5" className='font-bold d-flex justify-content-end text-white'>Forgot Password?</Form.Label>
        </Form.Group>
      </Row>
                    <div className='d-flex justify-content-center'>
                        <Button className='my-3 w-100' variant="primary" type="submit">
                            Login
                        </Button>
                    </div>
                    <Form.Group as={Col}>
        <Form.Label htmlFor="inputPassword5" className='font-bold d-flex justify-content-end text-white'>Don't have an account?<Link to={'/signup'}className='text-decoration-none ps-1' style={{color: "aquamarine"}}>Register</Link> </Form.Label>
        </Form.Group>
                </Form>
            </Row>
        </Container>
    );
};

export default Login;
