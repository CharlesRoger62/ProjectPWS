import React from 'react';
import {TabHeader} from "./tab-header";
import {DepartementName} from "./departement-name";
import {Rows} from "./rows";
import {Retour} from "./Retour";
import PropTypes from 'prop-types';
import './departement-data-tab.scss';

export const DepartementDataTab = (props) => {
    return(
    <>
        <DepartementName name={props.name} />
        <table className="theme-light">
            <thead>
                <TabHeader />
            </thead>
            <tbody>
                <Rows />
            </tbody>
        </table>
        <Retour />
    </>
    );

    DepartementDataTab.propTypes = {
        name: PropTypes.string,
    };

    DepartementDataTab.defaultProps = {
        name : ""
    };
}



