import React, { useEffect, useState } from 'react'
import { string } from 'prop-types';
import { Container, Row, Col } from "react-bootstrap";
import Datepicker from 'react-date-picker/dist/entry.nostyle';
import './DatePicker.css';
import './Calendar.css';
import moment from 'moment';
import {RegionCovidDataLoader} from '../../api/RegionDataLoader'
import {useLocation} from "react-router-dom";
import RegionEnum from '../../enum/RegionEnum';



const rateStyle = {
  border: '3px solid black',
  borderRadius:10,
}

const dateRow = {
  margin : 20,
} 


const RateComponent = () => {
    const [date,onChange] = useState(new Date());
    const [incidenceR, setIncidence] = useState("chargement");
    const [positivityR, setPositivity] = useState("chargement");
    const [analityc, setAnalytic] = useState('"chargement');
    let location = useLocation();

    useEffect(() => {
      initData();
    } , [location]);

    const initData = () => {
      var stringDate = '2021-02-10';
      console.log(stringDate);
      
      var data;

      if(location.pathname == "/"){
        data = RegionCovidDataLoader(stringDate);

        data.then(
          v => {
            if(v.data.tx_an == null) {
              let error = 'pas de donnée';
              setAnalytic(error);
              setIncidence(error);
              setPositivity(error);
            } else {
              setAnalytic(v.data.tx_an);
              setIncidence(v.data.tx_inc);
              setPositivity(v.data.tx_pos*100);
            }
        })
      } else {

        var regionName = location.state.regionName;
        let regionNum = RegionEnum[regionName];
        data = RegionCovidDataLoader(stringDate,regionNum);

        data.then(
          v => {
            setAnalytic(v.data["0"].tx_an);
            setIncidence(v.data["0"].tx_inc);
            setPositivity(v.data["0"].tx_pos*100);
        })


        
      }
      //var data = RegionCovidDataLoader(date);
    }

    const onDateChange = value => {
      onChange(value);
      var stringDate = moment(value).format("yyyy-MM-DD");
      var data;

      if(location.pathname == "/"){
        data = RegionCovidDataLoader(stringDate);
        
        data.then(
          v => {
            if(v.data.tx_an == null) {
              let error = 'pas de donnée';
              setAnalytic(error);
              setIncidence(error);
              setPositivity(error);
            } else {
              setAnalytic(v.data.tx_an);
              setIncidence(v.data.tx_inc);
              setPositivity(v.data.tx_pos*100);
            }
        })
      } else {

        var regionName = location.state.regionName;
        let regionNum = RegionEnum[regionName];
        console.log(stringDate);
        console.log(regionNum);
        data = RegionCovidDataLoader(stringDate,regionNum);

        data.then(
          v => {
            console.log(v);
            setAnalytic(v.data["0"].tx_an);
            setIncidence(v.data["0"].tx_inc);
            setPositivity(v.data["0"].tx_pos*100);
        })
        
      }
      
    };

    return (
      <Container style={rateStyle}>
          <Col>
            <Row className="show-grid">
              <h3 >Taux d'incidence :  {Math.round(incidenceR * 100) / 100} </h3>
            </Row>
            <Row>
                <h3>Taux de positivité :  {Math.round(positivityR * 100) / 100} </h3>
            </Row>
            <Row>
                <h3>Capacité analytique : {Math.round(analityc * 100) / 100}</h3>
            </Row>
          </Col>
          <br/>
          <Row>
            <h3 style={dateRow}>Date : </h3> 
            <Datepicker onChange={onDateChange} value={date} className='date-picker' />
          </Row>
      </Container>
    );
  };
  
  export default RateComponent;