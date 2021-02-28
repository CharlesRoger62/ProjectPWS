import React, {useRef, useEffect, useState,useMemo} from "react";
import {select, geoPath,geoConicConformal } from "d3";
import france from "../../d3js/region.json"
import {DepartementLastDataLoader} from "../../api/DepartementDataLoader"
import {RegionLastDataLoader} from "../../api/RegionDataLoader"
import RegionEnum from '../../enum/RegionEnum'
import {
   BrowserRouter as Router,
   useLocation,
   useHistory
 } from "react-router-dom";

function GeoChart({localisation}){
   
   const svgRef = useRef();
   const wrapperRef = useRef();
   let history = useHistory();

   const [opacity, setOpacity] = useState(0);
   const [top, setTop] = useState(-500);
   const [left, setLeft] = useState(-500);

   const [textNameTooltip, setTextNameTooltip] = useState("");   
   const [textDataTooltip, setTextDataTooltip] = useState("");



   let styleTooltip = {
        container: {
            opacity: opacity,
            top: top,
            left: left
        }
   }
   

   let location = useLocation();   
   const regionFolder = require.context('../../d3js/RegionsMap',true); 
   let data = location.pathname === '/' ? france : regionFolder(`./${location.state.regionName}.json`); 
   let covidData = null;
   let covidDataDictionnary = null;

   useEffect(() => {
      const svg = select(svgRef.current);

      if(location.pathname === '/'){
         svg.selectAll("g").remove()
      }

      const projection = geoConicConformal()
      .fitSize([400,400],data)

      const pathGenerator = geoPath().projection(projection);

      svg.selectAll("path")
         .data(data.features)
         .join("path")
         .attr("class","region")
         .attr("d", feature => pathGenerator(feature))
         .on("click", function(d) {
            
            if(location.pathname === '/'){
               setOpacity(0);
               setTextNameTooltip("");
               setTextDataTooltip("");
               svg.selectAll("g").remove();
               history.push({
                  pathname: '/regions',
                  state: {regionName : d.target.__data__.properties.nom}
               });
            }
            else if(location.pathname === '/regions'){
               history.push({
                  pathname: '/departements',
                  state: {libelle : d.target.__data__.properties.nom}
               });
            }
            

            
         })
         .on("mouseover", function(d) {
            let region_number = RegionEnum[d.target.__data__.properties.nom];
            if( location.pathname === '/'){
               RegionLastDataLoader(region_number).then( res => {
                  covidData = res.data;
                  //covidDataDictionnary = Object.assign({}, ...covidData.map((x) => ({[x.region_num]: x})));
                  setTextNameTooltip(`Région : ${d.target.__data__.properties.nom}`);

                  if(covidData !== undefined){
                     setTextDataTooltip(`Nombre de cas positifs : ${covidData.nbtest_positif}`);
                  }
               })
            }
            else {
              DepartementLastDataLoader(d.target.__data__.properties.code).then( res => {
                  covidData = res.data;
                  //covidDataDictionnary = Object.assign({}, ...covidData.map((x) => ({[x.departement_num]: x})))
                  setTextNameTooltip(`Département : ${d.target.__data__.properties.nom}`);

                  if(covidData !== undefined && covidData !== null){
                     setTextDataTooltip(`Nombre de cas positifs : ${covidData.nbtest_positif}`);
                  }
              })
            }
            setOpacity(0.9);
            var x = d.clientX;
            var y = d.clientY;
            setLeft(x+20);
            setTop(y+20);
        })
        .on("mouseout", function(d) {
            setOpacity(0);
            setTextNameTooltip("");  
            setTextDataTooltip("");
        });

        if(localisation !== undefined && localisation!== null){
            svg.selectAll("g")
            .data(data.features)
            .enter()
               .append("g")
               .style("fill","red")
               .attr("transform", function(d) { return "translate(" + projection([localisation[1],localisation[0]]) + ")"; })
               .append("circle") 
               .attr("r", 5)
        }
   } , [history,data,location,localisation]);


   return (
      <Router>
         <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef}>
               <g></g>
            </svg>
            <div className="tooltip" style={styleTooltip.container}>{textNameTooltip}<br/>{textDataTooltip}</div>
         </div>
      </Router>
   )

}

export default GeoChart;