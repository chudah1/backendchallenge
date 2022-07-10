const { editForm, deleteRecord, 
    retrieveById, editRecord, 
    getRecords, fileUpload, createRecord } = require("../controller/CRUD");

const router = require("express").Router();

router.get("/getRecords", getRecords)
router.get("/contact/:id", retrieveById)
router.post("/createRecord", createRecord)
router.post("/editRecord/:id", editRecord)
router.get("/editForm/:id", editForm)
router.delete("/deleteRecord/:id", deleteRecord)
router.post("/uploadcsv", fileUpload)


module.exports=router;