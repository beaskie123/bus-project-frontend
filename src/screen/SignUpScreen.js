import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useContext, useEffect, useState } from 'react'


export default function SignUpScreen() {
  return (
<div className='div-signin'>
    <Row>      
        <Col className='sign-in2'>
            <Form className='sigin-form'>
                <h1>Welcome Back</h1>
                <p>To keep Connected with us please login with your credentials</p>
            <Form.Group className='btn-form'>
            <Button variant="primary" type="submit">
                Sign In
            </Button>
            </Form.Group>
            </Form>
        </Col>
        <Col className='sign-in'>
            <Form className='sign-in-container'>
                <h1>Create Account</h1>
                <Form.Group className="mb-3 name" controlId="formGridName" >
                <Form.Label>Enter Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3 email" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3 password" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Form.Group className="button">
                <Button variant="primary" type="submit" to='/signup'>
                    Sign Up
                </Button>
                </Form.Group>
        </Form>
        </Col>
  </Row>
</div>
  )
}
