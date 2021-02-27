const https = require('https');
const { Router } = require('express');
const { Jour, Region, Departement} = require('../../models');

const router = new Router();

const parseCsv = (url, separator) => {
  let data = '';
  let dataArray = [];
  let columns = [];
  const dataJSON = [];
  return new Promise((resolve, reject) => {
    const request = https.request(url, (response) => {
      // reject on bad status
      if (response.statusCode < 200 || response.statusCode >= 300) {
        return reject(new Error(`statusCode=${response.statusCode}, url: ${url}`));
      }

      response.on('data', (d) => {
        data += d;
      });
      response.on('end', () => {
        dataArray = data.split('\n');
        columns = dataArray[0].split(separator);
        dataArray.shift();
        dataArray.forEach((e) => {
          let row = {};
          const array = e.split(separator);
          for (let i = 0; i < columns.length; i++) {
            const col = columns[i];
            const el = array[i];
            const obj = { [col]: el };
            row = Object.assign(row, obj);
          }
          dataJSON.push(row);
        });
        resolve(dataJSON);
        // console.log(dataJSON);
      });
    });

    request.on('error', (error) => {
      // console.error(error);
      reject(error);
    });

    request.end();
  });
};

const getDataJour = () => {
  const ti_quot_fr = 'https://static.data.gouv.fr/resources/taux-dincidence-de-lepidemie-de-covid-19/20210215-192008/sp-pe-tb-quot-fra-2021-02-15-19h20.csv';
  const tests_quot_fr = 'https://static.data.gouv.fr/resources/donnees-relatives-aux-resultats-des-tests-virologiques-covid-19/20210215-192018/sp-pos-quot-fra-2021-02-15-19h20.csv';
  const indicateurs_quot_fr = 'https://static.data.gouv.fr/resources/indicateurs-de-suivi-de-lepidemie-de-covid-19/20210216-162526/table-indicateurs-open-data-france.csv';
  let dataset1;
  let dataset2;
  let dataset3;
  const finaldataset = [];
  return new Promise((resolve, reject) => {
    parseCsv(ti_quot_fr, ';').then((v) => {
      dataset1 = v;
      return parseCsv(tests_quot_fr, ';');
    }).then((v2) => {
      dataset2 = v2;
      for (let i = 0; i < dataset1.length; i++) {
        const row = { ...dataset1[i], ...dataset2[i] };
        finaldataset.push(row);
      }
      return parseCsv(indicateurs_quot_fr, ',');
    }).then((v) => {
      dataset3 = v;
      dataset3.forEach((e) => {
        Object.keys(e).forEach((key) => {
          if (key === '"extract_date"') {
            Object.defineProperty(e, 'jour', // modify old key
              // fetch description from object
              Object.getOwnPropertyDescriptor(e, '"extract_date"'));
            delete e['"extract_date"'];
            e.jour = e.jour.substr(1, e.jour.length - 2);
          } else {
            Object.defineProperty(e, key.substr(1, key.length - 2), // modify old key
              // fetch description from object
              Object.getOwnPropertyDescriptor(e, key));
            delete e[key];
          }
        });
      });

      finaldataset.forEach((value) => {
        const tmpDate = value.jour;
        const found = dataset3.find((element) => element.jour === tmpDate);
        Object.assign(value, found);
      });
      resolve(finaldataset);
    });
  });
};

const getDataRegion = () => {
  const ti_quot_reg = 'https://static.data.gouv.fr/resources/taux-dincidence-de-lepidemie-de-covid-19/20210215-192011/sp-pe-tb-quot-reg-2021-02-15-19h20.csv';
  const test_quot_reg = 'https://static.data.gouv.fr/resources/donnees-relatives-aux-resultats-des-tests-virologiques-covid-19/20210215-192008/sp-pos-quot-reg-2021-02-15-19h20.csv';
  let dataset1;
  let dataset2;
  const finaldataset = [];
  return new Promise((resolve, reject) => {
    parseCsv(ti_quot_reg, ';').then((v) => {
      dataset1 = v;
      // console.table(dataset1.slice(dataset1.length - 4, dataset1.length - 1));
      return parseCsv(test_quot_reg, ';');
    }).then((v) => {
      dataset2 = v;
      // console.table(dataset2.slice(dataset2.length - 4,dataset2.length - 1));
      for (let i = 0; i < dataset1.length; i++) {
        const row = { ...dataset1[i], ...dataset2[i] };
        finaldataset.push(row);
      }
      // console.table(finaldataset.slice(finaldataset.length - 4, finaldataset.length - 1));
      resolve(finaldataset);
    });
  });
};

const getDataDepartement = () => {
  const pos_quot_dep = 'https://static.data.gouv.fr/resources/donnees-relatives-aux-resultats-des-tests-virologiques-covid-19/20210217-192003/sp-pos-quot-dep-2021-02-17-19h20.csv';
  const indic_quot_dep = 'https://static.data.gouv.fr/resources/indicateurs-de-suivi-de-lepidemie-de-covid-19/20210217-162548/table-indicateurs-open-data-dep-serie.csv'
  let dataset1;
  let dataset2;
  const finaldataset = [];
  return new Promise((resolve, reject) => {
    parseCsv(pos_quot_dep, ';').then((v) => {
      //dataset1 = v;
      // console.table(v.slice(v.length - 4, v.length - 1));
      dataset1 = v.filter(elem =>{
        return elem['cl_age90'] === '0';
      });
      // console.table(dataset1.slice(dataset1.length - 4, dataset1.length - 1));
      return parseCsv(indic_quot_dep, ',');
    }).then((v) => {
      dataset2 = v;
      // console.table(dataset2.slice(dataset2.length - 4, dataset2.length - 1));
      dataset2.forEach((value) => {
        const tmp = dataset1.find((elem) => {
          return elem.jour == value['"extract_date"'].substr(1, value['"extract_date"'].length - 2) && elem.dep == value['"departement"'].substr(1, value['"departement"'].length - 2);
        });
        // console.log(value);
        // console.log(tmp);
        const row = {};
        if( tmp !== undefined){
          // console.log(tmp)

          row.region_num = value['"region"'];
          row.departement_num = tmp.dep;
          row.departement_libelle = value['"libelle_dep"'];
          row.jour = tmp.jour;
          row.pop_ref = tmp['pop'];
          row.nbtest = tmp['T'];
          row.nbtest_positif = tmp['P'];
          row.tx_inc = value['"tx_incid"'];
          row.tx_pos = value['"tx_pos"'];
          const analytique = (100000 * tmp['T']) / Math.round(tmp['pop']);
          row.tx_an = analytique;
          // console.log(row);
        }
        if(Object.keys(row).length > 0) {
          finaldataset.push(row);
        }
      })
      resolve(finaldataset);
    });
  });
};

router.get('/', async (req, res) => {
  /*
  getDataRegion().then(async (value) => {
    for (const tmp of value) {
      const region = {};
      region.jour = tmp.jour;
      region.region_num = tmp.reg;
      region.pop_ref = tmp['pop'];
      region.pop_h = tmp.pop_h;
      region.pop_f = tmp.pop_f;
      region.nbtest = tmp['T'];
      region.nbtest_h = tmp['T_h'];
      region.nbtest_f = tmp['T_f'];
      region.nbtest_positif = tmp['P'];
      region.nbtest_positif_h = tmp['P_h'];
      region.nbtest_positif_f = tmp['P_f'];
      region.classe_age = tmp['cl_age90'];
      // (100000 * nombre de cas positif) / Population
      if (region.nbtest_positif !== -1 && region['pop_ref'] !== -1) {
        const ti = (100000 * region.nbtest_positif) / Math.round(region['pop_ref']);
        region.tx_inc = ti;
      }

      if (region.nbtest == 0) {
        region.tx_pos = 0;
      } else {
        const txpos = region.nbtest_positif / Math.round(region.nbtest);
        region.tx_pos = txpos;
      }

      // (100000*nombre de test réalisés)/ Population
      if (region.nbtest !== -1 && region['pop_ref'] !== -1) {
        const analytique = (100000 * region.nbtest) / Math.round(region['pop_ref']);
        region.tx_an = analytique;
      }
      const regionModel = new Region(region);
      await regionModel.save((err) => {
        if (err) {
          console.log('Ooops, something gone wrong');
          console.log(err.message);
          console.log(regionModel);
        } else {
          console.log('Data has been saved! ');
        }
      });
    }

    res.status(201).json('done');
  });
  getDataJour().then(async (value) => {
     for (const tmp of value) {
       const jour = {};
       jour.date = tmp.jour;
       jour.pop_ref = tmp['pop'];
       jour.pop_h = tmp.pop_h;
       jour.pop_f = tmp.pop_f;
       jour.nbtest = tmp['T'];
       jour.nbtest_h = tmp['T_h'];
       jour.nbtest_f = tmp['T_f'];
       jour.nbtest_positif = tmp['P'];
       jour.nbtest_positif_h = tmp['P_h'];
       jour.nbtest_positif_f = tmp['P_f'];
       jour.classe_age = tmp['cl_age90'];
       jour.tx_inc = tmp['tx_incid'];
       if (tmp['tx_pos'] !== 'NA'){
         jour.tx_pos = tmp['tx_pos'];
       }
       // (100000*nombre de test réalisés)/ Population
       if (jour.nbtest !== -1 && jour['pop_ref'] !== -1) {
         const analytique = (100000 * jour.nbtest) / Math.round(jour['pop_ref']);
         jour.tx_an = analytique;
       }
       const testModel = new Jour(jour);
       await testModel.save((err) => {
         if (err) {
           console.log('Ooops, something gone wrong');
           console.log(err.message);
           console.log(testModel);
         } else {
           console.log('Data has been saved! ');
         }
       });
     }
     res.status(201).json('done');
   });
   */
  /*
    getDataDepartement().then(async(value) => {
      console.log(value.length)
      // console.table(value.slice(value.length - 4, value.length - 1)      /*for (const tmp of value) {
        tmp.departement_libelle = tmp.departement_libelle.substr(1, tmp.departement_libelle.length - 2)
        const DepModel = new Departement(tmp);
        await DepModel.save((err) => {
          if (err) {
            console.log('Ooops, something gone wrong');
            console.log(err.message);
            console.log(DepModel);
          } else {
            // console.log('Data has been saved! ');
          }
        });
      }

    }); */
    res.json('done');
});
module.exports = router;
