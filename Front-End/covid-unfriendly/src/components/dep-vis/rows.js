import React, { useEffect } from 'react';
import {RowData} from "./row-data";

export const Rows = (props) => {

    if(props.data !== undefined){
        return(
            <>
            {
            props.data.map( (value,index) => {
                return(
                <>
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
