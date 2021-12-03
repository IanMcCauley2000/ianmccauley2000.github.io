var api = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
let ticker;
var apiKey = "&apikey=ZW0CYUY667IBGA7N";
var stocks = [];
var dps = [];
var myChart;

let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

/*This initiates a scrolling ticker from CSS Script library 
https://www.cssscript.com/smooth-marquee-like-scroller-pure-javascript-marquee3000/
Author: http://github.com/ezekielaquino/marquee3000*/

function marqueeData(){
fetch(api + "AAPL" + apiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

    fetch(api + "IBM" + apiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

    fetch(api + "TSLA" + apiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

    fetch(api + "INTC" + apiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

    fetch(api + "PG" + apiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}

//
function appendData(data) {
    stocks.push(data["Time Series (Daily)"][today]["2. high"]);
    if(stocks.length == 5){
        document.getElementById("marquee").innerHTML = " || AAPL: <span>$" + stocks[0].toString() + "</span> || IBM: <span>$" + stocks[1].toString() + "</span> || TSLA: <span>$" + stocks[2].toString() + "</span> || INTC: <span>$" + stocks[3].toString() + "</span> || PG: <span>$" + stocks[4].toString(); +"</span>"
        Marquee3k.init();
    }
}


function getData(){
    ticker = document.getElementById("ticker").value;
    var url = api + ticker + apiKey;

    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        gatherData(data);
    })
    .catch(function(error) {
        console.log(error)
      });
}

function gatherData(data){
    var points = [];
    var labels = [];
    //push 30 most recent availible dates to labels and push the coresponding high value to points
    //https://github.com/sarthakdixit/JavaScript/blob/master/Stock%20Forex%20Data/index.js
    var date = data["Time Series (Daily)"]
      let a = 40;
      let b = 30;
      for(var d in date){
        var r = d.split("-");
        if(a-- > 0){
          var value = date[d];
          dps.unshift({x: new Date(parseInt(r[0]), parseInt(r[1])-1, parseInt(r[2])), y: parseFloat(value["1. open"])});
          if(b-- > 0){
            let c = [d, value["2. high"]];
            points.push(value["2. high"]);
            labels.push(d);
          }
        }else{
          break;
          }
        }
console.log(points);
console.log(labels.reverse());
createGraph(labels,points);
}

    
    

function createGraph(labels,points){
    const DATA = {
        labels: labels,
        datasets: [{
            label: "Daily high for ($)" + ticker,
            backgroundColor     : 'rgb(100, 99, 132,0.6)',
            borderColor         : 'green',
            color               : 'rgb(63, 242, 153)',
            family              : 'Helvetica',
            width               : "100px",
            responsive          : true ,
            pointHitRadius      : 10,
            data                : points.reverse(),
            fill                : true,
            tension             : 0.1
        }]
      };

    const config = {
        type: 'line',
        data: DATA,
        options: {
            maintainAspectRatio : false,
        }
      };

      if (myChart != null) {
      myChart.destroy();}

    document.getElementById("myChart").style.backgroundColor = "white";
    myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
}

