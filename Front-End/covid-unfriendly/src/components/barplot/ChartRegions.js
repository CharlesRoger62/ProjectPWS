import React, {useRef, useEffect, useState} from 'react';
import {select} from "d3";
import * as d3 from "d3";
import {BarPlot} from "./barplot";

export const ChartRegions = () => {
    const selectData = ['nbtest', 'nbtest_positif'];
    const [selected, setSelect] = useState(selectData[0]);
    const [data, setData] = useState([])
    const url = 'http://localhost:9428/api/regions/classe0';

    const fetchData = async () => {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
           <BarPlot
               select={selected} data={data}
           />
            <form>
                <label>
                    Select :</label>
                <select value={selected} onChange={e => {
                    setSelect(e.target.value);
                    // handleChange();
                }}>
                    {selectData.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </form>
        </div>
    );

};
