const { Contact } = require("../models/contact")
const multer = require("multer");

const getRecords = async (req,res)=>{
    const {page=1, limit=20} = req.query
    const records = await Contact.find()
    .limit(limit*1)
    .skip((page - 1) * limit)
    .exec();
    const count = await Contact.countDocuments()

res.json({
    records,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  });

}


const createRecord = async(req, res)=>{
    try{
    const{name, email, phone} = req.body;
    const record = await Contact.create({
        name,
        email,
        phone
    })
    await record.save()
}catch(err){
    res.json(err)
}
}

const editForm = async(req, res)=>{
    try{
    const record = await Contact.findById(req.params.id)
    if(record){
    const {_id, name, email, phone} = record
    return res.render("edit", {_id, name, email, phone})
    }
    return res.status(404).json({"err":"Could not find record"})
}catch(err){
    res.json({err})
}
}

const editRecord = async(req, res)=>{
    try{
    let recordId = req.params.id
    const record = await Contact.findById(recordId);
    const{name, email, phone} = req.body;
    if(record){
        const updatedRecord = await record.updateOne({
            name,
            email,
            phone
        }, {new:true})
        return res.status(200).send(updatedRecord);
    }
    return res.status(404).json({"err":"Could not find such record"})
}catch(err){
    res.json({err})
}
}

const deleteRecord = async(req, res)=>{
    try{
    const recordId = req.params.id
    const toDelete = await Contact.findById(recordId).select("_id")
    if (toDelete){
        await toDelete.remove();
        return res.json({"message":"Deleted Successfully", "redirect":"/home"})
    }
    return res.status(404).json({"err":"No such record"})
}catch(err){
    res.json({err})
}
}

const retrieveById = async(req, res)=>{
    const retrieved = await Contact.findById(req.params.id).select("name email phone")
    if (retrieved){
        return res.render("record", {name:retrieved.name, email:retrieved.email, phone:retrieved.phone })
    }
    return res.status(404).json({"err":"Could not find record"})
}
const storage = multer.diskStorage({
    //destination for files
    destination: function(request, file, callback){
     callback(null, "../public/uploads")
    },
    filename: function(request, file, callback){
       callback(null, Date.now()+file.originalname)
    }
 
 })

 const filter = (request, file, callback)=>{
    if(file.mimetype.includes("csv")){
        callback(null, true)
    }
    else{
        callback("Upload csv files only", true)
    }
 }
 
 //upload parameters
 const upload = multer({
   storage:storage, fileFilter:filter
 })
 
const fileUpload = (req, res)=>{

}

module.exports={
    getRecords,
    createRecord,
    editForm,
    editRecord,
    deleteRecord,
    retrieveById,
    fileUpload,
}