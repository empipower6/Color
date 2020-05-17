const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')


var MongoClient = require('../Client/node_modules/mongodb').MongoClient;
const url ="mongodb+srv://empipower6:Emrek1221@cluster0-sxlzg.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.json());
var cors = require('../Client/node_modules/cors');
app.use(cors());




app.post("/newcolor",async (req,res)=>{
  let db

  MongoClient.connect(url,{useNewUrlParser:true},(err,client)=>{

        if(err) throw err

        db = client.db("ColorPicker");
        db.collection('Colors').insertOne(req.body);





  })
});

app.post("/updateColor",async (req,res)=>{
  let db

  MongoClient.connect(url,{useNewUrlParser:true},(err,client)=>{

        if(err) throw err

        db = client.db("ColorPicker");
        let newvalues = { $set: req.body };
        db.collection("Colors").updateOne({key:req.body["key"]},newvalues);





  })
});

app.post("/deletecolor",async (req,res)=>{

  let db
  MongoClient.connect(url,{useNewUrlParser:true},(err,client)=>{
  if(err) throw err
  db= client.db("ColorPicker")
  db.collection('Colors').deleteOne(req.body)

  client.close()

  })
});
app.get('/color', async (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)

    // Storing a reference to the database so you can use it later
    db = client.db('ColorPicker')
    db.collection('Colors').find({}).toArray((err,result)=>{
      if(err) throw err;
      res.status(200).json(result)

    })
    });
});

app.get('/ps', async (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)

    // Storing a reference to the database so you can use it later
    db = client.db('pass')
    db.collection('pass').find({}).toArray((err,result)=>{
      if(err) throw err;
      res.status(200).json(result)

    })
    });
});
app.listen(port,()=>{console.log("Listening on port 4000")});
