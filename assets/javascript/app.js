
//_______________________________MATERIALIZE_________________________________________
$(document).ready(function() {
// Initializes drop-down menus
	$('select').material_select();
// Initializes date menu
    	$('.datepicker').pickadate({
        	selectMonths: true, // Creates a dropdown to control month
        	selectYears: 15, // Creates a dropdown of 15 years to control year,
        	today: 'Today',
        	clear: 'Clear',
        	close: 'Ok',
        	closeOnSelect: false // Close upon selecting a date,
    	});
  });


//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _Weather API_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

var weatherKey = "c18a468eed25695d40abc56ea6271f74";
var minneapolisId = "5037649";
var maplewoodId = "5036588";
var saintPaulId = "5048033";
var minnetonkaId = "5037784";

var weatherURL = "http://api.openweathermap.org/data/2.5/group?id="+minneapolisId+","+maplewoodId+","+saintPaulId+","+minnetonkaId+"&units=imperial"+"&APPID="+weatherKey;

var weatherBox = $("#weather-box");

$(document).ready(function() {
	//ajax
	$.ajax({
        url: weatherURL,
        method: "GET"
    }).done(function(result) {
        $("#weather-box").empty();
        console.log(result);
        console.log(result.list[0]);

        var weather1;
		var weather2;
		var weather3;
		var weather4;

		var weather = [weather1, weather2, weather3, weather4];
		var currentTemps = [];
		var cityNames = [];
		var typesWeather = [];

		for (i=0; i<result.list.length; i++) {
			var currentTemp = result.list[i].main.temp;
			currentTemps.push(currentTemp);
			var cityName = result.list[i].name;
			cityNames.push(cityName);
			var typeWeather = result.list[i].weather[0].description;
			typesWeather.push(typeWeather);

			console.log("current temp is "+currentTemp);
			console.log("city is "+cityName);
			console.log("weather is like "+typeWeather);

			weather[i] = "Weather in "+cityNames[i]+ " is: "+typesWeather[i]+" Current Temperature: "+currentTemps[i]+"˚F";
			var test = weather[i];
			console.log(test);
		}
		var minneapolisWeather = $("<div>", {
			text: weather[0]
		});
		var maplewoodWeather = $("<div>", {
			text: weather[1]
		});
		var saintPaulWeather = $("<div>", {
			text: weather[2]
		});
		var minnetonkaWeather = $("<div>", {
			text: weather[3]
		});

		weatherBox.append(minneapolisWeather, maplewoodWeather, saintPaulWeather, minnetonkaWeather); 
    });
});


























