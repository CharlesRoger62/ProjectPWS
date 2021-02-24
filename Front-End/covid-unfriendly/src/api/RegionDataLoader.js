const axios = require('axios');

export const RegionLastDataLoader = async () =>{
    let data = {};
    await axios.get("http://localhost:9428/api/serviceregions/region/lastdata/")
    .then((res)=>{
        data=res.data;
        console.warn(data);
    });
        
    return data;
    
}