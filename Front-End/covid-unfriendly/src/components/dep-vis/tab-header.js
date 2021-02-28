import React,{useState, useEffect} from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

export const TabHeader = (props) => {
    const [sortBy,setSortBy] = useState(new Map());

    useEffect(() => {
        setSortBy(props.sortBy);
    }, [props.sortBy])
    
    const handleOnClick = (value, type) => {
        let twoValueArray = [];
        let newMap = sortBy;
        let index = 0;
        let changingKey='';

        if(value === 'Jour'){
            index=0;
            changingKey='jour';
        }

        if(value === 'Cas positifs'){
            index=1;
            changingKey='nbtest_positif';
        }

        if(value === 'Cas au total'){
            index=2;
            changingKey='nbtest';
        }

        if(value === 'Taux de positivité'){
            index=3;
            changingKey='tx_pos';
        }

        if(value === "Taux d'incidence"){
            index=4;
            changingKey="tx_inc";
        }

        if(value === 'Capacité analytique'){
            index=5;
            changingKey='tx_an';
        }

        if(newMap.get(index)==='asc')
        newMap.set(index,'desc');
        else newMap.set(index,'asc');
        setSortBy(newMap);
        props.onSort(changingKey, index, newMap);
    }
    if(sortBy !== undefined){
        return(
            <tr>
                <th onClick={() => handleOnClick('Jour', sortBy.get(0))}>Jour {sortBy.get(0) ==='asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</th>
                <th onClick={() => handleOnClick('Cas positifs', sortBy.get(1))}>Cas positifs {sortBy.get(1) ==='asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</th>
                <th onClick={() => handleOnClick('Cas au total', sortBy.get(2))}>Cas au total {sortBy.get(2) ==='asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</th>
                <th onClick={() => handleOnClick('Taux de positivité', sortBy.get(3))}>Taux de positivité {sortBy.get(4) ==='asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</th>
                <th onClick={() => handleOnClick("Taux d'incidence", sortBy.get(4))}>Taux d'incidence {sortBy.get(5) ==='asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</th>
                <th onClick={() => handleOnClick('Capacité analytique', sortBy.get(5))}>Capacité analytique {sortBy.get(6) ==='asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</th>
            </tr>
        )
    }
    else return (<div>is Loading</div>)
}
