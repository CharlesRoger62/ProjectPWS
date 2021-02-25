import React,{ useState, useRef } from 'react';
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
    const [data,setData] = useState({});

    useConstructor(() => {
        let data;
        DepartementDataLoader(props).then(res => {
            data=res.data.data_tab;

            var nextNum=0;
            var newParts = new Map();
            var partCount=0;

            for(let i=1;i<=data.length;i++){
                if(i%10===0){
                    newParts.set(partCount,data.slice(nextNum,i))
                    partCount++;
                    nextNum=i;
                }
            }
            setData(data);
            setParts(newParts);
        });
    });

    const handleOnClick = (index) => {
        if(index < parts.size){
            setCurrentPart(index);
        }
    }

    const activePagination = (value) => {
        if(value === currentPart+1){
            return <Pagination.Item active>{value}</Pagination.Item>
        }
        else {
            return <Pagination.Item onClick={() => {
                handleOnClick(value-1)
            }} >{value}</Pagination.Item>
        }
    }

    if(parts !== undefined) {
        let index_from_one = currentPart + 1;
        let range=[];
        for(let i = index_from_one-4 ;i < index_from_one + 3; i++){
            if(i>0){
                if(i > parts.size){
                    i=parts.size;
                    break;
                }
                range.push(i);
            }
        }
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
                <Pagination className="center">
                {currentPart !== 0 ? <Pagination.First onClick={() => {
                        handleOnClick(0)
                    } } /> : <> </>}
                    {currentPart !== 0 ? <Pagination.Prev onClick={() => {
                        handleOnClick(currentPart - 1)
                    }} /> : <> </>}
                    {range[0] > 3 ? <Pagination.Ellipsis onClick={() => {
                        handleOnClick(currentPart - 4)
                    }} /> : <> </>}
                    {range.map((value) => {
                        return activePagination(value);
                    })}
                    {currentPart < parts.size - 3 ? <Pagination.Ellipsis onClick={() => {
                        handleOnClick(currentPart + 4)
                    } } /> : <> </>}
                    {currentPart !== parts.size-1 ? <Pagination.Next onClick={() => {
                        handleOnClick(currentPart + 1)
                    }} /> : <> </>}
                    {currentPart !== parts.size-1 ? <Pagination.Last onClick={() => {
                        handleOnClick(parts.size - 1)
                    }}/> : <> </>} 
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