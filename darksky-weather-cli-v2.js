import 'isomorphic-fetch';
import yargs from 'yargs';
​
async function main() {
 const argv = yargs
  .usage('Usage: --city=[city-name] --country=[country-name]')
  .demandOption(['city','country'])
  .help('h')
  .alias('h', 'help')
  .argv;
​
 const {
  city,
  country,
 } = argv;

 const placeAddress = `http://maps.google.com/maps/api/geocode/json?address=${city},${country}&sensor=false`;

 const resp = await fetch(placeAddress);
 const body = await resp.json();
​
 const endereco = body.results[0].formatted_address;
 const latitude = body.results[0].geometry.location.lat;
 const longitude = body.results[0].geometry.location.lng;
 const weatherAPI = `https://api.darksky.net/forecast/6f6e790aad7b7834cf0088833099b12f/${latitude},${longitude}`;

 const respWeather = await fetch(weatherAPI);
 const weather = respWeather.json();
​
 var temperatura = (weather.currently.temperature - 32)/1.8;
 var umidade = weather.currently.humidity;
 console.log('Place: ' + endereco);
 console.log('Temperature: ' + Math.ceil(temperatura));
 console.log('Humidity: ' + umidade);
}
