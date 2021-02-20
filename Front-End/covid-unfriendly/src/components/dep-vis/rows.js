import React from 'react';
import {useState} from "react";
import {RowData} from "./row-data";
import {WeeksSubHeader} from "./weeks-sub-header";

export const Rows = (props) => {
    if(props.data !==undefined){
        console.log(props.data);
        let count=1;
        return( 
            <>
                <tr>
                    
                </tr>
                {
                    props.data.map((value,index) => {
                        if(index%7===0){
                            <WeeksSubHeader count={count} />
                            count=count+1;
                        }
                        <RowData value={value}/>
                    })
                }
                <tr>
                    
                </tr>
                <tr>
                    <RowData />
                </tr>
                <tr>
                    <RowData />
                </tr>
            </>
        );
    }
    else {
        return(
        <>
            <p>Still Loading</p>
        </>
        );
    }
    
}