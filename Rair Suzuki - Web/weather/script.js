var city = document.getElementById("city");
var disp = document.getElementById("wheather-js");
var infos;
var city_aux;
var infoArray;
var d = new Date();


function enter() {
    if (event.key === "Enter"){
        if (city.value.trim() !== "") {
            search();
        }
    }
}

function search() {
    validate();
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+ city_aux +"&appid=40863f691978e364e2659ddcaf04ab7a&lang=pt_br&units=metric", true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status == 200){
            document.getElementById("p").style.display = "none";
            disp.style.display = "flex";
            infos = ajax.responseText;
            infoArray = JSON.parse(infos);
            document.getElementById("city-name").innerText = infoArray.name + ",";
            document.getElementById("country").innerText = infoArray.sys.country;
            document.getElementById("date").innerText = d.toDateString() + ",";
            document.getElementById("hours").innerText = d.getHours() + " hora(s)";
            document.getElementById("temperature").innerText = (infoArray.main.temp).toFixed(1) + " °C";
            document.getElementById("feels-temperature").innerText ="Sensação térmica: " + (infoArray.main.feels_like).toFixed(1) + "°C";
            document.getElementById("wheather-desc").innerText = (infoArray.weather[0].description)[0].toUpperCase() + (infoArray.weather[0].description).substr(1);
            document.getElementById("humidity").innerText = "Humidade: " + infoArray.main.humidity + "%";
            document.getElementById("wind").innerText = "Vento: " + infoArray.wind.speed + " m/s";
            document.getElementById("clouds-prct").innerText ="Nuvens: " + infoArray.clouds.all + "%";
            document.getElementById("img-icon").src = "http://openweathermap.org/img/wn/"+ infoArray.weather[0].icon +"@2x.png";
        }else if (ajax.readyState === 4 && ajax.status != 200){
            disp.style.display = "none";
            document.getElementById("p").style.display = "block";
            document.getElementById("p").innerText ="A cidade " +"'"+ city_aux.split("%20").join(" ") +"'" + " não foi encontrado(a).";
        }
    };
    ajax.send();
}

function validate() {
    if (city.value === ""){
        alert("Voce deve digitar uma cidade.")
    } else if (city.value.indexOf(" ") === -1){
        city_aux = city.value;
    }else {
        city_aux = city.value.split(" ").join("%20");
        city_aux = city_aux.replace("%20%20", "%20");
    }
}