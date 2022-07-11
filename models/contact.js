
const mongoose = require("mongoose")
mongoose.connect("mongodb://mongo:27017/contactsdb", {useNewUrlParser:true})
.then(()=> console.log("Db connected..")
).catch(err=>console.log(err));
const Schema = mongoose.Schema;
const {isEmail} = require("validator")

const contactSchema = new Schema({
    name:{
        type:String,
        maxLength:12,
        trim:true,
        required:[true, "Please enter a name"]
    },
    email:{
		unique:true,
		type:String,
        trim:true,
		required:true,
		validate:[isEmail, "Please provide a valid email"]
	},
    phone: {
        unique:true, 
        type: String,
        trim:true,
        match: /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/,
        required: [true, 'User phone number required']
      }
},  {timestamps:true}
)

const csvSchema = new Schema({
    name:{
        type:String,
        required:[true, "Upload csv"]
    }
})
const Contact = mongoose.model("Contact", contactSchema);
const csv = mongoose.model("csv", csvSchema)

module.exports={Contact, csv}