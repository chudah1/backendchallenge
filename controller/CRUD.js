const { Contact, csv } = require("../models/contact")

const getRecords = async (req,res)=>{
    const {page=1, limit=20} = req.query
    const records = await Contact.find()
    .limit(limit*1)
    .skip((page - 1) * limit).exec();
    const count = await Contact.countDocuments()

res.render("records", {records:records, totalPages: Math.ceil(count / limit), currentPage: page})
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
    res.redirect("/rest/getRecords")
}catch(err){
    res.json(err)
}
}

const editForm = async(req, res)=>{
    try{
    const record = await Contact.findById(req.params.id)
    if(record){
    const {name, email, phone} = record
    return res.render("edit", {id:record._id, name, email, phone})
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
        return res.status(200).json({updatedRecord, "msg":"Successfully edited"});
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
        return res.json({"msg":"Deleted Successfully", "redirect":"/rest/getRecords"})
    }
    return res.status(404).json({"err":"No such record"})
}catch(err){
    res.json({err})
}
}

const retrieveById = async(req, res)=>{
    const retrieved = await Contact.findById(req.params.id)
    if (retrieved){
        return res.render("record", {id:retrieved._id,name:retrieved.name, email:retrieved.email, phone:retrieved.phone })
    }
    return res.status(404).json({"err":"Could not find record"})
}


const fileUpload = async(req, res)=>{
    try{
        if (req.file==undefined) res.status(404).json({"err":"Upload csv file"})
        else {
            const file = await csv.create({
                name:req.file.filename
            })
            await file.save();
            res.json({"msg":"Success"})
        }
    }catch(err){
        console.log(err)
    }

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