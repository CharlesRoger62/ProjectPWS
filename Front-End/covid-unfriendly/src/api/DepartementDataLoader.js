const axios = require('axios');

const DepartementDataLoader = async (props) =>{
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

export default DepartementDataLoader;