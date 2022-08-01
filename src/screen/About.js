import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function About() {
  return (
    <div>
        <Row className='about-row'>
              <h2>How can we Help</h2>
              <Col>
              <Card style={{ width: '18rem' }} className='card-pic'>
              <Card.Img variant="top" src="/img/bus1.jpg" />
              <Card.Body>
                <Card.Title>Safe Travel</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
              </Col>
              
              <Col>
              <Card style={{ width: '18rem' }} className='card-pic'>
              <Card.Img variant="top" src="/img/bus2.jpg" />
              <Card.Body>
                <Card.Title>Stay up-to-date</Card.Title>
                <Card.Text>
                Follow latest P2P bus schedules, stations, and updates from operators.
                </Card.Text>
              </Card.Body>
            </Card>
              </Col>

              <Col>
              <Card style={{ width: '18rem' }} className='card-pic'>
              <Card.Img variant="top" src="/img/bus3.jpg" />
              <Card.Body>
                <Card.Title>Avoid long lines</Card.Title>
                <Card.Text>
                View the number of waiting passengers at any P2P bus station.
                </Card.Text>
              </Card.Body>
            </Card>
              </Col>

            </Row>
    </div>
  )
}
