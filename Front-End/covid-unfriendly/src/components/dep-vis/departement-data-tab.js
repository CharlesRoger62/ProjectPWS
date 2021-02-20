import React,{useEffect,useState} from 'react';
import {TabHeader} from "./tab-header";
import {DepartementName} from "./departement-name";
import {Rows} from "./rows";
import {Retour} from "./Retour";
import PropTypes from 'prop-types';
import './departement-data-tab.scss';
import DepartementDataLoader from "../../api/DepartementDataLoader";

export const DepartementDataTab = (props) => {
    const [data, setData] = useState({});
    useEffect(() => {
        setData(DepartementDataLoader(props));
        console.log("in use effet :"+data);
      });

      DepartementDataTab.propTypes = {
          name: PropTypes.string,
      };

      DepartementDataTab.defaultProps = {
          name : ""
      };

    if(data !== undefined){
        return(
            <>
                <DepartementName name={props.libelle} />
                <table className="theme-light">
                    <thead>
                        <TabHeader />
                    </thead>
                    <tbody>
                        <Rows data={data}/>
                    </tbody>
                </table>
                <Retour />
            </>
            );
    }
    else {
        return(
        <>
            <p>Please wait</p>
        </>
        );
    }



}
