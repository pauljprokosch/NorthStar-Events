
//_______________________________MATERIALIZE_________________________________________
$(document).ready(function() {
// Initializes drop-down menus
  $('select').material_select();
});


//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _Weather API_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

var weatherKey = "c18a468eed25695d40abc56ea6271f74";
var minneapolisId = "5037649";
var maplewoodId = "5036588";
var saintPaulId = "5048033";
var minnetonkaId = "5037784";

var weatherURL = "https://api.openweathermap.org/data/2.5/group?id="+minneapolisId+","+maplewoodId+","+saintPaulId+","+minnetonkaId+"&units=imperial"+"&APPID="+weatherKey;

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

      weather[i] = "Weather in "+cityNames[i]+ " is: "+typesWeather[i]+", Current Temperature: "+currentTemps[i]+"˚F";
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


// ----------------------- Firebase -------------------



// ------------------------- 


var categoryInput;
//Categories: Sports&Fitness, Music, Performances&VisualArts, Food&Drink
// var categoryIds = [108,103,105,110];

var categoryIds = ["rolling-stones","ACDC","Jason-Aldean","Country-Music"];

var personalToken = "JXgsdlgA2dPyvcQI1zn5NuF92Q3otOE2";

$("#category-links").on("click", ".category-btn", function() {
    //redefine our search parameters and reset the queryURL;
    //ajax
    var cardNumber = $(this).attr("id");
    console.log(cardNumber);
    if (cardNumber == "card1") {
        categoryInput = categoryIds[0];
    }
    else if (cardNumber == "card2") {
        categoryInput = categoryIds[1];
    }
    else if (cardNumber == "card3") {
        categoryInput = categoryIds[2];
    }
    else if (cardNumber == "card4") {
        categoryInput = categoryIds[3];
    }
    // var queryURL2 = "https://wwww.eventbriteapi.com/v3/events/search/?categories="+categoryInput+"&token="+personalToken;
    

    var queryURL2 = "https://app.ticketmaster.com/discovery/v1/events.json?keyword="+categoryInput+"&size=2&apikey="+personalToken;
    console.log(queryURL2);



    $.ajax({
       url: queryURL2,
       method: "GET"
   }).done(function(result) {
       $("#searchResults").empty();
       console.log(result);
       //make grid for search results
       var row1 = $("<div>", {
           class: "row"
       });
       var row2 = $("<div>", {
           class: "row"
       });
       for (i=0; i<10; i++) {
            var link = result._embedded.events[0]._embedded.attractions[0].url;
            var linkImg = result._embedded.events[0]._embedded.attractions[0].image.url;
           var column = $("<div>", {
                class: "col m2"
            });
           var searchResult = $("<div>", {
               height: "200px",
               width: "200px",
               id: result[i]
               
           });
           var resultImg = $("<img>", {
               height: "150px",
               width: "150px",
               src: "https://s1.ticketm.net/tm/en-us"+ linkImg,
               //need to position img
              class: "links",
              fabulous: "https://www.ticketmaster.com"+ link
           });
           var resultLbl = $("<div>", {
               height: "50px",
               width: "200px",
               text: result._embedded.events[0].name,
               //need result text
               //need to position text
           });          
           searchResult.append(resultImg);
           searchResult.append(resultLbl);

           column.append(searchResult);
           if (i<5) {
               row1.append(column);
           }
           else {
               row2.append(column);
           }
       }
       var searchResults = $("#searchResults");
       searchResults.append(row1);
       searchResults.append(row2);

       console.log(result._embedded.events[0].name);
   });
});

var lastViewed = $("#last-viewed");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD3Wuyfo6dZXQCtOyWc6PR08dXG1reGRIo",
    authDomain: "northstar-events-umn.firebaseapp.com",
    databaseURL: "https://northstar-events-umn.firebaseio.com",
    projectId: "northstar-events-umn",
    storageBucket: "",
    messagingSenderId: "666089950491"
};

// Assign the reference to the database to a variable named 'database'
//var database = ...
firebase.initializeApp(config);
var database = firebase.database();

$("#searchResults").on("click", ".links", function(){
  console.log(1);
  var returnResult = $(this).attr("fabulous");
  window.open(returnResult, "_blank");

database.ref().set({
    lastViewedLink: returnResult

});

});

lastViewed.on("click", function() {
    window.open(lastViewed.text(), "_blank");

});
$(document).ready(function() {
  database.ref().on("value", function(snapshot) {
    lastViewed.text("Last viewed link: "+snapshot.val().lastViewedLink)
  });
});

// $("#submit-button").on("click", function() {
//   console.log("submit clicked");
//   var keyWord = $("#input_text").val();
//   var queryURL = "https://app.ticketmaster.com/discovery/v1/events.json?keyword="+keyWord+"&size=2&apikey="+personalToken;
//   $.ajax({
//        url: queryURL,
//        method: "GET"
//    }).done(function(result) {
//        $("#searchResults").empty();
//        console.log(result);
//        //make grid for search results
//        var row1 = $("<div>", {
//            class: "row"
//        });
//        var row2 = $("<div>", {
//            class: "row"
//        });
//        for (i=0; i<10; i++) {
//             var link = result._embedded.events[0]._embedded.attractions[0].url;
//             var linkImg = result._embedded.events[0]._embedded.attractions[0].image.url;
//            var column = $("<div>", {
//                 class: "col m2"
//             });
//            var searchResult = $("<div>", {
//                height: "200px",
//                width: "200px",
//                id: result[i]
               
//            });
//            var resultImg = $("<img>", {
//                height: "150px",
//                width: "150px",
//                src: "https://s1.ticketm.net/tm/en-us"+ linkImg,
//                //need to position img
//               class: "links",
//               fabulous: "https://www.ticketmaster.com"+ link
//            });
//            var resultLbl = $("<div>", {
//                height: "50px",
//                width: "200px",
//                text: result._embedded.events[0].name,
//                //need result text
//                //need to position text
//            });          
//            searchResult.append(resultImg);
//            searchResult.append(resultLbl);

//            column.append(searchResult);
//            if (i<5) {
//                row1.append(column);
//            }
//            else {
//                row2.append(column);
//            }
//        }
//        var searchResults = $("#searchResults");
//        searchResults.append(row1);
//        searchResults.append(row2);

//        console.log(result._embedded.events[0].name);
//    });
// });





















