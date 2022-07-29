import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function BusScreen() {
  const params = useParams();
  const { slug } = params;
  const [seat, setSeat] = useState([]);
  const [isProduct, setIsProduct] = useState(false);
  
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(()=> {
    if(product.seat && isProduct === false){
      setIsProduct(true)
      setSeat(product.seat)
    }
    else {
      console.log(false,seat)
    }
  }, [product])
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  const onHandleChange = (selectedNumber) => {
   const val = seat.filter((seats) => {
    return seats.number === selectedNumber
   }) 
   const val1 = seat.map((val, index) => {
    if(val.number === selectedNumber){

     return {...val, isBooked: true}
    }
    return val;
  })
  console.log(val1)
  setSeat(val1)
}
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) :(
    <div>
      <Container>
        <Row>
          <Col>
          <h2>Please select your desire seat.</h2>
        {seat.map((seat, index) => {
        if(seat.isBooked === true){
          return(
          <div className='red'>
            <p >{seat.number}</p>
          </div>
          ) }
          else {
          return(
            <div className='green'
            onClick={() => onHandleChange(seat.number)}>
              <p >{seat.number}</p>
            </div>
            )
        }
        })}
          </Col>
          <Col>
          {product.name} 
          </Col>
        </Row>
        <Row>
        <div class="form-group">
        <label>
          Date:
          <input required type="date" name="date"/>
        </label>
      </div>
        </Row>
      </Container></div>
  )
}
export default BusScreen;