import React,{ useState, useRef } from 'react';
import {TabHeader} from "./tab-header";
import {DepartementName} from "./departement-name";
import {Rows} from "./rows";
import {Retour} from "./Retour";
import PropTypes from 'prop-types';
import './departement-data-tab.scss';
import DepartementDataLoader from "../../api/DepartementDataLoader";
import Pagination from 'react-bootstrap/Pagination';
import { useLocation } from "react-router-dom";

const useConstructor = (callBack = () => { }) => {
    const hasBeenCalled = useRef(false);
    if(hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current=true;
}

export const DepartementDataTab = (props) => {
    let location = useLocation();
    const [currentPart, setCurrentPart] = useState(0);
    var [parts,setParts] = useState(new Map());
    const [data,setData] = useState({});
    const [sortType,setSortType] = useState(new Map());
    const [forcerender,SetForceRender] = useState(true);

    useConstructor(() => {
        let data;
        DepartementDataLoader(location.state).then(res => {
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
            let temp= new Map();
            for(let i =0 ; i<=6 ; i++){
                temp.set(i,'asc');
            }
            setSortType(temp);
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

    const compareForSpecificColumn = (key , order = 'asc') =>{
            return function innerSort(a, b) {
              if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
              }
          
              const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
              const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];
          
              let comparison = 0;
              if (varA > varB) {
                comparison = 1;
              } else if (varA < varB) {
                comparison = -1;
              }
              return (
                (order === 'desc') ? (comparison * -1) : comparison
              );
            };
    }


    const handleSorting = (changingKey,index,newSortBy) =>{
        let oldParts=parts;
        setSortType(newSortBy);
        let tableau = parts.get(currentPart);
        tableau.sort(compareForSpecificColumn(changingKey, newSortBy.get(index)));
        oldParts.set(currentPart, tableau);
        setParts(oldParts);
        if(forcerender === true){
            SetForceRender(false);
        }
        else{
            SetForceRender(true);
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
                <DepartementName name={location.state.libelle} />
                <table className="theme-light">
                    <thead>
                        <TabHeader onSort={handleSorting} sortBy={sortType}/>
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
