import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import covidLogo from '../../assets/images/covid.png'
import polytechLogo from '../../assets/images/polytech.png'

export const HeaderNav =  () => {

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
            </Navbar.Brand>
        </Navbar>
    );
}
