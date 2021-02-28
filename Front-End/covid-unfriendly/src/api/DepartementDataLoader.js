const axios = require('axios');

//from https://reactjsexample.com/simple-and-accessible-loading-indicators-with-react/
//import { SpinningCircles, useLoading } from '@agney/react-loading';

export const DepartementDataLoader = (props) => {
    /* // code for beautiful loader
    const Content  = () => {
        const { containerProps, indicatorEl } = useLoading({
          loading: true,
          indicator: <SpinningCircles width="50" />,
        });

        return (
          {// Accessibility props injected to container //}
          <section {...containerProps}>
            {indicatorEl} {// renders only while loading //}
          </section>
        );}*/
  if(props.libelle !== undefined){
    try{
      return axios.get("http://localhost:9428/api/servicedepartements/departement/bylib/" + props.libelle);
    }
    catch(e){
      console.log("error", e);
    };
  }

  if(props.num !== undefined){
    try {
        return axios.get("http://localhost:9428/api/servicedepartements/departement/bynum/" + props.num);
    }catch(e){
      console.log("error",e);
    }
  }

  if(props.all === true && props.all !== undefined){
    try {
        return axios.get("http://localhost:9428/api/servicedepartements/departements")
    }catch(e){
        console.log("error",e);
    }
  }
}

export const DepartementLastDataLoader = async (props) =>{
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


export const DepartementAllDataLoader = async (region_num) =>{
  console.log(region_num);
  if(region_num !== undefined){
      let data = {};
      await axios.get("http://localhost:9428/api/servicedepartements/departements/allDataByRegion/" + region_num)
      .then((res)=>{
          data=res.data;
          console.warn(data);
      });

      return data;
  }
}

export default DepartementDataLoader;
