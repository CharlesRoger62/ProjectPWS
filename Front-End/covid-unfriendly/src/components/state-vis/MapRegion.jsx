import React, {useRef, useEffect, useState} from "react";
import {select, geoPath, geoMercator,geoConicConformal } from "d3";
import useResizeObserver from "./useResizeObserver.js";
import ReactDynamicImport from "react-dynamic-import"
import bre from '../../d3js/RegionsMap/Bretagne.json'
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   useLocation,
   useHistory
 } from "react-router-dom";


function GeoChart(){
    let location = useLocation();    
    const regionFolder = require.context('../../d3js/RegionsMap',true);
    const region = regionFolder('./'+location.state.regionName+'.json');
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    
    const [opacity, setOpacity] = useState(0);
    const [top, setTop] = useState(-500);
    const [left, setLeft] = useState(-500);

    const [textTooltip, setTextTooltip] = useState("");

    let styleTooltip = {
        container: {
            opacity: opacity,
            top: top,
            left: left
        }
    }
    
    useEffect(() => {

        const svg = select(svgRef.current);
        console.warn(svg)
        const projection = geoConicConformal()
        .fitSize([400,400],region)

        const pathGenerator = geoPath().projection(projection);

        svg.selectAll("path")
        .data(region.features)
        .join("path")
        .attr("class","region")
        .attr("d", feature => pathGenerator(feature))
        .on("mouseover", function(d) {
            setOpacity(0.9);
            setTextTooltip("Département : " + d.target.__data__.properties.nom);
            var x = d.clientX;
            var y = d.clientY;
            setLeft(x+20);
            setTop(y+20);
        })
        .on("mouseout", function(d) {
            setOpacity(0);
            setTextTooltip("");    
        });

    }, [dimensions, region]);

    return (
        <Router>
           <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
              <svg ref={svgRef}></svg>
              <div class="tooltip" style={styleTooltip.container}>{textTooltip}</div>
           </div>
        </Router>
     )
}

export default GeoChart;