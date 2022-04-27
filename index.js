
const express=require('express');
const path =require('path')

const mongoose=require('mongoose')

const PublishModel=require('./Model/publishers')

const Db=()=>{
    const dbURI='mongodb+srv://maniuser:thanga1297@Mydb.npgpw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    mongoose.connect(dbURI)
    .then(()=>{console.log('dbconnected')})
    .catch(err=>{console.log(err)})
}
Db()



const app=express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/publish',(req,res)=>{
    PublishModel.find({}).then(result=>{
        res.send(result)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/create',(req,res)=>{
    const {name,location}=req.body
    const newPublishers=PublishModel({
        name:name,
        location:location
    })
    newPublishers.save().then(result=>{res.send(result)}).catch(err=>console.log(err))
})
app.put('/edit',(req,res)=>{
   const {name,location,id}=req.body
     PublishModel.updateOne({_id:id},{ $set: { name:name, location:location } }).then(result=>{
         res.send(result)
     }).catch(err=>{console.log(err)})
})

app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params
    console.log(id)
  PublishModel.deleteOne({_id:id}).then(result=>{
      console.log(result)
      res.send(result)
    }).catch(err=>{console.log(err)})
})
const port =3000;

app.listen(port,()=>{console.log('Server run on ' +port)})





