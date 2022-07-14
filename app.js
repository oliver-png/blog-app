const express = require("express");
const app = express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));


var entries = []

var newEntry = new Entry("Day 1", "Nisl nisi scelerisque eu ultrices. Elementum curabitur vitae nunc sed velit. Scelerisque fermentum dui faucibus in. Sit amet venenatis urna cursus. In iaculis nunc sed augue lacus. Tincidunt id aliquet risus feugiat in. Volutpat sed cras ornare arcu dui vivamus arcu felis. Mattis pellentesque id nibh tortor id. Ornare arcu odio ut sem nulla pharetra diam. Lacus luctus accumsan tortor posuere ac ut consequat semper.");
entries.push(newEntry);
newEntry = new Entry("This is just a test post", "Congue eu consequat ac felis donec et odio pellentesque. Viverra mauris in aliquam sem fringilla ut morbi. Turpis egestas sed tempus urna et pharetra pharetra massa. Velit scelerisque in dictum non consectetur. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. In iaculis nunc sed augue lacus viverra. Leo duis ut diam quam nulla porttitor massa id. Eget felis eget nunc lobortis mattis. Lobortis feugiat vivamus at augue eget. At imperdiet dui accumsan sit amet nulla. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Suspendisse in est ante in nibh mauris. Proin nibh nisl condimentum id venenatis a condimentum vitae.");
entries.push(newEntry);
entries.push(newEntry);
entries.push(newEntry);

app.get("/", function(req, res){
    res.render("index.ejs", {entries: entries});
});

app.post("/", function(req, res){
    newEntry = new Entry(req.body.title, req.body.content);
    entries.push(newEntry);
    res.redirect("/");
});

app.get("/new", function(req, res){
    res.render("post.ejs");
});


// app.get("/posts/:postname", function(req, res){

// });

app.listen(3000, function(){
    console.log("Listening on port 3000");
});


function Entry(heading, content){
    this.heading = heading;
    this.content = content;
    this.route = heading.replaceAll(" ", "-").toLowerCase();

}