'use strict';

const fs = require('fs');

var rawCountyData = fs.readFileSync('./county-data.csv', 'utf8');
rawCountyData = rawCountyData.toString();
let dataArray = [];
const lines = rawCountyData.split("\n");
const headers = lines.shift().split(",");
lines.forEach(line => {
  const cells = line.split(",");
  dataArray.push(
      cells.reduce((acc, cell, i) => ({
        ...acc, [headers[i]]: parseFloat(cell) || cell
      }), {})
  );
});

console.log(JSON.stringify(dataArray));




console.log("\n\n\n-=-=-=-=-=-=-=-=-=--=-= JUDGES DATA BELOW -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n\n");

// Do the same for judges!