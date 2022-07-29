import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom';
import SendEmailConfirm from '../component/emailTemplate.js'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false , user: action.payload_user
      };
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

  const [Datas, setDatas] = useState(
    {
      bus_name:'',
      fare:0,
      user_name:'',
      email: '',
      seetNo: 0,
    },
  );

  const [{ loading, error, product, user }, dispatch] = useReducer(reducer, {
    user: [],
    product: [],
    loading: true,
    error: '',
  });


  useEffect(()=> {
    if(product.seat && isProduct === false){
      setIsProduct(true)
      setSeat(product.seat)
    }
    console.log(product)
  }, [product])
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        const user = await axios.get(`/api/users/getall`)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data, payload_user: user.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);


  const onHandleChange = (selectedNumber) => {
   const val1 = seat.map((val, index) => {
    if(val.number === selectedNumber){

     return {...val, isBooked: true}
    }
    return val;
  })
   const {
    name,
    fare,

   } = product

  const payload = {
    bus_name:name,
    fare,
    user_name:'bea',
    email: 'beyaandreya30@gmail.com',
    seetNo: selectedNumber,
  }

  console.log(payload)
  console.log(val1)

  setSeat(val1)

  
  setDatas({...Datas, ...payload});
  
}

useEffect(() => {
  console.log("Datas mo to ",Datas)
  console.log("seettttt",seat)
}, [Datas]);


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
            <Row>
            <div class="form-group">
              <label>
                Date:
                <input required type="date" name="date"/>
              </label>
            </div>
          </Row>
            </Col>
            <Col>
            {product.name} || 
            {user[0].name}

            {
              Datas.seetNo !== 0 ? <SendEmailConfirm data={Datas}/> : <p>DATA</p>
            }
            
            </Col>
          </Row>
          
      </Container></div>
  )
}
export default BusScreen;