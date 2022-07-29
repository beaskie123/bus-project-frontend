import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import  Axios  from 'axios';

export default function SignUpScreen() {
    const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {state, dispatch: ctxDispatch} = useContext(Store)
  const {userInfo} = state
  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        alert('Password Do not Match');
        return;
    }
    try{
      const {data} = await Axios.post('/api/users/signup', {
        name,
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
        navigate('/');
    }
  }, [navigate, userInfo])

  return (
<div className='div-signin'>
    <Row>      
        <Col className='sign-in2'>
            <Form className='sigin-form'>
                <h1>Welcome Back</h1>
                <p>To keep Connected with us please login with your credentials</p>
            <Form.Group className='btn-form'>
            <Link to={`/signin`}>Sign-In</Link>
            </Form.Group>
            </Form>
        </Col>
        <Col className='sign-in'>
            <Form className='sign-in-container' onSubmit={submitHandler}>
                <h1>Create Account</h1>

                <Form.Group className="mb-3 name" controlId="formGridName" >
                <Form.Label>Enter Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                required
                onChange={(e) => setEmail(e.target.value)}/>

                <Form.Group className="mb-3 password" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />

                <Form.Group className="mb-3 password" controlId="formBasicPassword1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

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
