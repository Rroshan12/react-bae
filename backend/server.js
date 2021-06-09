const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')



require('dotenv').config();
const app = express()
const port = process.env.PORT||5000;

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(express.static("public"))
const uri = process.env.ATLAS_URI;
mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );


  
  const productSchema = {
    id:Number,
    name:String,
    image:String,
    description:String,
    price:Number,
  
  }
  const Products = mongoose.model("Product", productSchema)
  
  app.route('/products')
    .get(function (req, res) {
      Products.find(function(err,foundArticles)
      {
        if(!err){
          res.send(foundArticles)
        }
        else{
          res.send(err)
        }
      })
    })
    .post(function (req, res) {
      console.log("ia m server");
      const newproduct = new Products(
  
        {
          id:req.body.id,
          name:req.body.name,
          image:req.body.image,
          price:req.body.price,
          description:req.body.description
  
  
        }
  
      )
      newproduct.save(function(err){
        if(!err){
          res.send('success');
        }
        else{
          console.log(err)
  
        }
      })
    })
    .delete(function (req, res) {
      Products.deleteMany(function(err,foundArticles)
      {
        if(!err){
          res.send(foundArticles)
        }
        else{
          res.send(err)
        }
      })
    })
  
    ////////////////////////////////Requests Targetting A Specific Article////////////////////////
  
    app.route("/products/:name")
  
    .get(function(req, res){
  
      Products.findOne({name: req.params.name}, function(err, foundArticle){
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("No articles matching that title was found.");
        }
      });
    })
  
    .put(function(req, res){
  
      Products.update(
        {name: req.params.name},
        {name: req.body.name, image: req.body.image},
        {overwrite: true},
        function(err){
          if(!err){
            res.send("Successfully updated the selected article.");
          }
        }
      );
    })
  
    .patch(function(req, res){
  
      Products.update(
        {name: req.params.name},
        {$set: req.body},
        function(err){
          if(!err){
            res.send("Successfully updated article.");
          } else {
            res.send(err);
          }
        }
      );
    })
  
    .delete(function(req, res){
  
      Products.deleteOne(
        {name: req.params.name},
        function(err){
          if (!err){
            res.send("Successfully deleted the corresponding article.");
          } else {
            res.send(err);
          }
        }
      );
    });
  
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})