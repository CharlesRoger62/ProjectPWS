import React from 'react'
import { string } from 'prop-types';
import { Container, Row, Col } from "react-bootstrap";

const rateStyle = {
  border: '2px solid black',
  borderRadius:10,
}

const RateComponent = ({ incidenceRate, positivityRate, analyticCapacity }) => {
  
    return (
      <Container style={rateStyle}>
          <Col>
            <Row className="show-grid">
              <h3 >Taux d'incidence :  </h3>
              <h3 >{incidenceRate}</h3>
              <h3 >/ 100 000</h3>
            </Row>
            <Row>
                <h3>Taux de positivité : </h3>
                <h3> {positivityRate}%</h3>
            </Row>
            <Row>
                <h3>Capacité analytique : </h3>
                <h3>{analyticCapacity}</h3>
            </Row>
          </Col>
      </Container>
    );
  };
  
  RateComponent.propTypes = {
    incidenceRate: string.isRequired,
    positivityRate: string.isRequired,
    analyticCapacity: string.isRequired,
  }
  
  export default RateComponent;