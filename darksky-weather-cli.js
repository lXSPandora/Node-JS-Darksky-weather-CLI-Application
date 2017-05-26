var fetch = require('node-fetch');
var yargs = require('yargs')
.usage('Usage: --city=[city-name] --country=[country-name]')
.demandOption(['city','country'])
.help('h')
.alias('h', 'help')
.argv;

var city = yargs.city;
var country = yargs.country;

var placeAddress = 'http://maps.google.com/maps/api/geocode/json?address=' + city + ',' + country + '&sensor=false' //

fetch(placeAddress)
.then(function(res) {
    return res.text();
}).then(function(body){
    var lugar = JSON.parse(body);
    var endereco = lugar.results[0].formatted_address;
    var latitude = lugar.results[0].geometry.location.lat;
    var longitude = lugar.results[0].geometry.location.lng;
    var weatherAPI = 'https://api.darksky.net/forecast/6f6e790aad7b7834cf0088833099b12f/'+latitude+','+longitude
    fetch(weatherAPI)
    .then(function(res) {
      return res.text();
    }).then(function(body) {
      var tempoJSON = JSON.parse(body);
      var temperatura = (tempoJSON.currently.temperature - 32)/1.8;
      var umidade = tempoJSON.currently.humidity;
      console.log('Place: ' + endereco);
      console.log('Temperature: ' + Math.ceil(temperatura));
      console.log('Humidity: ' + umidade);
    });
});
