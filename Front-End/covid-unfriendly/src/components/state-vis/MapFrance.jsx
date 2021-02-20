import React, {useRef, useEffect, useState} from "react";
import {select, geoPath, geoMercator,geoConicConformal } from "d3";
import useResizeObserver from "./useResizeObserver.js";

import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   useLocation,
   useHistory
 } from "react-router-dom";



function GeoChart({data}){
   const svgRef = useRef();
   const wrapperRef = useRef();
   const dimensions = useResizeObserver(wrapperRef);
   let history = useHistory();
   const [coordinates, setCoordinates] = useState();
   const [wantLocation, setWantLocation] = useState(false);

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

   const geo = () => {
      if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition((position) => {
            setCoordinates([position.coords.latitude, position.coords.longitude]);
         });
         //setWantLocation(true)
         
      } else {
         alert("La géolocalisation n'est pas supportée par le navigateur")
      }
   }

   useEffect(() => {

      const svg = select(svgRef.current);
      console.warn(svg)
      const projection = geoConicConformal()
      //.center([2.454071, 46.279229])
      .fitSize([500,500],data)
      //.scale(2600)
      //.translate([500 / 2, 500 / 2]);

      const pathGenerator = geoPath().projection(projection);

      svg.selectAll("path")
         .data(data.features)
         .join("path")
         .attr("class","region")
         .attr("d", feature => pathGenerator(feature))
         .on("click", function(d) {
            console.warn(d.target.__data__.properties.nom)
            setOpacity(0);
            setTextTooltip("");

            history.push({
               pathname: '/regions',
               state: {regionName : d.target.__data__.properties.nom}
               });
         })
         .on("mouseover", function(d) {
            setOpacity(0.9);
            setTextTooltip("Région : " + d.target.__data__.properties.nom);
            var x = d.clientX;
            var y = d.clientY;
            setLeft(x+20);
            setTop(y+20);
        })
        .on("mouseout", function(d) {
            setOpacity(0);
            setTextTooltip("");
                
        });

        if(wantLocation){
         svg.append("g")
         .selectAll("g")
         .enter()
            .append("g")
            .style("fill","red")
            .attr("transform", function(d) { return "translate(" + projection(coordinates) + ")"; })
            .append("circle") 
            .attr("r", 50)
        }

   } , [data, dimensions,wantLocation,coordinates,history]);


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

//<button class="location" onClick={geo()}>Localisez-moi</button>