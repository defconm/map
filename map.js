const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
var dt = new Date()
var year = dt.getFullYear()
var day = dt.getDay()
var month = monthNames[dt.getMonth()]
var folder = '../CSVFiles/DailyCities/'+year+'/'
var todaysFile = folder + year +'-'+ month + '-'+ day + '-cityCount.csv'
var titleForGraph = ''
todaysFile ='2018-Nov-20-cityCount.csv'
createMap(todaysFile);

function createMap(mapFile)
{
  Plotly.d3.csv(mapFile, function(err, rows){
      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }
var cityName = unpack(rows, 'name'),
    stateName = unpack(rows, 'state'),
    cityCount = unpack(rows, 'count'),
    cityLat = unpack(rows, 'lat'),
    cityLon = unpack(rows, 'lon'),
    color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
    citySize = [],
    hoverText = [],
    scale = 80;

for ( var i = 0 ; i < cityCount .length; i++) {
  var currentSize = cityCount [i] / scale;
  var currentText = cityName[i] + "," + stateName[i] + "<br>Flu Tweets: " + cityCount [i];
  citySize.push(currentSize);
  hoverText.push(currentText);
}
titleForGraph = title(mapFile);

  var data = [{
   type: 'scattergeo',
   locationmode: 'USA-states',
   lat: cityLat,
   lon: cityLon,
   text: hoverText,
   hoverinfo: 'text',
   marker: {
     size: citySize,
     line: {
       color: 'black',
       width: 1 
     },
     
   }
}];

var layout = createLayout();

Plotly.newPlot(myDiv, data, layout, {showLink: false});
  });
} 

function startAnimation()
{
    var files = getFiles();
    for(var i = 1; i < files.length+1; i++)
    {
        replotGraph(files[i-1],i);
    }
}

function replotGraph(fileToUse,i)
{
  setTimeout(function(){createMap(fileToUse)},i*5000);
}

function createLayout()
{
  return layout = 
  {
    title: titleForGraph, 
    showlegend: false,
    geo: 
    {
      scope: 'usa',
      projection: 
      {
        type: 'albers usa'
      },
      showland: true,
      landcolor: 'rgb(217, 217, 217)',
      subunitwidth: 1,
      countrywidth: 1,
      subunitcolor: 'rgb(255,255,255)',
      countrycolor: 'rgb(255,255,255)'
    }
  }
}

function title(file)
{
    var parts = file.split('-');
    var year = parts[0];
    var month = parts[1].toUpperCase();
    var day = parts [2];
    return 'Flu Tweets for ' + month +' ' + day + ', ' + year + ' By City';
}

function getFiles()
{
  return ['2018-Nov-21-cityCount.csv','2018-Nov-22-cityCount.csv']
}
