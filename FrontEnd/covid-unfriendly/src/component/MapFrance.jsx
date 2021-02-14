import React, {useRef, useEffect} from "react";
import {select, geoPath, geoMercator,geoConicConformal } from "d3";
import useResizeObserver from "./useResizeObserver.js";



function GeoChart({data}){
   const svgRef = useRef();
   const wrapperRef = useRef();
   const dimensions = useResizeObserver(wrapperRef);

   useEffect(() => {
      const svg = select(svgRef.current);

      const projection = geoConicConformal()
      //.center([2.454071, 46.279229])
      .fitSize([500,500],data)
      //.scale(2600)
      //.translate([500 / 2, 500 / 2]);

      const pathGenerator = geoPath().projection(projection);

      svg.selectAll("path")
         .data(data.features)
         .join("path")
         .attr("class","departement")
         .attr("d", feature => pathGenerator(feature));

   } , [data, dimensions]);


   return (
      <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
         <svg ref={svgRef}></svg>
      </div>
   )

}

export default GeoChart;