import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
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
        case 'FETCH_SEARCH':
            return {...state, products: action.payload, loading: false};
        case 'FETCH_FAIL':
            return{...state, loading:false, error: action.payload};
        default:
            return state;
    }
}
  

  function HomeScreen() {
    const [search , setSearch] = useState([])

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

    const onHandleSearch = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.post('/api/products/search', { droppingPoints : search });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        console.log(err.message)
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    }

  return (
    <div>
      <section className='hero'>
            <div className='hero-content'>
            <h1 className='text'>Welcome to Sonic Bus Corporation</h1>
            <br />
            <h4 className='text'> Premium Point to Point Bus Service Planner</h4>
            <br />
            <p className='text'>Sonice Bus Co. is a bus service is an initiative by the Department of Transportation to offer commuters another reliable and safe mode of transport and help reduce the traffic volume in Metro Manila and beyond.</p>
            </div>
            
            <br />
            <input type='text' onChange={(e) => setSearch(e.target.value)} />
            <button onClick={onHandleSearch}> Search route </button>
            {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) :
           products > 0 ? products.map((info) => (
               <div className='hm-container'>
                <Row key={info.slug} className="hs-row">
                    <Link to={`/bus/${info.slug}`}>
                    <Col>{info.name}</Col>
                    </Link>
                    <Col>Arrival Time : {info.arrivaltime}</Col>
                    <Col>Departure Time: {info.departureTime}</Col>
                    <Col>Fare: {info.fare} Pesos</Col>
                </Row>
                <br />
                </div>
            )) : <p> no data found </p>
          }
    </section>
    </div>
  )
}

export default HomeScreen;