
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/contactsdb", {useNewUrlParser:true})
.then(()=> console.log("Db connected..")
).catch(err=>console.log(err));
const Schema = mongoose.Schema;
const {isEmail} = require("validator")

const contactSchema = new Schema({
    name:{
        type:String,
        minLength:[6, "Few characters"],
        maxLength:12,
        required:[true, "Please enter a name"]
    },
    email:{
		unique:true,
		type:String,
		required:true,
		validate:[isEmail, "Please provide a valid email"]
	},
    phone: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        required: [true, 'User phone number required']
      }
},  {timestamps:true}
)

const Contact = mongoose.model("Contact", contactSchema);

module.exports={Contact}