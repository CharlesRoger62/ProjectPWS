import React from 'react';
import {useState} from "react";
import {RowData} from "./row-data";
import {WeeksSubHeader} from "./weeks-sub-header";
/*let item;
                        if(index % 7 === 0){
                            item += <WeeksSubHeader count={count} />
                            count=count+1;
                        }
                        item+=
                        return item;
                        */
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
                    <WeeksSubHeader count={0} />
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
            <td>Still Loading</td>
        </tr>
        );
    }
    
}