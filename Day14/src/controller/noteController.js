const Note=require("../models/note");



exports.find=(req,res)=>{
    Note.findById({_id:req.params.noteId}).then((note)=>{
        res.send(note)

        
    }).catch((err)=>
    {
        res.send({status:400,msg:"error"})
    })
}