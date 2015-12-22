var mongoose = require("mongoose");
var connection = mongoose.connect("mongodb://localhost/salesman");

var salesmanSchema = new mongoose.Schema({
    fName:      {type: String, required: true},
    lName:      {type: String, required: true},
    uName:      {type: String, required: true},
    occupation: {type: String, required: true},
    email:      {type: String, required: true},
    pswd:       {type: String, required: true}
});

/*var imgSchema = new mongoose.Schema({
 data: Buffer,
 contentType: String
 });*/

exports.salesmanModel = mongoose.model("salesman", salesmanSchema);