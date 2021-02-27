import React, {useRef, useEffect, useState} from 'react';
import {select} from "d3";
import * as d3 from "d3";
import {BarPlot} from "./barplot";
import Loader from 'react-loader-spinner';

export const ChartRegions = () => {
    const selectData = ['cas', 'tests'];
    const [selected, setSelect] = useState(selectData[1]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = 'http://localhost:9428/api/serviceregions/classe0';

    const fetchData = async () => {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchData().then( value => {
            setSelect(selectData[0]);
        });
    }, []);

    return (
        <div>
            {loading && <Loader type="Bars" color="#00BFFF" height={40} width={40}/> }
            {!loading && <div>
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
            </div>}
        </div>
    );

};

