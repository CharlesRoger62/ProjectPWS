import React, {useRef, useEffect, useState} from "react";
import {select, geoPath, geoMercator,geoConicConformal } from "d3";
import france from "../../d3js/region.json"
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   useLocation,
   useHistory
 } from "react-router-dom";

function GeoChart(){
   const svgRef = useRef();
   const wrapperRef = useRef();
   let history = useHistory();

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

   let location = useLocation();
   let data = null
   if(location.pathname === '/'){
      data = france
   }
   else{
      const regionFolder = require.context('../../d3js/RegionsMap',true);
      data = regionFolder('./'+location.state.regionName+'.json');
   }

   useEffect(() => {

      const svg = select(svgRef.current);
      const projection = geoConicConformal()
      .fitSize([500,500],data)

      const pathGenerator = geoPath().projection(projection);

      svg.selectAll("path")
         .data(data.features)
         .join("path")
         .attr("class","region")
         .attr("d", feature => pathGenerator(feature))
         .on("click", function(d) {

            if(location.pathname === '/'){
               setOpacity(0);
               setTextTooltip("");

               history.push({
                  pathname: '/regions',
                  state: {regionName : d.target.__data__.properties.nom}
                  });
            }
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
   } , [history,data,location]);


   return (
      <Router>
         <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef}></svg>
            <div className="tooltip" style={styleTooltip.container}>{textTooltip}</div>
         </div>
      </Router>
   )

}

export default GeoChart;
