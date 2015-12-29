var mongoose = require("mongoose");
/*var connection = mongoose.connect("mongodb://localhost/salesman");*/
var connection = mongoose.connect("mongodb://admin:admin@ds037145.mongolab.com:37145/myproject");
//var uniqueValidator = require("mongoose-unique-validator");
var	bcrypt	=	require("bcrypt-nodejs");
var	SALT_FACTOR	=	10;

var salesmanSchema = new mongoose.Schema({
    fName:      {type: String, required: true},
    lName:      {type: String, required: true},
    uName:      {type: String, required: true,unique:true},
    occupation: {type: String, required: true},
    email:      {type: String, required: true, unique:true},
    pswd:       {type: String, required: true},
    createdAt:	{type:Date,default:Date.now}
});

/*var imgSchema = new mongoose.Schema({
 data: Buffer,
 contentType: String
 });*/

exports.salesmanModel = mongoose.model("salesman", salesmanSchema);