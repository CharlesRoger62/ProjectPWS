const axios = require('axios');

export const FranceCovidDataLoader = async (date) =>{
    let data = {};
    if(date === undefined){
        await axios.get(`http://localhost:9428/api/servicejours/covidData/`)
        .then((res)=>{
            data=res.data;
        });
    }
    else{
        await axios.get(`http://localhost:9428/api/servicejours/covidData/?date=${date}`)
        .then((res)=>{
            data=res.data;
        });
    }        
    return data;
    
}