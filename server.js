const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors=require('cors');


mongoose.connect('mongodb://localhost:27017/getwhatyousee',{ useNewUrlParser: true,
   useFindAndModify: false,
    useUnifiedTopology: true 
  },()=>{
      console.log("MongoDB connected")
    })

const app = express();
const port = 5000;

const Post = require('./models/post');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.post("/api/add", async(req, res) => {
  if(req.body.description===undefined){
    console.log('plese enter description')
       return;   
  }
        await Post.create(req.body)
          .then(result => {
            res.status(201).send({
              success: true,
              data: result,
              message: "Post created successfully",
            });
          })
          .catch(err => console.log("Error creating ", err))
      })
    

app.get("/api",async (req, res) => {
 await Post.find({})
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log("Create new post error -> ", err)
    })
})


  app.use(express.static("client/build"));

 

app.listen(port,()=> {
  console.log('Listening on ' + port);
});
