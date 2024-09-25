var e=globalThis,a={},t={},r=e.parcelRequireae46;null==r&&((r=function(e){if(e in a)return a[e].exports;if(e in t){var r=t[e];delete t[e];var n={id:e,exports:{}};return a[e]=n,r.call(n.exports,n,n.exports),n.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,a){t[e]=a},e.parcelRequireae46=r),r.register;var n=r("9NlP8"),l=r("ge6e3"),s=r("9nP1d"),o=r("iZIRD"),c=r("fzFsw"),i=r("gnvXE"),A=r("8WpX6");const m=(()=>{let e=[{class:"county-name-cell",header:{text:"",unit:""},sortable:!1,searchable:!0},{class:"viz-cell",header:{start:0,end:.6,averages:[{name:"Avg.",value:i.STATE_DATA.cash_bail_pct}],unit:"percent",showDiff:!1},sortable:!1,searchable:!1},{class:"bail-rate-cell number-cell",header:{text:"Cash Rate",unit:"percent"},sortable:!0,searchable:!1},{class:"bail-cases-cell number-cell",header:{text:"Cash Cases",unit:"number"},sortable:!0,searchable:!1},{class:"total-cases-cell number-cell",header:{text:"Total",unit:"number"},sortable:!0,searchable:!1}],a=["Pennsylvania",{type:"bar",values:[i.STATE_DATA.cash_bail_pct]},i.STATE_DATA.cash_bail_pct,i.STATE_DATA.cash_bail_cases,i.STATE_DATA.total_cases],t=document.getElementById("bail-rate-container");return new s.Table(A.BAIL_RATE_DATA,e,{col:2,dir:-1},t,a,!1)})(),T=(()=>{let e=[{class:"county-name-cell",header:{text:"",unit:""},sortable:!1,searchable:!0},{class:"viz-cell",header:{start:0,end:.75,averages:[{name:"Avg.",value:i.STATE_DATA.ror_pct}],unit:"percent",showDiff:!1},sortable:!1,searchable:!1},{class:"ror-rate-cell number-cell",header:{text:"ROR Rate",unit:"percent"},sortable:!0,searchable:!1},{class:"ror-cases-cell number-cell",header:{text:"ROR Cases",unit:"number"},sortable:!0,searchable:!1},{class:"total-cases-cell number-cell",header:{text:"Total",unit:"number"},sortable:!0,searchable:!1}],a=["Pennsylvania",{type:"bar",values:[i.STATE_DATA.ror_pct]},i.STATE_DATA.ror_pct,i.STATE_DATA.ror_cases,i.STATE_DATA.total_cases],t=document.getElementById("ror-rate-container");return new s.Table(A.ROR_RATE_DATA,e,{col:2,dir:-1},t,a,!1)})(),b=document.getElementById("rate-table-container");new s.SwitchableTable(m,T,b),(()=>{let e=["Pennsylvania",i.STATE_DATA.avg_bail_amount,i.STATE_DATA.non_posting_rate,i.STATE_DATA.total_cases],a=document.getElementById("bail-posting-container");return new s.Table(A.BAIL_POSTING_DATA,[{class:"county-name-cell",header:{text:"",unit:""},sortable:!1,searchable:!0},{class:"bail-amount-cell number-cell",header:{text:"Bail Set",unit:"dollars"},sortable:!0,searchable:!1},{class:"nonposting-rate-cell number-cell",header:{text:"Non-Posting Rt.",unit:"percent"},sortable:!0,searchable:!1},{class:"total-cases-cell number-cell",header:{text:"Total Cases",unit:"number"},sortable:!0,searchable:!1}],{col:2,dir:-1},a,e)})();const u=new o.BailRateMap("cash-bail-rate",A.BAIL_RATE_MAP_DATA,"cashBailRate",i.STATE_DATA.cash_bail_pct,"Cash Bail Rate"),d=new o.BailRateMap("ror-rate",A.BAIL_RATE_MAP_DATA,"rorRate",i.STATE_DATA.ror_pct,"ROR Rate"),_=document.getElementById("rate-chloropleth-container");new o.SwitchableMap(u,d,_),(()=>{let e=n.scaleSqrt().domain([100,25e3]).range([4,35]),a=n.scaleSqrt().domain([100,25e3]).range([4,21]),t=(0,i.COUNTY_DATA).reduce((e,a)=>({...e,[a.name]:{showName:!1,x:a.cash_bail_pct,r:a.cash_bail_cases,y:a.avg_bail_amount}}),{});t["State Average"]={showLines:!0,tooltipConfig:{rows:[{rowHeader:"Cash Bail Rate",dataKey:"x",render:e=>(0,l.toPercent)(e)},{rowHeader:"Average Bail Amount",dataKey:"y",render:e=>(0,l.toMoney)(e,0,!0,!1)}]},x:i.STATE_DATA.cash_bail_pct,y:i.STATE_DATA.avg_bail_amount};let r=document.getElementById("cases-scatter-plot");return new c.ScatterPlot(t,{name:"Cash Bail Rate",min:.2,max:.6,numTicks:4,convert:e=>(0,l.toPercent)(e,0)},{name:"Bail Amount",min:0,max:9e4,numTicks:9,convert:e=>(0,l.toMoney)(e,0)},{desktop:e,mobile:a},{rows:[{rowHeader:"Cash Bail Rate",dataKey:"x",render:e=>(0,l.toPercent)(e)},{rowHeader:"Average Bail Amount",dataKey:"y",render:e=>(0,l.toMoney)(e,0,!0,!1)},{rowHeader:"Total Cases",dataKey:"r",render:e=>(0,l.toNumberString)(e,{minimumFractionDigits:0,maximumFractionDigits:0})}]},r)})(),(()=>{let e=(0,i.COUNTY_DATA).map(e=>({name:e.name,x:e.avg_bail_amount,y:e.non_posting_rate,highlighted:e.non_posting_rate>.5})),a=document.getElementById("avg-bail-graph-container");return new c.CountyBarChart(e,{name:"AVERAGE BAIL AMOUNT",min:1e4,max:8e4,numTicks:7,convert:e=>(0,l.toMoney)(e,0)},{rows:[{rowHeader:"Average bail amount",dataKey:"x",render:e=>(0,l.toMoney)(e)},{rowHeader:"Non-posting rate",dataKey:"y",render:e=>(0,l.toPercent)(e)}],placement:"top",followCursor:!0},a)})();const h=[{title:"Cash Bail",className:"cash-bar",render:e=>(0,l.toPercent)(e)},{title:"Unsecured",className:"unsecured-bar",render:e=>(0,l.toPercent)(e)},{title:"ROR",className:"ror-bar",render:e=>(0,l.toPercent)(e)},{title:"Nonmonetary",className:"nonmonetary-bar",render:e=>(0,l.toPercent)(e)},{title:"Nominal",className:"nominal-bar",render:e=>(0,l.toPercent)(e)}];new c.DistributionGraph(document.getElementById("dist-graph-container"),A.COUNTY_BAIL_TYPE_DATA,h);
//# sourceMappingURL=bail-trends.6e2d08de.js.map
