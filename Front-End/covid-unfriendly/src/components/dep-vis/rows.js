import React from 'react';
import {useState} from "react";
import {RowData} from "./row-data";
import {WeeksSubHeader} from "./weeks-sub-header";

export const Rows = (props) => {
    const [semaineCount,setSemaineCount] = useState(1);
    if(props.data !== undefined){
        return( 
            <>
            {
            props.data.map( (value,index) => {
                let modulo = index % 7;
                return(
                <>
                { modulo === 0 ?   
                    <tr><WeeksSubHeader count={0} /></tr>
                     : <> </> 
                }
                    <tr>
                    <RowData value={value}/>
                    </tr>
                </>
                ) 

            })
            }
        </>)
    }
    else {
        return(
        <tr>
            <td>No Data Available</td>
        </tr>
        );
    }
    
}