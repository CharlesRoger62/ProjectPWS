import React from 'react';
import {useState} from "react";
import {RowData} from "./row-data";
import {WeeksSubHeader} from "./weeks-sub-header";

export const Rows = (props) => {
    /*
            props.data.map((value,index) => {
                        if(index%7===0){
                            <WeeksSubHeader count={count} />
                            count=count+1;
                        }
    */
    if(props.data !== undefined){
        return( 
            <>
                <tr>
                    <RowData value={props.data}/>
                </tr>
            </>
        );
    }
    else {
        return(
        <tr>
            <td>Still Loading</td>
        </tr>
        );
    }
    
}