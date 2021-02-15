import React from 'react';
import {useState} from "react";
import {TabHeader} from "./tab-header";
import {DepartementName} from "./departement-name";
import {Rows} from "./rows";
import {Retour} from "./Retour";
import PropTypes from 'prop-types';

export const DepartementDataTab = (name) => {
    return(
    <>
        <DepartementName name={name} />
        <table>
            <thead>
                <TabHeader />
            </thead>
            <tbody>
                <Rows />
            </tbody>
        </table>
        <Retour />
    </>
    )

    DepartementDataTab.propTypes = {
        name: PropTypes.string,
    };

    DepartementDataTab.defaultProps = {
        name : ""
    };
}


