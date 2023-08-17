const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname+'/src/public/','views'));


//1.create an array of 5 objects in ejs file which has properties like name and salary and then using ejs file print all the names in uppercase and display the name and salary in form of a html table

//2.create an array in javascript file and print the sum of all elements of that array in ejs template

app.get('/',(req,res) => {
     var datam=[{name:"messi",salary:30000},{name:"ronaldo",salary:30000},
    {name:"neymar",salary:30000},{name:"chettri",salary:30000}];
     var peta=[1,2,3,4,5];
    res.render('index',{datam:datam,peta:peta})
})

//Create a route in express that process which day of the week it is through Date class and 
//then sound this result to the ejs file with either "it is a weekend." or "
//its not a weekend" depending on the day.
app.get('/weekdays',(req,res) => {
    res.render('date');
})


app.listen(8000,(req,res)=>
{
    console.log('listening on');
});