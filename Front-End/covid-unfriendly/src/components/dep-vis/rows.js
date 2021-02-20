import React from 'react';
import {useState} from "react";
import {RowData} from "./row-data";
import {WeeksSubHeader} from "./weeks-sub-header";

export const Rows = () => {
    return( 
        <>
            <WeeksSubHeader count={1} />
            <tr>
                <RowData />
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