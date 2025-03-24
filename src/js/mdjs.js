import { Table } from "./classes/Table.js";
import { DistributionGraph } from "./classes/Graph.js";
import {MDJ_BAIL_TYPE_DATA, COUNTY_BAIL_TYPE_DATA, BAIL_POSTING_DATA} from "./data.js";
import { toPercent } from "./helpers";
import {COUNTY_DATA, STATE_DATA} from "./raw-data.js";

/* TABLE CREATION FUNCTIONS */
const createMdjTable = (tableContainer, county = "") => {
  const columnConfigs = [
    {
      class: "caret-cell",
      header: {
        text: "",
        unit: ""
      },
      sortable: false,
      searchable: false
    },
    {
      class: "county-name-cell",
      header: {
        text: county !== "" ? "Name" : "",
        unit: ""
      },
      sortable: true,
      searchable: true
    },
    {
      class: "total-cases-cell number-cell",
      header: {
        text: "Total Cases",
        unit: "number"
      },
      sortable: true,
      searchable: false
    },
    {
      class: "total-bail-rate-cell number-cell",
      header: {
        text: "Cash bail rt.",
        unit: "percent"
      },
      sortable: true,
      searchable: false
    },
    {
      class: "viz-cell bail-dist-cell",
      header: {
        text: "Bail Types",
        unit: "number"
      },
      sortable: false,
      searchable: false
    }
  ];
  const initSort = { col: 3, dir: -1 };
  if (county !== "") {
      const countyMdjBailTypeData = MDJ_BAIL_TYPE_DATA.flatMap(row => {
        const countyName = row.data[1];
        if (countyName === county) {
          return row.collapseData;
        } else {
          return [];
        }
      });
    return new Table(countyMdjBailTypeData, columnConfigs, initSort, tableContainer);
  } else {
    return new Table(MDJ_BAIL_TYPE_DATA, columnConfigs, initSort, tableContainer);
  }
};

const createBailRateTable = (el, data) => {
  const columnConfigs = [
    {
      value: 0,
      header: {
        text: "Cash Bail Rate",
        unit: "percent"
      }
    },
    {
      value: 1,
      header: {
        text: "Unsecured Rate",
        unit: "percent"
      }
    },
    {
      value: 2,
      header: {
        text: "ROR Rate",
        unit: "percent"
      }
    },
    {
      value: 3,
      header: {
        text: "Non-Monetary Rate",
        unit: "percent"
      }
    },
    {
      value: 4,
      header: {
        text: "Nominal Rate",
        unit: "percent"
      }
    },
    {
      value: 5,
      header: {
        text: "Denial Rate",
        unit: "percent"
      }
    },
    {
      value: 6,
      header: {
        text: "average bail amount",
        unit: "currency"
      }
    },
    {
      value:7,
      header: {
        text: "cash bail rate, black",
        unit: "percent"
      }
    },
    {
      value: 8,
      header: {
        text: "cash bail rate, white",
        unit: "percent"
      }
    },
    {
      value: 9,
      header: {
        text: "average bail amount, black",
        unit: "percent"
      }
    },
    {
      value: 10,
      header: {
        text: "average bail amount, white",
        unit: "currency"
      }
    },
  ];



  
  /**
   * Transform the table element in the el variable so that the thead
   * has an item for each value in columnConfigs. Not using the table class since it's
   * a bit more powerful and isn't meant to output one record.
   *
   * Add a data element for each header element.
   */
  // Helper to build a table from a slice of columnConfigs
  const buildTable = (container, title, configs) => {
    // Heading that spans 2 columns via class
    const heading = document.createElement("h2");
    heading.className = "bucket-name full-span";
    heading.textContent = title;
    container.appendChild(heading);
  
    // Table setup
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");
    const dataRow = document.createElement("tr");
  
    configs.forEach((config) => {
      const th = document.createElement("th");
      th.textContent = config.header.text;
  
      const td = document.createElement("td");
      const value = data[config.value]['value'];
      const label = config.header.text.toLowerCase();
      let formattedValue;
  
      if (label.includes("amount")) {
        formattedValue = `$${Math.round(value).toLocaleString()}`;
      } else {
        formattedValue = toPercent(value);
      }
  
      td.innerHTML = "<h3 class='stat-tile-label'>" + th.textContent + "</h3>" +
                     "<div class='stat-tile-value'>" + formattedValue + "</div>";
  
      dataRow.appendChild(td);
    });
  
    thead.appendChild(tr);
    tbody.appendChild(dataRow);
    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
  };
  

// Split column configs and render two tables
const firstBucket = columnConfigs.slice(0, 7); // first 7 entries
const secondBucket = columnConfigs.slice(7);   // remaining entries

buildTable(el, "Bail Type Distribution", firstBucket);
buildTable(el, "Cash Bail and Race", secondBucket);





};

/* RENDER PAGE */
const mdjContainer = document.getElementById("mdj-container")
if (mdjContainer !== null) {
  createMdjTable(mdjContainer);
}

const counties = COUNTY_DATA.map(county => county["name"]);
counties.forEach((name) => {
  const tableContainer = document.getElementById(`${name.toLowerCase()}-mdj-container`)
  if (tableContainer !== null) {
    createMdjTable(tableContainer, name)
  }
});

const headerConfig = [
  {
    title: "Cash Bail",
    className: "cash-bar",
    render: (value) => toPercent(value)
  },
  {
    title: "Unsecured",
    className: "unsecured-bar",
    render: (value) => toPercent(value)
  },
  {
    title: "ROR",
    className: "ror-bar",
    render: (value) => toPercent(value)
  },
  {
    title: "Nonmonetary",
    className: "nonmonetary-bar",
    render: (value) => toPercent(value)
  },
  {
    title: "Nominal",
    className: "nominal-bar",
    render: (value) => toPercent(value)
  },
  {
    title: "Denied",
    className: "denied-bar",
    render: (value) => toPercent(value)
  },
];

counties.forEach((name) => {
  const rowContainer = document.getElementById(`${name.toLowerCase()}-dist-row-container`)
  if (rowContainer !== null) {
    const data = COUNTY_BAIL_TYPE_DATA.filter(row => row.data[0] === name);
    new DistributionGraph(rowContainer, data, headerConfig);
  }

  // Adding a new type of table:
  const tableContainer = document.getElementById(`${name.toLowerCase()}-dist-table-container`);
  if(tableContainer !== null) {
    const data = COUNTY_BAIL_TYPE_DATA.filter(row => row.data[0] === name);
    createBailRateTable(tableContainer, data[0]['data'][1]['values']);
  }
});


/*
  Produce county HTML - consider moving to templating engine if modifying HTML frequently
  Parcel supports Pug: https://parceljs.org/languages/pug/
*/
// const html = countyName =>
// `
//       <div class="table-container" id="${countyName.toLowerCase()}-mdj-container">
//         <div class="search-container">
//           <div class="ui fluid multiple search selection dropdown">
//             <input type="hidden" name="county" />
//             <i class="dropdown icon"></i>
//             <div class="default text">Select judges</div>
//             <div class="menu"></div>
//           </div>
//         </div>
//         <table class="mdj-table">
//           <thead></thead>
//           <tbody></tbody>
//         </table>
//         <div class="btn-text view-all-btn"></div>
//       </div>
//       <div id="${countyName.toLowerCase()}-dist-row-container" class="dist-row-container"></div>
// `
// console.log(counties.sort((a, b) => a.localeCompare(b)).map(name => html(name)).join(""))
