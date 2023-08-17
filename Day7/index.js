const express = require('express');//import express
const fs=require('fs');
const path=require('path');
const app = express();//inistailing expressapp
const  http = require('http');
const formidable = require('formidable'); 


const server=http.createServer((req,res)=>
{
    res.writeHead(200,{'Content-Type': 'text/html'})
    if(req.url=='/deepak')
    {
        var form =new formidable.IncomingForm();
        form.parse(req,(err,fields,file)=>
        {
            
        try{
            // console.log(file.myfile[0])
            console.log(file.myfile[0].originalFilename)
            console.log(file.myfile[0].size)
           var total= path.extname(file.myfile[0].originalFilename)
           console.log(typeof(total))
           if((file.myfile[0].size<=10240))
           {
            if((file.myfile[0].originalFilename.includes(".txt")))
            {
                var olpath=file.myfile[0].filepath;
                var newpath=__dirname+'/'+file.myfile[0].originalFilename;
                fs.rename(olpath,newpath,(err)=>
                {
                  if(err) throw err;
                  res.write('file uploaded successfully');
                  res.end()
                })
            }
            else
            {
                res.redirect('/')
                res.write("File Not uploaded of type .txt");
                res.end();
    
            }
       
        }
        else
        {
            res.write("File Not uploaded successfully file size is greater than 10kb");
            res.end();

        }
        }catch(err)
        {
            res.write("Cannot upload the file")
            res.end()
        }
            
        })
    }
    else{
    res.write("<form action='/deepak' method='post' enctype='multipart/form-data'>" );
    res.write("<input type='file' name='myfile' /><br>");
    res.write("<input type='submit' value='submit' />");
    res.write("</form>");
    res.end();
    }
})
server.listen(8000,()=>
{
    console.log("sever is started")
})