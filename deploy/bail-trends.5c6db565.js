function t(t,e,s,r){Object.defineProperty(t,e,{get:s,set:r,enumerable:!0,configurable:!0})}var e=globalThis,s={},r={},i=e.parcelRequireae46;null==i&&((i=function(t){if(t in s)return s[t].exports;if(t in r){var e=r[t];delete r[t];var i={id:t,exports:{}};return s[t]=i,e.call(i.exports,i,i.exports),i.exports}var a=Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(t,e){r[t]=e},e.parcelRequireae46=i);var a=i.register;a("iZIRD",function(e,s){t(e.exports,"BailRateMap",()=>u),t(e.exports,"RaceMapContainer",()=>p),t(e.exports,"SwitchableMap",()=>f);var r=i("9NlP8");i("f5Hsa");var a=i("9lyWK"),l=i("gnvXE"),o=i("ixxlC"),h=i("ge6e3"),n=i("4UL1w");class c{constructor(t,e,s,i,a,l,o="",h=35){this.labels=e,this.colorThreshold=s,this.averages=i,this.title=o,this.onMouseOver=a,this.onMouseOut=l;let n=Number(getComputedStyle(document.querySelector(`#${t} .color-scale-legend`)).width.replace(/[^\d.]/g,""));this.legendWidth=n-30,this.sectionWidth=this.legendWidth/(e.length-1),this.sectionHeight=10,this.offsetX=10,this.offsetY=h,this.labelOffsetX=this.offsetX-9,this.labelOffsetY=this.offsetY+28;let c=this.sectionHeight+this.labelOffsetY+10;this.svg=r.select(`#${t} .color-scale-legend`).append("svg").attr("viewBox",`0 0 ${n} ${c}`)}highlightBars(t){this.svg.selectAll(".legend-bar").style("opacity","0.2"),this.svg.selectAll(".legend-text").style("opacity","0.4"),t.forEach(t=>{this.svg.selectAll(`.legend-bar[${n.BUCKET_ATTRIBUTE}="${t}"]`).style("opacity","1"),this.svg.selectAll(`.legend-text[${n.BUCKET_ATTRIBUTE}*="${t}"]`).style("opacity","1")})}resetHighlight(){this.svg.selectAll(".legend-bar").style("opacity","1"),this.svg.selectAll(".legend-text").style("opacity","1")}render(){let t=this.svg.selectAll("g").data(this.labels.slice(0,this.labels.length-1)).enter().append("g").attr("data-label",t=>t);t.append("rect").attr("class","legend-bar").attr("x",(t,e)=>this.offsetX+e*this.sectionWidth).attr("y",this.offsetY).attr("width",this.sectionWidth).attr("height",this.sectionHeight).attr(n.BUCKET_ATTRIBUTE,(t,e)=>this.labels[e+1]).style("fill",t=>this.colorThreshold(t)).on("mouseover",t=>this.onMouseOver(t)).on("mouseout",()=>this.onMouseOut());let e="legend-text",s=t=>this.labels[t].toString().length<2?2:0;t.append("text").attr("x",(t,e)=>this.labelOffsetX+e*this.sectionWidth+s(e)).attr("y",this.labelOffsetY).attr("class",e).attr(n.BUCKET_ATTRIBUTE,t=>{let e=this.colorThreshold(t),[s,r]=this.colorThreshold.invertExtent(e);return`${s}-${r}`}).text((t,e)=>0===e?"":(0,h.toPercent)(this.labels[e],0,!1));let r=this.labels[this.labels.length-1];this.averages.forEach(t=>{let s=(0,h.getPercentOffset)(t.value,this.labels[0],r),i=this.offsetX+this.legendWidth*s/100;this.svg.append("line").attr("x1",i).attr("x2",i).attr("y1",this.offsetY+10).attr("y2",this.offsetY-5).attr("class","legend-avg-line"),this.svg.append("text").attr("x",i-13).attr("y",this.offsetY-25).attr("class",e).text(t.label),this.svg.append("text").attr("x",i-15).attr("y",this.offsetY-10).attr("class",e).text((0,h.toPercent)(t.value)),this.svg.append("text").attr("x",this.legendWidth/2-45).attr("y",this.offsetY+45).attr("class",e).text(this.title)})}}class d{constructor(t,e={}){this.svg=r.select(t).append("svg").attr("viewBox",`0 0 ${n.DEFAULT_MAP_WIDTH} ${n.DEFAULT_MAP_HEIGHT}`),this.projection=r.geoMercator().scale(5500).center([-75.75,40.5]),this.renderTooltip=(0,o.configureTooltip)({...e,placement:"top"})}renderCity(t,e,s){this.svg.append("circle").attr("transform",`translate(${this.projection(e)})`).attr("r",4).attr("class","city-label-dot").attr("fill","white"),this.svg.append("text").attr("transform",`translate(${this.projection(s)})`).attr("class","city-label").text(t)}renderCities(){this.renderCity("Philadelphia",[-75.1652,39.9526],[-75.6,40.06]),this.renderCity("Harrisburg",[-76.8867,40.2732],[-77.15,40.375]),this.renderCity("Pittsburgh",[-79.9959,40.4406],[-80.25,40.3])}renderPA(t,e){return this.svg.append("g").attr("class","county").selectAll("path").data(t).enter().append("path").attr("d",e).attr("class","county-path").attr(n.COUNTY_NAME_ATTRIBUTE,t=>t.properties.NAME).on("mouseenter focus",this.onMouseEnter.bind(this)).on("mouseout",this.onMouseOut.bind(this))}onMouseEnter(t){this.showTooltip(t.target,{})}onMouseOut(){this.hideTooltip()}showTooltip(t,e){this.tooltip=this.renderTooltip(t,[e],e.name),this.tooltip.show()}hideTooltip(){this.tooltip&&(this.tooltip.hide(),this.tooltip.destroy())}highlightMap(t){let e=t.getAttribute(n.BUCKET_ATTRIBUTE),s=`${n.BUCKET_ATTRIBUTE}="${e}"`;this.svg.selectAll(`path:not([${s}])`).classed("faded",!0)}resetHighlight(){this.svg.selectAll("path").classed("faded",!1)}render(){let t=r.geoPath().projection(this.projection),e=JSON.parse(JSON.stringify(l.COUNTY_MAP_DATA)),s=(0,a.default)(e,e.objects.pa_counties).features;this.renderPA(s,t)}}class u extends d{constructor(t,e,s,r,i){super(`#${t} .map`,{rows:[{rowHeader:i,dataKey:"x",render:t=>(0,h.toPercent)(t)}]}),this.id=t,this.data=e,this.rateKey=s,this.colorThreshold=(0,h.getColorThreshold)(n.BAIL_RATE_MAP_COLOR_CONFIG.domain,n.BAIL_RATE_MAP_COLOR_CONFIG.colors);let a=t=>{this.highlightBar(t.target),this.highlightMap(t.target)},l=()=>this.resetHighlight();a.bind(this),l.bind(this),this.legend=new c(t,n.BAIL_RATE_MAP_COLOR_CONFIG.domain,this.colorThreshold,[{value:r,label:"Avg"}],a,l),this.render()}onMouseEnter(t){let e=t.target.getAttribute(n.COUNTY_NAME_ATTRIBUTE),s=`${n.COUNTY_NAME_ATTRIBUTE}="${e}"`;super.onMouseEnter(t),this.svg.selectAll(`path:not([${s}])`).classed("faded",!0),this.highlightBar(t.target)}onMouseOut(t){super.onMouseOut(t),this.resetHighlight()}showTooltip(t){let e=t.getAttribute(n.COUNTY_NAME_ATTRIBUTE),s=Number(t.getAttribute("data-rate"));super.showTooltip(t,{name:e,x:s})}highlightBar(t){let e=Number(t.getAttribute(n.BUCKET_ATTRIBUTE));this.legend.highlightBars([e])}resetHighlight(){super.resetHighlight(),this.legend.resetHighlight()}renderPA(t,e){this.data.forEach(e=>{let s=e.name,r=e[this.rateKey],i=t.find(t=>t.properties.NAME===s);i.properties.rate=r,i.properties.color=this.colorThreshold(r),i.properties.bucket=this.colorThreshold.invertExtent(i.properties.color)[1]}),super.renderPA(t,e).style("fill",t=>t.properties.color).attr(n.BUCKET_ATTRIBUTE,t=>t.properties.bucket).attr("data-rate",t=>t.properties.rate),this.legend.render(),this.renderCities()}}class g extends d{constructor(t,e,s,r,i,a){super(t,{rows:[{rowHeader:"Cash Bail Rate, black",dataKey:"black",render:t=>(0,h.toPercent)(t)},{rowHeader:"Cash Bail Rate, white",dataKey:"white",render:t=>(0,h.toPercent)(t)}]}),this.data=e,this.rateKey=s,this.race=i,this.parent=a,this.colorThreshold=r,this.countyNameToBucket={}}_onMouseEnter(t,e){let s=`${n.COUNTY_NAME_ATTRIBUTE}="${t}"`,r=`data-race="${this.race}"`,i=this.svg.select(`path[${s}][${r}]`).node();this.svg.selectAll(`path:not([${s}])`).classed("faded",!0),super.showTooltip(i,e)}_onMouseOut(t){super.onMouseOut(),this.svg.selectAll(`path:not([${n.COUNTY_NAME_ATTRIBUTE}="${t}"])`).classed("faded",!1)}resetHighlight(){super.resetHighlight(),this.svg.selectAll("rect").style("opacity","1"),this.svg.selectAll("text").style("opacity","1")}onMouseEnter(t){this.parent.onChildMouseEnter(t)}onMouseOut(t){this.parent.onChildMouseOut(t)}getBucket(t){return Number(this.countyNameToBucket[t])}createHatchPatterns(t){new Set(t).forEach(t=>{let e=this.svg.append("defs").append("pattern").attr("id",`diagonalHatch${t.replace("#","")}`).attr("patternUnits","userSpaceOnUse").attr("patternTransform","rotate(45 2 2)").attr("width",4).attr("height",4);e.append("rect").attr("x",0).attr("y",0).attr("width",4).attr("height",4).attr("fill","#303030"),e.append("path").attr("d","M -1,2 l 6,0").attr("stroke",`${t}`).attr("stroke-width",1)})}renderPA(t,e){let s=[];this.data.forEach(e=>{let r=e.name,i=e[this.rateKey],a=t.find(t=>t.properties.NAME===r);a.properties.rate=i;let l=this.colorThreshold(i);a.properties.color=e.outlier?`url(#diagonalHatch${l.replace("#","")})`:l,a.properties.bucket=this.colorThreshold.invertExtent(l)[1],this.countyNameToBucket[r]=a.properties.bucket,s.push(l)}),this.createHatchPatterns(s),super.renderPA(t,e).style("fill",t=>t.properties.color).attr(n.BUCKET_ATTRIBUTE,t=>t.properties.bucket).attr("data-rate",t=>t.properties.rate).attr("data-race",()=>this.race),this.renderCities()}}class p{constructor(t,e,s){let r=(0,h.getColorThreshold)(n.BAIL_RATE_RACE_MAP_COLOR_CONFIG.domain,n.BAIL_RATE_RACE_MAP_COLOR_CONFIG.colors);this.black=new g(`#${t} #black.map`,e,"cashBailRateBlack",r,"black",this),this.white=new g(`#${t} #white.map`,e,"cashBailRateWhite",r,"white",this);let i=t=>{this.highlightBarFromLegend(t.target),this.highlightMap(t.target)},a=()=>this.resetHighlight();i.bind(this),a.bind(this),this.legend=new c(t,n.BAIL_RATE_RACE_MAP_COLOR_CONFIG.domain,r,[{value:s.white,label:"White"},{value:s.black,label:"Black"}],i,a),this.render()}getCountyRate(t,e){return Number(document.querySelector(`path[${n.COUNTY_NAME_ATTRIBUTE}="${t}"][data-race="${e}"]`).getAttribute("data-rate"))}onChildMouseEnter(t){let e=t.target.getAttribute(n.COUNTY_NAME_ATTRIBUTE),s={name:e,black:this.getCountyRate(e,"black"),white:this.getCountyRate(e,"white")};this.black._onMouseEnter(e,s),this.white._onMouseEnter(e,s),this.highlightBarFromMap(t.target)}onChildMouseOut(t){let e=t.target.getAttribute(n.COUNTY_NAME_ATTRIBUTE);this.black._onMouseOut(e),this.white._onMouseOut(e),this.resetHighlight()}highlightBarFromLegend(t){let e=t.getAttribute(n.BUCKET_ATTRIBUTE);this.legend.highlightBars([e])}highlightBarFromMap(t){let e=t.getAttribute(n.COUNTY_NAME_ATTRIBUTE),s=[this.black.getBucket(e),this.white.getBucket(e)];this.legend.highlightBars(s)}highlightMap(t){this.black.highlightMap(t),this.white.highlightMap(t)}resetHighlight(){this.black.resetHighlight(),this.white.resetHighlight(),this.legend.resetHighlight()}render(){this.legend.render(),this.black.render(),this.white.render()}}class f{constructor(t,e,s){this.leftMap=t,this.rightMap=e,this.container=s,this.rightSwitch=s.getElementsByClassName("switch-container")[0].getElementsByClassName("right")[0],this.rightSwitch.addEventListener("click",this.showRightTable.bind(this)),this.leftSwitch=s.getElementsByClassName("switch-container")[0].getElementsByClassName("left")[0],this.leftSwitch.addEventListener("click",this.showLeftTable.bind(this)),this.showLeftTable()}showLeftTable(){let t=document.getElementById(this.leftMap.id),e=document.getElementById(this.rightMap.id);t.style.display="block",e.style.display="none",this.leftSwitch.classList.add("showing"),this.rightSwitch.classList.remove("showing")}showRightTable(){let t=document.getElementById(this.leftMap.id),e=document.getElementById(this.rightMap.id);t.style.display="none",e.style.display="block",this.leftSwitch.classList.remove("showing"),this.rightSwitch.classList.add("showing")}}}),a("f5Hsa",function(e,s){t(e.exports,"feature",()=>i("9lyWK").default),i("b0N39"),i("9lyWK"),i("fhE4c"),i("4A9tB"),i("5VqEe"),i("fFj8n"),i("k6zly"),i("2QhEs")}),a("b0N39",function(e,s){t(e.exports,"default",()=>a);var r=i("k6zly");function a(t){var e,s=(0,r.default)(t.transform),i=1/0,a=1/0,l=-1/0,o=-1/0;function h(t){(t=s(t))[0]<i&&(i=t[0]),t[0]>l&&(l=t[0]),t[1]<a&&(a=t[1]),t[1]>o&&(o=t[1])}for(e in t.arcs.forEach(function(t){for(var e,r=-1,h=t.length;++r<h;)(e=s(t[r],r))[0]<i&&(i=e[0]),e[0]>l&&(l=e[0]),e[1]<a&&(a=e[1]),e[1]>o&&(o=e[1])}),t.objects)!function t(e){switch(e.type){case"GeometryCollection":e.geometries.forEach(t);break;case"Point":h(e.coordinates);break;case"MultiPoint":e.coordinates.forEach(h)}}(t.objects[e]);return[i,a,l,o]}}),a("k6zly",function(e,s){t(e.exports,"default",()=>a);var r=i("9nZjx");function a(t){if(null==t)return r.default;var e,s,i=t.scale[0],a=t.scale[1],l=t.translate[0],o=t.translate[1];return function(t,r){r||(e=s=0);var h=2,n=t.length,c=Array(n);for(c[0]=(e+=t[0])*i+l,c[1]=(s+=t[1])*a+o;h<n;)c[h]=t[h],++h;return c}}}),a("9nZjx",function(e,s){t(e.exports,"default",()=>r);function r(t){return t}}),a("9lyWK",function(e,s){t(e.exports,"default",()=>l),t(e.exports,"object",()=>h);var r=i("a90ji"),a=i("k6zly");function l(t,e){return"string"==typeof e&&(e=t.objects[e]),"GeometryCollection"===e.type?{type:"FeatureCollection",features:e.geometries.map(function(e){return o(t,e)})}:o(t,e)}function o(t,e){var s=e.id,r=e.bbox,i=null==e.properties?{}:e.properties,a=h(t,e);return null==s&&null==r?{type:"Feature",properties:i,geometry:a}:null==r?{type:"Feature",id:s,properties:i,geometry:a}:{type:"Feature",id:s,bbox:r,properties:i,geometry:a}}function h(t,e){var s=(0,a.default)(t.transform),i=t.arcs;function l(t){return s(t)}function o(t){for(var e=[],a=0,l=t.length;a<l;++a)!function(t,e){e.length&&e.pop();for(var a=i[t<0?~t:t],l=0,o=a.length;l<o;++l)e.push(s(a[l],l));t<0&&(0,r.default)(e,o)}(t[a],e);return e.length<2&&e.push(e[0]),e}function h(t){for(var e=o(t);e.length<4;)e.push(e[0]);return e}function n(t){return t.map(h)}return function t(e){var s,r=e.type;switch(r){case"GeometryCollection":return{type:r,geometries:e.geometries.map(t)};case"Point":s=l(e.coordinates);break;case"MultiPoint":s=e.coordinates.map(l);break;case"LineString":s=o(e.arcs);break;case"MultiLineString":s=e.arcs.map(o);break;case"Polygon":s=n(e.arcs);break;case"MultiPolygon":s=e.arcs.map(n);break;default:return null}return{type:r,coordinates:s}}(e)}}),a("a90ji",function(e,s){t(e.exports,"default",()=>r);function r(t,e){for(var s,r=t.length,i=r-e;i<--r;)s=t[i],t[i++]=t[r],t[r]=s}}),a("fhE4c",function(t,e){i("9lyWK"),i("cjinv")}),a("cjinv",function(e,s){t(e.exports,"default",()=>r);function r(t,e){var s={},r={},i={},a=[],l=-1;function o(t,e){for(var r in t){var i=t[r];delete e[i.start],delete i.start,delete i.end,i.forEach(function(t){s[t<0?~t:t]=1}),a.push(i)}}return e.forEach(function(s,r){var i,a=t.arcs[s<0?~s:s];!(a.length<3)||a[1][0]||a[1][1]||(i=e[++l],e[l]=s,e[r]=i)}),e.forEach(function(e){var s,a,l,o,h,n=(l=(a=t.arcs[e<0?~e:e])[0],t.transform?(s=[0,0],a.forEach(function(t){s[0]+=t[0],s[1]+=t[1]})):s=a[a.length-1],e<0?[s,l]:[l,s]),c=n[0],d=n[1];if(o=i[c]){if(delete i[o.end],o.push(e),o.end=d,h=r[d]){delete r[h.start];var u=h===o?o:o.concat(h);r[u.start=o.start]=i[u.end=h.end]=u}else r[o.start]=i[o.end]=o}else if(o=r[d]){if(delete r[o.start],o.unshift(e),o.start=c,h=i[c]){delete i[h.end];var g=h===o?o:h.concat(o);r[g.start=h.start]=i[g.end=o.end]=g}else r[o.start]=i[o.end]=o}else r[(o=[e]).start=c]=i[o.end=d]=o}),o(i,r),o(r,i),e.forEach(function(t){s[t<0?~t:t]||a.push([t])}),a}}),a("4A9tB",function(t,e){i("9lyWK"),i("cjinv")}),a("5VqEe",function(t,e){i("8s7Ph")}),a("8s7Ph",function(e,s){t(e.exports,"default",()=>r);function r(t,e){for(var s=0,r=t.length;s<r;){var i=s+r>>>1;t[i]<e?s=i+1:r=i}return s}}),a("fFj8n",function(t,e){i("b0N39"),i("2QhEs")}),a("2QhEs",function(e,s){t(e.exports,"default",()=>a);var r=i("9nZjx");function a(t){if(null==t)return r.default;var e,s,i=t.scale[0],a=t.scale[1],l=t.translate[0],o=t.translate[1];return function(t,r){r||(e=s=0);var h=2,n=t.length,c=Array(n),d=Math.round((t[0]-l)/i),u=Math.round((t[1]-o)/a);for(c[0]=d-e,e=d,c[1]=u-s,s=u;h<n;)c[h]=t[h],++h;return c}}});
//# sourceMappingURL=bail-trends.5c6db565.js.map
