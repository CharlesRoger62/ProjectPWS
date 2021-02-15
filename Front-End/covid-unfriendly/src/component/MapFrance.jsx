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

      var div_tooltip = select("body").append("div")   
      .attr("class", "tooltip")               
      .style("opacity", 0);

      svg.selectAll("path")
         .data(data.features)
         .join("path")
         .attr("class","region")
         .attr("d", feature => pathGenerator(feature))
         .on("click", function(d) {
            console.warn(d.explicitOriginalTarget.__data__.properties.nom)
            
         })
         .on("mouseover", function(d) {
            div_tooltip.transition()        
                .duration(200)
                .style("opacity", .9);      
            div_tooltip.html("Région : " + d.explicitOriginalTarget.__data__.properties.nom)
            var x = d.clientX;
            
            var y = d.clientY;
            div_tooltip.style("top",(y + 20) + 'px');
            div_tooltip.style("left", (x + 20) + 'px');
            console.warn(div_tooltip.style);
        })
        .on("mouseout", function(d) {
            div_tooltip.style("opacity", 0);
            div_tooltip.html("")
                
        });;

   } , [data, dimensions]);


   return (
      <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
         <svg ref={svgRef}></svg>
      </div>
   )

}

export default GeoChart;