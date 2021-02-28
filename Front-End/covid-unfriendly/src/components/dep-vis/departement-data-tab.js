import React,{useEffect ,useState} from 'react';
import {TabHeader} from "./tab-header";
import {DisplayName} from "../display-name";
import {Rows} from "./rows";
import {Retour} from "./Retour";
import PropTypes from 'prop-types';
import './departement-data-tab.scss';
import DepartementDataLoader from "../../api/DepartementDataLoader";
import Pagination from 'react-bootstrap/Pagination';
import { useLocation } from 'react-router-dom';


export const DepartementDataTab = (props) => {
    var [data, setData] = useState([]);
    const [currentPart, setCurrentPart] = useState([]);
    var [parts,setParts] = useState([]);
    let location=useLocation();

 /*
 let dataTab=[];
        if(props !== undefined && data !== []){
            dataTab = DepartementDataLoader(props);
            console.log(dataTab);
            /*.then(res => {
                dataTab=res.data_tab;
                setData(dataTab);
            });*/
            /*
            console.log("data hook : " + JSON.stringify(data));
        }*/
    useEffect( () => {
        DepartementDataLoader(props).then(res =>
            setData(res.data.data_tab)
        )
        
        let nextNum=0;
        for(let i=1;i<=data.length;i++){
            if(i%25===0){
                let part=data.slice(nextNum,i);
                nextNum=i;
            }
        }
    },[]);

    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
            {number}
        </Pagination.Item>,
    );
    }

    if(data !== undefined){
        return(
            <>
                <DisplayName name={location.state.libelle} />
                <table className="theme-light">
                    <thead>
                        <TabHeader />
                    </thead>
                    <tbody>
                        {data.map((value) => {
                            return <Rows key={value._id} data={value}/>
                        })}
                    </tbody>
                </table>
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item onClick>{10}</Pagination.Item>
                    <Pagination.Item onClick>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item onClick>{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item onClick>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
                <Retour />
            </>
            );
    }
    else {
        return(
        <tr>
            Please wait
        </tr>
        );
    }
}

DepartementDataTab.propTypes = {
    name: PropTypes.string,
};

DepartementDataTab.defaultProps = {
    name : ""
};