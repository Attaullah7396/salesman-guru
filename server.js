var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var favicon = require("static-favicon");
var cookie = require("cookie-parser");
var session = require("express-session");
var bcrypt = require("bcrypt-nodejs");
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
            res.send('Duplicate Email or UserName....')
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

    salesmanModel.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Email not found");
            res.send("Sorry, This Email is not registered");
        }
        if	(user)	{
            console.log(user);
            if (isValidPassword(user, req.body.pass)){
                res.send(user);
            }
            else{
                console.log("Wrong Password");
                res.send("Wrong Password");
            }
        }

    });

    var isValidPassword = function(user, password){
        var result = bcrypt.compareSync(password, user.pswd);
        if (result) {
            console.log("Password correct");
        } else {
            console.log("Password wrong");
        }
        return result;

    };

/*
    bcrypt.genSalt(10,	function(err,salt)	{
        if(err){
            console.log("Failed");
        }
        bcrypt.hash(req.body.pass,salt,
            function(err,hashedpass){
                if	(err){
                    console.log("Not done");
                }
                req.body.pass = hashedpass;
                console.log("Successfully hashed");
            });
    });*/

/*    res.send("jhgdjgwjg");*/







   /* salesmanModel.findOne({email:req.body.email},function(err,success){
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
    })*/
});

app.post("/checkUname",function(req,res){
    salesmanModel.findOne({uName:req.body.uName},function(err,success){
        if(success){
            res.send("yes");
        }
        else{
            res.send("no");
        }
    })
});

app.post("/checkMail",function(req,res){
    salesmanModel.findOne({email:req.body.email},function(err,success){
        if(success){
            res.send("yes");
        }
        else{
            res.send("no");
        }
    })
});

app.listen(9000,function(){
    console.log("Server started on port 9000")
});














