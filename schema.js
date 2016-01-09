var mongoose = require("mongoose");
var connection = mongoose.connect("mongodb://localhost/salesman");
//var connection = mongoose.connect("mongodb://admin:admin@ds037145.mongolab.com:37145/myproject");
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
    Token:      {type: String},
    createdAt:	{type:Date,default:Date.now}
});

var	noop	=	function()	{};

salesmanSchema.pre("save",	function(done)	{
    var	user = this;
    if	(!user.isModified("pswd"))	{
        return	done();
    }
    bcrypt.genSalt(SALT_FACTOR,	function(err,	salt)	{
        if(err){
            return	done(err);
        }
        bcrypt.hash(user.pswd,	salt,	noop,
            function(err,hashedpswd){
            if	(err){
                return	done(err);
            }
            user.pswd = hashedpswd;
            done();
        });
    });
});

salesmanSchema.methods.checkPassword = function(guess,	done)	{
    bcrypt.compare(guess,this.pass,	function(err,	isMatch)	{
        console.log(guess+" one");
        console.log(this.pass+" two")
    });
};







/*var imgSchema = new mongoose.Schema({
 data: Buffer,
 contentType: String
 });*/

exports.salesmanModel = mongoose.model("salesman", salesmanSchema);