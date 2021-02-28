import React, { useRef, useEffect, useState } from "react";
import {DepartementAllDataLoader} from "../../api/DepartementDataLoader";
import RegionEnum from "../../enum/RegionEnum"
import {
  select,
  scaleLinear,
  line,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  zoom,
} from "d3";
import useResizeObserver from "./useResizeObserver";
import { useLocation } from "react-router-dom";

/**
 * Component that renders a ZoomableLineChart
 */

function ZoomableLineChart({ id = "myZoomableLineChart" }) {
    const [finalTab,setFinalTab] = useState([[]]);
    let location = useLocation();

    const getUniqueKeys = (arr) => {
        let keys = arr.map((ele) => ele.departement_num).filter((ele, i, arr) => arr.indexOf(ele) === i);
        return keys;
    };

    const selectData = (dataset, keys) => {
        const final = [];
        keys.forEach((v) => {
      
          const tab = dataset.filter( (e) => {
            return e.departement_num === v;
          });
          final.push(tab);
        });
        return final;
    };
    
    const initData = () => {

        var regionName = location.state.regionName;
        let regionNum = RegionEnum[regionName];
        const newData = DepartementAllDataLoader(regionNum);

        newData.then(
            v => {
                console.log(v.data_tab);
                let uniqueKeys = getUniqueKeys(v.data_tab);
                let final = selectData(v.data_tab,uniqueKeys);
                setFinalTab(final);
                console.log(final);
            }
        );
    }


    useEffect(() => {
        initData();
    },[]);

    const [data, setData] = useState(
        Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
      );
      const [data2, setData2] = useState(
        Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
      );    
  
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [currentZoomState, setCurrentZoomState] = useState();

    // will be called initially and on every data change
    useEffect(() => {
        if(finalTab.length > 1){    
            const svg = select(svgRef.current);
            const svgContent = svg.select(".content");
            const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect();
        //svgContent.selectAll("*").remove();
    
    // scales + line generator
    const xScale = scaleLinear()
      .domain([0, finalTab[0].length - 1])
      .range([10, width - 10]);

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale);
      xScale.domain(newXScale.domain());
    }

    const yScale = scaleLinear()
      .domain([0, max(finalTab[0], (d) => {return d.nbtest;})])
      .range([height - 10, 10]);

    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y((d) => yScale(d.nbtest))
      .curve(curveCardinal);

    finalTab.forEach( (e) => {
        svgContent
      .selectAll(".myLine")
      .data(e.slice(0,6))
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", lineGenerator);
    });

    // axes
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    // zoom
    const zoomBehavior = zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", (event) => {
        const zoomState = event.transform;
        setCurrentZoomState(zoomState);
      });

    svg.call(zoomBehavior);
    }
  }, [currentZoomState, finalTab, dimensions]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${id})`}></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default ZoomableLineChart;