const MongoClient=require('mongodb').MongoClient;
const express=require('express')
const url="mongodb://0.0.0.0:27017/Medical_Records";
const ObjectId=require('mongodb').ObjectId;
const client=new MongoClient(url);
const app = express();//inistailing expressapp
const fs=require('fs');

//Q.1 Perform CRUD Operations using Different routes
app.get('/create/:name/:age/:dept', (req, res) => {

    client.connect(url).then(()=>
{
    const DB=client.db("Medical_Records");
    const add=DB.collection("Medicals");
    var name=req.params.name;
    var age=req.params.age;
    var dept=req.params.dept;
    let obj={name:name,age:age,dept:dept}
    add.insertOne(obj,()=>
    {
        console.log("inserted")
    })
    })
    res.send("added")
   
})

app.get('/read/:name', (req, res) => {
client.connect(url).then(()=>
{
    var name=req.params.name;
    const DB=client.db("Medical_Records");
    const add=DB.collection("Medicals");
    
    add.find({name:name}).toArray().then((data)=>
        {
         res.send(data)
        })
    
})
})



app.get('/update/:name/:age/:dept', (req, res) => {

    res.send(req.params.name)
    var name=req.params.name;
    var age=req.params.age;
    var dept=req.params.dept;
    client.connect(url).then(()=>
    {
        const DB=client.db("Medical_Records");
        const add=DB.collection("Medicals");
      
        add.updateOne({name:name},{$set:{age:age,dept:dept}}).then(()=>
            {
                console.log("updated one")
            })
        
    })
    res.send("updated")

})
app.get('/delete/:value', (req, res) => {

    client.connect(url).then(()=>
    {
        const DB=client.db("Medical_Records");
        const add=DB.collection("Medicals");
        var name=req.params.value;
        res.send(name)
        add.deleteOne({name:name}).then(()=>{
                    console.log("deleted")
     })
    })
    
     res.send("deleted")
})
app.get('/', (req, res) => {
    res.send("1.Creat Params name,age,dept ")

})

//Q.2 To get documents from database and add it toth text file
app.get('/fetch', (req, res) => {
    client.connect(url).then(()=>
    {
        // var name=req.params.name;
        const DB=client.db("Medical_Records");
        const add=DB.collection("Medicals");
        
        add.find({}).toArray().then((data)=>
            {
                
             fs.writeFile('data2.txt',JSON.stringify(data),(err,res)=>
             {
                if(err)
                {
                    console.error.log("error")
                }
                else{
                    console.log(res)
                }
             })
            })
        
       
    })

})

app.listen(3000,()=>
{
    console.log('listening on port');
});


//Q.3 db.resturants.aggregate({$group:{_id:'$name',maxvalue:{$min:{$min:"$grades.score"}}}})

// Q.4 db.resturants.aggregate({$group:{_id:'$name',maxvalue:{$max:{$max:"$grades.score"}}}})


//Q.5 db.resturants.aggregate({$group:{_id:'$borough',count:{$count:{}}}})

//Q.6 db.resturants.aggregate([{$match:{grades.grade:'A'}},{$group:{_id:"$cuisine",sum:{$sum:1}}}])
