const noteController=require("../controller/noteController");
const express = require("express");
const router=express.Router();
 
router.get("/find/:noteId",noteController.find);

module.exports=router;