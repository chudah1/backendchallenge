const { editForm, deleteRecord, retrieveById, editRecord, getRecords, fileUpload, createRecord } = require("../controller/CRUD");
const router = require("express").Router();
const multer = require("multer");


router.get("/getRecords", getRecords)
router.get("/contact/:id", retrieveById)
router.get("/createRecord", (req,res)=>res.render("create"))
router.post("/createRecord", createRecord)
router.post("/editRecord/:id", editRecord)
router.get("/editForm/:id", editForm)
router.delete("/deleteRecord/:id", deleteRecord)
router.get("/uploadcsv", (req, res)=>res.render("upload"))



const storage = multer.diskStorage({
    //destination for files
    destination: function(request, file, callback){
     callback(null, "./public/uploads")
    },
    filename: function(request, file, callback){
       callback(null, Date.now()+file.originalname)
    }
 })
 const filter = (request, file, callback)=>{
    if(file.mimetype.includes("csv")) callback(null, true)
    else callback("Upload csv files only", true)
 }
 //upload parameters
 const upload = multer({
   storage:storage, fileFilter:filter
 })

router.post("/uploadcsv",upload.single("csv"), fileUpload)


module.exports=router;