import React, {useEffect, useState} from "react";
import {Navbar, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import covidLogo from '../../assets/images/covid.png'
import polytechLogo from '../../assets/images/polytech.png'
import Spinner from 'react-bootstrap/Spinner'
import './header.css'

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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="header">
            <img
                className="img-left"
                src={covidLogo}
                width="60"
                height="60"
            />
            <Navbar.Brand href="/state" className="header-title">

                Bienvenue sur Covid Unfriendly
                {"\n"}
                {loading
                    ?<Spinner className= "data" animation="border" variant="danger" />
                    :<p className= "data">{data.deces} décès pour {data.gueris} guéris ({data.date})</p> }

            </Navbar.Brand>
            <img
            className="img-right"
            src={polytechLogo}
            width="120"
            height="50"
            />

        </Navbar>
    );
}
