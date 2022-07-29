import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Store } from '../Store';


export default function SignInScreen() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {state, dispatch: ctxDispatch} = useContext(Store)
  const {userInfo} = state
  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const {data} = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({type: 'USER_SIGNIN', payload: data})
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    }catch(err){
      alert('Invalid email or password')
    }
  }
  useEffect(() => {
    if(userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])
  return (
    <div className='div-signin'>
      <Row>      
    <Col className='sign-in'>
      <Form className='sign-in-container' onSubmit={submitHandler}>
          <h1>Log in to your Account</h1>
            <Form.Group className="mb-3 email" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                onChange={(e) => setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 password" controlId="formBasicPassword">
             <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
             onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="button">
            <Button variant="primary" type="submit" >
                Sign In
            </Button>
            </Form.Group>
            <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup`}>Create your account</Link>
        </div>
    </Form>
    </Col>
    </Row>
    </div>
  )
}
