import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import logger from 'use-reducer-logger'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true}
        case 'FETCH_SUCCESS':
            return {...state, products: action.payload, loading: false};
        case 'FETCH_FAIL':
            return{...state, loading:false, error: action.payload};
        default:
            return state;
    }
}
  function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
      });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
              const result = await axios.get('/api/products');
              dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
              dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        }
        fetchData();
    }, [])

  return (
    <div>
        <Container>
            <h2>Welcome to Sonic Bus Corporation</h2>
            {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : 
            products.map((info) => (
                <Container>
                <Row key={info.slug}>
                    <Link to={`/bus/${info.slug}`}>
                    <Col>{info.name}</Col>
                    </Link>
                    <Col>Arrival Time : {info.arrivaltime}</Col>
                    <Col>Departure Time: {info.departureTime}</Col>
                    <Col>Fare: {info.fare} Pesos</Col>
                </Row>
                <br />
                </Container>
            ))}
        
        </Container>
    </div>
  )
}

export default HomeScreen;