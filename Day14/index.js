const express=require('express');
const app = express();
const bodyParser=require('body-parser');
const multer=require('multer');
const path=require('path');
 const MongoClient=require('mongodb').MongoClient;
 const url="mongodb://0.0.0.0:27017/company";
 const client=new MongoClient(url);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
client.connect(url).then(()=>
{
    console.log("Connected");
})
const DB=client.db("company");
const adder=DB.collection("fileupload");

const multerStorage=multer.diskStorage({
    destination: (req,file,cb)=>
    {   
        console.log(req,"req")
        console.log(file,"file")
        console.log(cb,"cb")
        if(path.extname(file.originalname) === '.pdf')
        {
          
                cb(null,"data")
           
        }
        else
        {
            cb(new Error("This is a not a pdf file"),false)   
        }
      
    },
    filename: (req,file,cb)=>
    {
        cb(null,`${Date.now()}.${file.originalname}`)
    }
});



const upload = multer({storage:multerStorage,limits:{fileSize :1000*1024}}).single("myfile")



app.post('/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        adder.insertOne({files:req.file}).then(()=>{
            console.log("inserted successfully")
            res.send("file uploaded")
        })
    });});

const mongoose = require('mongoose');
const routes=require('./src/routes/app');

mongoose.connect('mongodb://0.0.0.0:27017/company',{useNewUrlParser:true})

    const db=mongoose.connection;
    db.on('open',()=>
    { 
        console.log("dataentered")
    })
app.use('/',routes)
app.listen(8000,(req,res)=>
{
    console.log('updated')
})