import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import SignInScreen from './screen/SignInScreen';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from './Store';
import HomeScreen from './screen/HomeScreen';
import BusScreen from './screen/BusScreen';
import SignUpScreen from './screen/SignUpScreen';
import ProfileScreen from './screen/ProfileScreen';
import About from './screen/About';

function App() {
  const {state, dispatch: ctxDispatch } = useContext(Store)
  const {userInfo} = state;

  const signoutHandler = () =>{
    ctxDispatch({type: 'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
  }
  return (
    <BrowserRouter>
      <header>
      <Navbar bg="dark" variant="dark" className='nav'>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand>Sonic Bus Co.</Navbar.Brand>
          </LinkContainer>
          <Nav>
            <Nav.Link >
              <Link to="/about">
              About
              </Link>
            </Nav.Link>
            { userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link className='dropdown-item'
                to="#signout"
                onClick={signoutHandler}>
                  Sign Out
                </Link>
              </NavDropdown>
            ): (
              <Link className="nav-link" to="/signin">
              Sign In 
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      </header>
    <main className='main'>
    <Routes>
      <Route path='/' element={<HomeScreen />}/>
      <Route path='/bus/:slug' element={<BusScreen />}/>
      <Route path='/signin' element={<SignInScreen />}/>
      <Route path='/signup' element={<SignUpScreen />}/>
      <Route path='/profile' element={<ProfileScreen />}/>
      <Route path='/about' element={<About />}/>
    </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
