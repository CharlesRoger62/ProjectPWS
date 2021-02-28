/* eslint-disable linebreak-style */
const Region = require('../models/Region.model');

exports.findCovidData = async (region) => {
  try {
    let tx_inc = 0.0
    let tx_pos = 0.0
    let tx_an = 0.0
    region.forEach(element => {
        tx_an += element.tx_an;
        tx_pos += element.tx_pos;
        tx_inc += element.tx_inc;
    });
    tx_inc /= region.length 
    tx_pos /= region.length 
    tx_an /= region.length 

    let tab = {
                "tx_an": tx_an,
                "tx_inc": tx_inc,
                "tx_pos": tx_pos
            }
    return tab;

  } catch (e) {
    throw Error(`Some error occurred while retrieving All Departements : ${e.message}`);
  }
};


