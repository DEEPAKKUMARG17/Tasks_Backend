
// create a login and logout app using express-session 
// create user in the database with email and password.
// Where the password should be hashed using bcrypt and the login root should check if the user exists in the database or not.
// if the user is exist create their session in the database and give three minutes of expiration time .
// if the user is inactivate for three minutes then automatically log out the user by showing the login page again.


const express = require('express')
const app = express();
const sessions=require('express-session');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const MongoClient=require('mongodb').MongoClient;
const url="mongodb://0.0.0.0:27017/SessionStorage"
const path=require('path');
const { consumers } = require('stream');
const Client=new MongoClient(url);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname+'/src/public/','view'));
Client.connect(url).then(()=>
{
    console.log("connected")
})
app.use(sessions({
    secret:"thisisgoingon",
     saveUninitilized:true,
    cookie:{maxAge:3*60000},
    resave:false,
}))


const DB=Client.db('SessionStorage');
const add=DB.collection('session');
const updated=DB.collection('Sessionobj')
app.get('/add',(req,res)=>{
    const adder=[{email:'deek@123@gmail.com',password:'deek'},{email:'irn@123@gmail.com',password:'irek'},
    {email:'cap@123@gmail.com',password:'de'},{email:'mank@123@gmail.com',password:'deek'}]
    add.insertMany(adder).then(()=>
    {
        console.log("added")
        res.send("updated")
    });
})
var session;
app.get('/', (req, res)=>
    {
        session=req.session;
            if(session.userid)
            {
                res.send("welcome user <a href='/logout'>Logout</a>");
            }
            else{
                console.log(session);
                updated.deleteMany({name:session.userid})
                res.render('home')
            }
      
    })
    app.get('/logout',(req, res)=>{
        session=req.session;
        updated.deleteMany({name:session.userid})
        req.session.destroy();
        res.render('home')
    })
    app.post('/edit', (req, res)=>{
        var email = req.body.email;
        var password = req.body.password;
        
       
        add.find({email: email,password:password}).toArray().then((data)=>
        {
                if(data.length!=0)
                {
                    
                        session=req.session;
                        session.userid=email;
                        if(session.userid)
                            {
                                res.send("welcome user <a href='/logout'>Logout</a>");
                                updated.insertOne({session})

                            }
                }
                else{
                    res.send("wrong user")
                }
        })
       
     
    })
app.listen(2000,(req,res)=>
{
    console.log('listening on')
})