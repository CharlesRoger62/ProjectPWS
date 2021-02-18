import React from 'react';
import {useState} from "react";
import PropTypes from 'prop-types';

export const DepartementName = (props) => {
    return(
        <>
            <p>
                <strong>{props.name}</strong>
            </p>
        </>
    );
};

DepartementName.propTypes = {
    name: PropTypes.string,
};

DepartementName.defaultProps = {
    name : ""
};