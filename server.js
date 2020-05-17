const express = require('express')
const app = express()
port = process.env.PORT || 80
var bodyParser = require('body-parser')


var MongoClient = require('mongodb').MongoClient;
const url ="mongodb+srv://empipower6:Emrek1221@cluster0-sxlzg.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

if (process.env.NODE_ENV === 'production') {
 // Exprees will serve up production assets
 app.use(express.static('Client/build'));

 // Express serve up index.html file if it doesn't recognize route
 // const path = require('path');
 // app.get('*', (req, res) => {
 //   res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'));
 // });
}

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
app.listen(port,()=>{console.log("Listening on port"+port)});
