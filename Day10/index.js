const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url='mongodb://0.0.0.0:27017/company';
const client = new MongoClient(url);
const ObjectId=require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const { name } = require('ejs');

app.set('view engine', 'ejs');
 app.set('views', __dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

client.connect(url).then(()=>
{
    console.log("connected")
})
const DB=client.db("company");
const add=DB.collection("crud");
// Todo list operatipon
app.get('/',(req, res)=>
{
    add.find({}).toArray().then((data)=>
        {
            res.render('index',{data:data})

        })
})
app.post('/',(req, res)=>
{
    if(req.body.edit ==="update"){
        res.send("updated")
       req.body.button="submit" 
    }
    else{
        add.insertOne({name:req.body.input}).then(()=>{
        res.redirect('/')
    })
    }

        
})


app.get('/delete/:id',(req, res)=>{

var id = req.params.id;
    var o_id=new ObjectId(id)
    add.deleteOne({_id:o_id}).then(()=>
    {
        res.redirect('/');
    }).catch(err=>console.log(err));
   
})

app.get('/edit/:id',(req, res,next)=>{
    var id = req.params.id;
    var o_id=new ObjectId(id);
    add.find({_id:o_id}).toArray().then((data)=>{
        res.render('edit',{data:data})
    }).catch((error)=>
    {
        console.log(error)
    })
    app.post('/edit',(req,res)=>{
            add.updateOne({_id:new ObjectId(req.body._id)},{$set:{
                 name:req.body.name,
             password:req.body.password
             }})
            res.redirect('/');
         })
  

})
app.listen(8000,(req,res)=>
{
    console.log('listening on');
});