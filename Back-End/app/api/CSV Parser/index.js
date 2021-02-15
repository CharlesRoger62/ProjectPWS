const https = require('https');
const { Router } = require('express');

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
        return reject(new Error(`statusCode=${response.statusCode}`));
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

const getDataJour = (res) => {
  const ti_quot_fr = 'https://static.data.gouv.fr/resources/taux-dincidence-de-lepidemie-de-covid-19/20210215-192008/sp-pe-tb-quot-fra-2021-02-15-19h20.csv';
  const tests_quot_fr = 'https://static.data.gouv.fr/resources/donnees-relatives-aux-resultats-des-tests-virologiques-covid-19/20210215-192018/sp-pos-quot-fra-2021-02-15-19h20.csv';
  const indicateurs_quot_fr = 'https://static.data.gouv.fr/resources/indicateurs-de-suivi-de-lepidemie-de-covid-19/20210215-162457/table-indicateurs-open-data-france.csv';
  let dataset1;
  let dataset2;
  let dataset3;
  const finaldataset = [];

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

    res.json(finaldataset);
  });
};

router.get('/', (req, res) => {
  getDataJour(res);
});
module.exports = router;
