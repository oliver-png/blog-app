const express = require("express");
const mongoose = require('mongoose');
const app = express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = mongoose.Schema({
    heading: String,
    content: String
});

const Post = mongoose.model("Post", postSchema);

const defaultPost1 = new Post({
    heading: "Day 1",
    content: "Nisl nisi scelerisque eu ultrices. Elementum curabitur vitae nunc sed velit. Scelerisque fermentum dui faucibus in. Sit amet venenatis urna cursus. In iaculis nunc sed augue lacus. Tincidunt id aliquet risus feugiat in. Volutpat sed cras ornare arcu dui vivamus arcu felis. Mattis pellentesque id nibh tortor id. Ornare arcu odio ut sem nulla pharetra diam. Lacus luctus accumsan tortor posuere ac ut consequat semper."
});

const defaultPost2 = new Post({
    heading: "This is a post",
    content: "Congue eu consequat ac felis donec et odio pellentesque. Viverra mauris in aliquam sem fringilla ut morbi. Turpis egestas sed tempus urna et pharetra pharetra massa. Velit scelerisque in dictum non consectetur. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. In iaculis nunc sed augue lacus viverra. Leo duis ut diam quam nulla porttitor massa id. Eget felis eget nunc lobortis mattis. Lobortis feugiat vivamus at augue eget. At imperdiet dui accumsan sit amet nulla. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Suspendisse in est ante in nibh mauris. Proin nibh nisl condimentum id venenatis a condimentum vitae."
});

var defaultPosts = [defaultPost1, defaultPost2];

app.get("/", function(req, res){
    
    Post.find({}, function(err, results){
        if (results.length === 0){
            Post.insertMany(defaultPosts, function(error){
                if (error){
                    console.log(error);
                } else{
                    console.log("Successfully inserted default posts.");
                }
            });
            res.redirect("/");
        } else {
            res.render("index.ejs", {entries: results});
        }
    });

});

app.post("/", function(req, res){
    const post = new Post({
        heading: req.body.title,
        content: req.body.content
    });

    post.save();

    res.redirect("/");
});

app.get("/new", function(req, res){
    res.render("newpost.ejs");
});

app.get("/posts/:postname", function(req, res){

    Post.find({}, function(err, results){
        results.forEach(function(result){
            if (result.heading.replaceAll(" ", "-").toLowerCase() === req.params.postname){
                return res.render("individualpost.ejs", {heading: result.heading, content: result.content});
            }
        });
    });

});

app.get("/about", function(req, res){
    res.render("about.ejs");
});

app.get("/contact", function(req, res){
    res.render("contact.ejs");
});

app.listen(3000, function(){
    console.log("Listening on port 3000");
});