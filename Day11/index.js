const express = require('express');
const app = express();
const sessions=require('express-session');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const multer=require('multer');
const path=require('path');
const { error } = require('console');
 const MongoClient=require('mongodb').MongoClient;
 const url="mongodb://0.0.0.0:27017/company";
const client=new MongoClient(url);


//2)using multer store the file by checking  the type of file .If the file type is image then upload 
//the file in image folder otherwise upload 
//it in files folder.Your image file type should be only png.Save all the files in mongodb
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({express:true}))
const multerStorage=multer.diskStorage({
    destination: (req,file,cb)=>
    {
    
        if(path.extname(file.originalname)==='.png')
        {
        
        cb(null,"data")
        }
        else if((path.extname(file.originalname)==='.jpg')||((path.extname(file.originalname)==='.jpeg')))
        {
            cb(new Error("file format is not valid"),false)
        }
        
        else{
            cb(null,"files")
        }
    },
    filename: (req,file,cb)=>
    {
        cb(null,`${Date.now()}.${file.originalname}`)
    }
});
app.set('view engine', 'ejs');
 app.set('views', __dirname);
app.get('/data',(req,res)=>{
    res.render('show')
})
client.connect(url).then(()=>
{
    console.log("Connected");

})
const DB=client.db("company");
const adder=DB.collection("crud");
const uploads=multer({storage:multerStorage})
app.post("/upload",uploads.single("myfile"),(req,res)=>{
    adder.insertOne({name:req.file})
    console.log(req.file)
    res.send("file uploaded")
})


 app.use(sessions({
    secret:'thisisverygood',
    saveUninitialized: true,
    resave: false
 }))
 //1)count the number of times a user visits a web page.Do this using session

var session, count=0,data;

app.get('/', (req, res) =>{
    session=req.session;
    session.userid=++count
     res.send("count="+session.userid )
})
app.listen(5000,()=>
{
    console.log("listening on")
})