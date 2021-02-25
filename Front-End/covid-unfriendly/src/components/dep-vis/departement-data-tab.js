import React,{useEffect ,useState, useRef} from 'react';
import {TabHeader} from "./tab-header";
import {DepartementName} from "./departement-name";
import {Rows} from "./rows";
import {Retour} from "./Retour";
import PropTypes from 'prop-types';
import './departement-data-tab.scss';
import DepartementDataLoader from "../../api/DepartementDataLoader";
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';

const useConstructor = (callBack = () => { }) => {
    const hasBeenCalled = useRef(false);
    if(hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current=true;
}

export const DepartementDataTab = (props) => {
    const [currentPart, setCurrentPart] = useState(0);
    var [parts,setParts] = useState(new Map());
    const [first,setFirst] = useState(false);
    
    /*useEffect( () => {
        if(data === [])
        
    },[data, props]);*/

    useConstructor(() => {
        let data;
        DepartementDataLoader(props).then(res => {
            data=res.data.data_tab;

            var nextNum=0;
            var newParts = new Map();
            var partCount=0;

            for(let i=1;i<=data.length;i++){
                if(i%25===0){
                    newParts.set(partCount,data.slice(nextNum,i))
                    partCount++;
                    nextNum=i;
                }
            }
            setParts(newParts);
            setFirst(true);

            let items = [];
            for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPart}>
                    {number}
                </Pagination.Item>,
    );
        });  
        
    })
 /*let dataTab=[];
        if(props !== undefined && data !== []){
            dataTab = DepartementDataLoader(props);
            console.log(dataTab);
            .then(res => {
                dataTab=res.data_tab;
                setData(dataTab);
            });
            /*
            console.log("data hook : " + JSON.stringify(data));
        }*/
    

    
    
    }

    /**/
    if(parts !== undefined){
        return(
            <>
                <DepartementName name={props.libelle} />
                <table className="theme-light">
                    <thead>
                        <TabHeader />
                    </thead>
                    <tbody>
                        <Rows data={parts.get(currentPart)} semaineCount={0}/>
                    </tbody>
                </table>
                <Pagination>
                    <Pagination.First />
                    {currentPart!== 0 ? <Pagination.Prev /> : <> </>}
                    
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