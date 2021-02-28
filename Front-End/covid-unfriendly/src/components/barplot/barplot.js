import React, {useRef, useEffect, useState} from 'react';
import * as d3 from 'd3';
import {select} from "d3";
import region_name_by_number from "./RegionNameByNumberEnum" ;
export const BarPlot = (props) => {

    const ref = React.useRef();
    const svg = select(ref.current);
    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 40, left: 90},
        width = 580 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const [opacity, setOpacity] = useState(0);
    const [top, setTop] = useState(-500);
    const [left, setLeft] = useState(-500);
    const [render, setRender] = useState(false);
    const [textTooltip, setTextTooltip] = useState("");
    let styleTooltip = {
        container: {
            opacity: opacity,
            top: top,
            left: left
        }
    }



    useEffect(() => {

        if( props.data.length > 0) {
            const data = props.data;
            data.sort( (a,b) => {
                return a[props.select] < b[props.select];
            })
            console.table(data);

            // append the svg object to the body of the page
            svg.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)

            svg.selectAll("*").remove();
            // Initialize the X axis
            let x = d3.scaleLinear()
            .range([1, width])

            let xAxis = svg.append("g")
                .attr("transform", "translate(0," + height + ")")


            // Initialize the Y axis
            let y = d3.scaleBand()
                .range([ height, 0])

            let yAxis = svg.append("g")
                .attr('width', 200)
                .attr("class", "myYaxis")


            // Update the X axis
            x.domain([0, d3.max(data, (d) => { return d[props.select]; })])
            xAxis.transition().duration(1000).call(d3.axisBottom(x))

            // text label for the x axis
            svg.append("text")
                .transition().duration(1000)
                .attr("transform",
                    "translate(" + (width/2) + " ," +
                    (height + margin.top + 20) + ")")
                .style("text-anchor", "middle")
                .text(props.select);


            // Update the Y axis
            y.domain(data.map((d) => { return d.region_num; }))
                .padding(.1)
            yAxis.transition().duration(1000).call(d3.axisLeft(y));

            // text label for the y axis
            svg.append("text")
                .transition().duration(1000)
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Régions");



            // Create the u variable
            const u = svg.selectAll("myRect")
                .data(data)

            u
                .enter()
                .append("rect") // Add a new rect for each new elements
                .on("mouseover", d => {
                    setOpacity(0.9);
                    setTextTooltip(region_name_by_number[d.target.__data__.region_num]);
                    setLeft(d.clientX);
                    setTop(d.clientY );
                })
                .on("mouseout", (d) => {
                    setOpacity(0);
                    setTextTooltip("");
                })
                .merge(u) // get the already existing elements as well
                .transition() // and apply changes to all of them
                .duration(1000)
                .attr("x", x(0))
                .attr("y", (d) => { return y(d.region_num); })
                .attr("width", (d) => { return x(d[props.select]); })
                .attr("height", y.bandwidth())
                .attr("fill", "#69b3a2");


            const t = svg.selectAll('valueRect')
                .data(data)
            t
                .enter()
                .append("text")
                .on("mouseover", d => {
                    setOpacity(0.9);
                    setTextTooltip(region_name_by_number[d.target.__data__.region_num]);
                    setLeft(d.clientX);
                    setTop(d.clientY );
                })
                .on("mouseout", (d) => {
                    setOpacity(0);
                    setTextTooltip("");
                })
                .merge(t)
                .transition() // and apply changes to all of them
                .duration(1000)
                .attr("x", (d) => { if(x(d[props.select] > 20)){
                    return x(d[props.select]);}
                else {
                    return x(d[props.select]);}
                })
                .attr("y", (d) => { return y(d.region_num) + y.bandwidth()/2; } )
                .attr("dy", ".35em")
                .text((d) => { return d[props.select]; });

            // If less group in the new dataset, I delete the ones not in use anymore
            u.exit().remove();
            t.exit().remove();


            /*
             const update = svg.selectAll("g").data(data);
            // add a g for every extra
            const enter = update.enter().append("g");
            // give them a rect and text element:
            enter.append("rect");
            enter.append("text");


            // merge update and enter:
            const bars = update.merge(enter);

            // modify the rects
            bars
                .select("rect")
                .attr("x", (d, i) => i * (width / data.length))
                .attr("y", d => height - d[props.select] * 5)
                .attr("width", width / data.length - 2)
                .attr("height", d => d[props.select] * 5)
                .attr("fill","#69b3a2");


            // modify the texts:
            bars
                .select("text")
                .text(d => d[props.select])
                .attr("text-anchor", "middle")
                .attr(
                    "x",
                    (d, i) =>
                        i * (width / data.length - 2) +
                        (width / data.length) / 2
                )
                .attr("y", d => height - d[props.select] * 5 + 12)
                .style("font-family", "sans-serif")
                .style("font-size", 12)
                .style("fill", "#ffffff");

            // only needed if the # of elements can decrease
            update.exit().remove(); */
            /*

               let x = d3.scaleLinear()
                   .domain([0, d3.max(data, (d) => { return d[props.select]; })])
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
                   .text(props.select);


               // Y axis
               let y = d3.scaleBand()
                   .range([ 0, height ])
                   .domain(data.map((d) => { return d.region_num; }))
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

               update.exit().remove();

   /*
               //Bars

               svg.selectAll("myRect")
                   .data(data)
                   .enter()
                   .append("rect")
                   .attr("x", x(0) )
                   .attr("y", (d) => { return y(d.region_num); })
                   .attr("width", (d) => { return x(d[props.select]); })
                   .attr("height", y.bandwidth() )
                   .attr("fill", "#69b3a2");
               svg.selectAll('valueRect')
                   .data(data)
                   .enter()
                   .append("text")
                   .attr("x", (d) => { if(x(d[props.select] > 20)){
                       return x(d[props.select]);}
                   else {
                       return x(d[props.select]);}
                   })
                   .attr("y", (d) => { return y(d.region_num) + y.bandwidth()/2; } )
                   .attr("dy", ".35em")
                   .text((d) => { return d[props.select]; });

    */
        }

    },[props.data, props.select])

    useEffect(() => {
        console.log(props.select)
        console.table(props.data)

    }, [props.select])


    return (
        <div>
            <svg  ref={ref} />
            <div className="tooltip" style={styleTooltip.container}>{textTooltip}</div>
        </div>
    );

};
