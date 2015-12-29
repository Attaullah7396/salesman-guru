var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var favicon = require("static-favicon");
var cookie = require("cookie-parser");
var session = require("express-session");
var app = express();
var publicDirPath = path.resolve(__dirname, "public");

app.use(express.static(publicDirPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger("dev"));
app.use(favicon());
app.use(cookie());
app.use(session({
    secret:	"123123",
    resave:	true,
    saveUninitialized:	true
}));

var schema = require("./schema");
var salesmanModel = schema.salesmanModel;
//var imgModel = schema.imgModel;

app.get("/", function (req, res) {
    res.sendFile(publicDirPath + "/index.html");
});


app.post("/user", function (req, res) {
    console.log("Received request "+ req.body);
    var salesman = new salesmanModel(req.body);
    salesman.save(function (err, success) {
        console.log(err);
        if(err){
            res.send('This email is already registered, Choose any other')
        }else{

            res.send(success)
        }
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

app.post("/login",function(req,res){
    console.log("recived login data");
    console.log(req.body.email);
    salesmanModel.findOne({email:req.body.email},function(err,success){
        if(success){
            console.log(success);
            if(success.pswd == req.body.pass){
                console.log("Successfully login");
                console.log(req.cookies);
                console.log(req.session);
                req.session.name = success.uName;
                res.send(success);
            }
            else{
                console.log("Wrong Password");
                res.send("Wrong Password")
            }
        }
        else{
            console.log(err);
            res.send("Sorry, this Email is not registered")

        }
    })
});

app.listen(9000,function(){
    console.log("Server started on port 9000")
});














