import React from 'react';
import {useState} from "react";
import {RowData} from "./row-data";
import {WeeksSubHeader} from "./weeks-sub-header";

export const Rows = () => {
    return( 
        <>
            <WeeksSubHeader />
            <tr>
                <RowData />
            </tr>
        </>
    );
}