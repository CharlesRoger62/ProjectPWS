import React, {useRef, useEffect, useState} from 'react';
import * as d3 from 'd3';
import {select} from "d3";

export const BarPlot = () => {

    const ref = React.useRef();

    useEffect(() => {
        const svg = select(ref.current);
        // set the dimensions and margins of the graph
         const margin = {top: 20, right: 30, bottom: 40, left: 90},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        svg.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        const url = 'http://localhost:9428/api/regions/classe0'

        d3.json(url).then( v => {
            const data = v.slice(0,6);
            data.sort( (a,b) => {
                return a.nbtest < b.nbtest;
            })
            console.table(data);
            let x = d3.scaleLinear()
                .domain([0, d3.max(data, (d) => { return d.nbtest; })])
                .range([ 0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            // text label for the x axis
            svg.append("text")
                .attr("transform",
                    "translate(" + (width/2) + " ," +
                    (height + margin.top + 20) + ")")
                .style("text-anchor", "middle")
                .text("Cas");


            // Y axis
            let y = d3.scaleBand()
                .range([ 0, height ])
                .domain(data.map((d) => { return d.region_num; }))
                .padding(.1);
            svg.append("g")
                .call(d3.axisLeft(y))


            //Bars

            svg.selectAll("myRect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", x(0) )
                .attr("y", (d) => { return y(d.region_num); })
                .attr("width", (d) => { return x(d.nbtest); })
                .attr("height", y.bandwidth() )
                .attr("fill", "#69b3a2");
            svg.selectAll('valueRect')
                .data(data)
                .enter()
                .append("text")
                .attr("x", (d) => { if(x(d.nbtest > 20)){
                    return x(d.nbtest);}
                else {
                    return x(d.nbtest);}
                })
                .attr("y", (d) => { return y(d.region_num) + y.bandwidth()/2; } )
                .attr("dy", ".35em")
                .text((d) => { return d.nbtest; });


        })



        //sort data
        /*
        data.sort( (a,b) => {
            return a.cas < b.cas;
        })


        // Add X axis
        let x = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => { return d.cas; })])
            .range([ 0, width]);

        // Get the data
        d3.json(data, (error, data) => {

            let bar = svg.selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * height + ")"; });

            bar.append("rect")
                .attr("width", function(d) { return x(d.cas); })
                .attr("height", height - 1);

            bar.append("text")
                .attr("x", function(d) { return x(d.cas) - 3; })
                .attr("y", height / 2)
                .attr("dy", ".35em")
                .text(function(d) { return d.cas; });
        }); */

        /*

        // Add X axis
        let x = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => { return d.cas; })])
            .range([ 0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
        // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width/2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Cas");

        // Y axis
        let y = d3.scaleBand()
            .range([ 0, height ])
            .domain(data.map((d) => { return d.Region; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))


        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Régions");

        //Bars
        svg.selectAll("myRect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0) )
            .attr("y", (d) => { return y(d.Region); })
            .attr("width", (d) => { return x(d.cas); })
            .attr("height", y.bandwidth() )
            .attr("fill", "#69b3a2")

         */




    })

    return (
        <div>
            <p>BARPLOT</p>
            <svg ref={ref} />
        </div>
    );

};

