const axios = require('axios');

export const DepartementDataLoader = async (props) =>{
    if(props.libelle !== undefined){
        let data = {};
        await axios.get("http://localhost:9428/api/servicedepartements/departement/bylib/" + props.lib)
        .then((res)=>{
            data=res.data;
        });
        return data;
    }

    if(props.num !== undefined){
        let data = {};
        await axios.get("http://localhost:9428/api/servicedepartements/departement/bynum/" + props.num)
        .then((res)=>{
            data=res.data;
        });
        return data;
    }

    if(props.all === true && props.all !== undefined){
        let data = {};
        await axios.get("http://localhost:9428/api/servicedepartements/departements")
        .then((res)=>{
            data=res.data;
        });
        return data;
    }
}

export const DepartementLastDataLoader = async (props) =>{
    console.warn("=====>"+props)
    if(props !== undefined){
        let data = {};
        await axios.get("http://localhost:9428/api/servicedepartements/departement/lastdata/" + props)
        .then((res)=>{
            data=res.data;
            console.warn(data);
        });
        
        return data;
    }
}