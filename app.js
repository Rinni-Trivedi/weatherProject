const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const appKey = "83f3c014b8686f15a20d87276e5488f7";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+appKey+"&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const location = weatherData.name;
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temprature in " + location + " is "+ temp +" degrees celcius.</h1>");
            res.write("<p> The weather is currently " +weatherDescription +"</p>");
            res.write("<img src=" + imageURL +">");
            res.send();
        })
    })
});
app.listen(3000, function(){
    console.log("Server is running on port 3000");
})


