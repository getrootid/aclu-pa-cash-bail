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

var rawJudgesData = fs.readFileSync('./judges.tsv', 'utf8');
rawJudgesData = rawJudgesData.toString();
let judgesObject = {};
const linesJudges = rawJudgesData.split("\r\n");
const headersJudges = linesJudges.shift().split("\t");
linesJudges.forEach(line => {
  const cells = line.split("\t");

  // If the county doesn't exist in the array, add it
  if (!judgesObject[ cells[1] ]) {
    judgesObject[ cells[1] ] = [];
  }

  judgesObject[cells[1]].push(
      cells.reduce((acc, cell, i) => ({
        ...acc, [headersJudges[i]]: parseFloat(cell) || cell
      }), {})
  );

});

console.log(JSON.stringify(judgesObject));