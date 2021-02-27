const axios = require('axios');

export const RegionLastDataLoader = async (props) =>{
    let data = {};
    await axios.get("http://localhost:9428/api/serviceregions/region/lastdata/"+props)
    .then((res)=>{
        data=res.data;
    });
        
    return data;
}

export const RegionAllDataLoader = async (region_num) =>{
    let data = {};
    await axios.get("http://localhost:9428/api/serviceregions/region/bynum/"+region_num)
    .then((res)=>{
        data=res.data;
    });
    console.warn(data);
    return data;
}

export const RegionCovidDataLoader = async (date, region_num) =>{
    let data = {};
    if(region_num === undefined){
        await axios.get(`http://localhost:9428/api/serviceregions/covidData/?date=${date}`)
        .then((res)=>{
            data=res.data;
            console.warn(data);
        });
    }
    else{
        await axios.get(`http://localhost:9428/api/serviceregions/covidData/?date=${date}&region_num=${region_num}`)
        .then((res)=>{
            data=res.data;
            console.warn(data);
        });
    }        
    return data;
    
}