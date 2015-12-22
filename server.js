var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var publicDirPath = path.resolve(__dirname, "public");

app.use(express.static(publicDirPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var schema = require("./schema");
var salesmanModel = schema.salesmanModel;
//var imgModel = schema.imgModel;

app.get("/", function (req, res) {
    res.sendFile(publicDirPath + "/index.html");
});


app.post("/signup", function (req, res) {
    console.log("Received request "+ req.body);
    var salesman = new salesmanModel(req.body);
    salesman.save(function (err, success) {
        err ? salesmanModel.find({}, function (err, success) {
            console.log("Hiiiiiii");
                res.end()
        }) /*console.log(err)*/ : console.log("Saved")
    });

});

app.get("/senddata",function(req,res){
    salesmanModel.find({}, function (err, success) {
        if(err){
            console.log("Can't find on /senddata")
        }
        else{
        console.log("Find successfully on /senddata");
        res.send(success)}
    })

});

app.listen(9000,function(){
    console.log("Server started on port 9000")
});














