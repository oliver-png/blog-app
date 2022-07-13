const express = require("express");
const app = express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));



app.get("/", function(req, res){
    res.render("index.ejs", {name: "abcde"});
});


app.listen(3000, function(){
    console.log("Listening on port 3000");
});