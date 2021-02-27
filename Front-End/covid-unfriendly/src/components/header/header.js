import React, {useEffect, useState} from "react";
import {Navbar, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import covidLogo from '../../assets/images/covid.png'
import polytechLogo from '../../assets/images/polytech.png'
import Spinner from 'react-bootstrap/Spinner'

export const HeaderNav =  () => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const url = 'https://coronavirusapi-france.now.sh/FranceLiveGlobalData';

    const fetchData = async () => {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.FranceGlobalLiveData[0]);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

            <Navbar.Brand href="">
                <img
                    src={covidLogo}
                    width="60"
                    height="60"
                />
                Bienvenue sur covid unfriendly
                <img
                    src={polytechLogo}
                    width="120"
                    height="50"
                />
                {loading
                    ?<Spinner animation="border" variant="danger" />
                    :<p>{data.deces} décès pour {data.gueris } guéris ({data.date})</p> }
            </Navbar.Brand>
        </Navbar>
    );
}
