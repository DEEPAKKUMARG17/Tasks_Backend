const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const url='mongodb://0.0.0.0:27017/company'
const Client= new MongoClient(url);

const path= require('path');
const { Console } = require('console');
const app = express();
const ObjectId=require('mongodb').ObjectId;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname+'/src/public/','views'));
 Client.connect(url).then(()=>
 {
    console.log('connected')
 })
 const DB=Client.db("company");
 const adder=DB.collection('blog')
 const update=DB.collection('uservalidation');
 const finder=DB.collection('comments');
 const multer=require('multer');
const multerStorage=multer.diskStorage({
    destination: (req,file,cb)=>
    {   
        
         cb(null,"images")
      
    },
    filename: (req,file,cb)=>
    {
        cb(null,`${Date.now()}.${file.originalname}`)
    }
});
const upload = multer({storage:multerStorage}).single("myfile")

app.post('/upload',function(req,res){
    upload(req,res,function(err) {
       var title=req.body.addtitle;
       var content=req.body.addcontent;
       var img=req.file.path;
        adder.insertOne({title,content,img}).then(()=>{
            console.log("inserted successfully")
            res.redirect("/");
        })
    });});

app.post('/deletecontent',(req,res)=>{
    adder.find({}).toArray().then((data)=>
    {
        res.render('deletefiles',{data:data})
    })
    
})
app.post('/editblog',(req,res)=>{
    var edittitle=req.body.editer;
    var id=req.body.yellow;
    res.render('edituser',{element:edittitle})
    // adder.updateOne({title:edittitle},{$set:{}})
})
app.post('/editcontent',(req,res)=>{
    adder.find({}).toArray().then((data)=>
    {
        res.render('editfiles',{data:data})
    })
    
})
app.post('/updatechanges',(req,res)=>{
    var userchange=req.body.changeval;
    var  title=req.body.changedtitle;
    var content=req.body.changecontent;
    console.log(userchange,title)
    adder.updateOne({title:userchange},{$set:{title,content}}).then(()=>{
        console.log('update');
        res.redirect('/')
    })
    finder.updateMany({title:userchange},{$set:{title}}).then(()=>
    {
        console.log('updated comments')
    })


})
 app.post('/remove',(req,res)=>{
    var id=req.body.delete;
  const obj_id=new  ObjectId(id);
  var title=req.body.deltitle;
  console.log(title)
  finder.deleteMany({title}).then(()=>
  {
    console.log('deleted comment')
  })
  adder.deleteOne({_id:obj_id}).then((pot)=>
    {
     
        console.log("deleted")
        res.redirect(`/data`)
     })
 })
 app.get('/add',(req,res)=>{
        const add=[{title:"Joey Mcnaly",content:"the warrior is deepak kumat",comment:"",img:"https://www.hostinger.in/tutorials/wp-content/uploads/sites/2/2021/12/joe-mcnally-website-homepage.png"},{title:"Adam Pears",content:"the warrior is deepak kumat",comment:"",img:"https://www.hostinger.in/tutorials/wp-content/uploads/sites/2/2021/12/humans-of-new-york-website-homepage.png"},{title:"Roger McDonalds",content:"the warrior is deepak kumat",comment:"",img:"https://www.hostinger.in/tutorials/wp-content/uploads/sites/2/2021/12/the-sartorialist-website-homepage.png"}]
   adder.insertMany(add).then(()=>
   {
    console.log("added")
   })
 })
app.get('/:id?', (req,res)=>
{
    var name=req.params.id;
   console.log(name);

   adder.find({}).toArray().then((data)=>{
    finder.find({users:name}).toArray().then((drive)=>
    {   if(drive.length){
            console.log(drive,"drive")
            res.render('blog',{data:data,name:name,drive:drive});
        }
        else{
        res.render('blog',{data:data,name:name,drive:drive});
        }
    })
        
        }).catch((error)=>
        {
            console.log(error)
        })
      
})
app.post('/admin',(req, res)=>{
    res.render('adminlogin')
})
app.post('/addcontent',(req, res)=>{
    res.render('addfile')
});
app.post('/adminvalidation',(req, res)=>{
    var adname="deepakkumar.g";
    var adminpass="deepak"
    var adminname=req.body.adminname;
    var adminpassword=req.body.adminpassword;
    if(adminpass==adminpassword && adminname==adname)
    {
        res.render('edit')
    }
    else
    {
        res.send("invaliduser")
    }
})
app.post('/comment',(req, res)=>{
  var id=req.body.hidden;
  var comment=req.body.username;
  console.log(comment)
  const obj_id=new  ObjectId(id);
//   adder.find({_id:obj_id}).toArray().then((pot)=>
//     {
     
//         console.log(pot)
//         res.redirect(`/data/${pot}`)
//     })
    

})
app.post('/login',(req,res)=>
{
    res.render('login')
})
app.post('/validation',(req, res)=>{
    // var user={name:deepak,password:"123"}
   
    var username=req.body.username;
    var password=req.body.password;
    update.find({username:username,password:password}).toArray().then((data)=>{
         console.log(data[0]?.username)
        if(data[0]?.username===username && data[0].password===password)
    {
        res.redirect (`/${data[0].username}`)
    }
    else{
        res.send("invalid user")
    }
  
    })
 
    
})
app.post('/userset',(req, res)=>{
    var num=req.body.pat;
    var named=req.body.namer;
    var comment=req.body.comment;
    var title=req.body.tiles
    finder.insertOne({blogno:num,users:named,comment:comment,title:title}).then(()=>{
        console.log("user set")
    });
    console.log(num,named)
    res.redirect(`/${named}`)
})
app.listen(7000,(req,res)=>
{
    console.log('listening on')
})