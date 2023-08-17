//Q.1 Name and Age Validation using Post
const express = require('express');//import express
const app = express();//inistailing expressapp
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({express: true}));

app.get("/search/:name/:age",(req,res)=>{
    if(req.params.age>18)
    {
        res.send("success")
    }
    // res.send(req.params)
})

// //validation using the post method
app.post("/",(req,res)=>{
    var user=req.body.name;
    var age=req.body.age;
    age=age+""
    if(!(user.trim()==""||age.trim()==""))
    {
        var flag=0,flag1=0;
        for(let a of user)
        {
            if(a.toUpperCase()===a.toLowerCase())
            {
                flag=1
                break;
            }
        }
        for(let a of age)
        {
            if(a.toUpperCase()!==a.toLowerCase())
            {
                flag1=1;
                break;
            }
        }

        if((flag===0)&&(flag1==0))
        {
            age=parseFloat(age)
            res.send({user,age})
        }
        else{
            res.send("Failure")
        }
    }
    else
    {
        res.send("Failure")
    }
})


app.listen(5000,()=>
{
    console.log("sever starting")
})

