

var mongo = require('mongodb');
const validUrl = require('valid-url');
const express = require("express");
const app = express();


var MongoClient = mongo.MongoClient;
  //var url = 'mongodb://localhost:27017/';

 var url =  process.env.DBURL;


function shortLinkFromNumber(n){
      const digits= process.env.SCRAMBLED;
      const base = digits.length;
      
      let r = [];
      do{
          r.push(digits[n % base]);
          n = Math.floor( n / base);


      }while(n > 0);

       return r.join("");

}


var db;
MongoClient.connect(url,(err,client)=>{
    if(err){
        console.log(err);
    }else{

       db = client.db("linkdb");

       db.collection("counter").insert(
        {
           _id: "linkId",
           seq: 0
        }
   ).catch(e =>{
       if(e.code !== 11000){
          
       
           console.log(e);
       }}
   ) 
    
       app.listen(process.env.PORT, function () {
        console.log('listening')
      });
    }
});
   
app.get('/new/:link(*)', (req, res)=> {

      
       if(!validUrl.isUri(req.params.link)){
          
            res.status(400).send({error: "unvalid URL"});
            res.end();
       }else{
            db.collection("links").findOne({"link":req.params.link}).then(e =>{
                      
                      
                      if(e === null){

                        db.collection("counter").findOneAndUpdate({"_id":"linkId"}, {$inc: {seq: 1}}).then( counter=>{
                            
                           
                            const short = shortLinkFromNumber(counter.value.seq);
                            
                            
                            db.collection("links").insertOne({_id:short, link:req.params.link}).then( e =>{
                            
                               res.status(200).send({short_url:short,original_url:req.params.link})
                               res.end()
                            }).catch(err => console.log(err));
                    
                    
                       });

                    
                      }else{

                        res.status(200).send({short_url:e._id,original_url:e.link})
                        res.end();
                      }

                     

            }).catch(e =>{

                res.status(500).send({error: "database error"});
            })


           
               
              

       }

    
});

app.get("/",(req,res)=>{

    res.sendFile(__dirname+"/views/index.html");
})

app.get("/:short(*)", (req,res)=>{
     

    db.collection("links").findOne({_id:req.params.short}).then( e =>{
              if(e === null) res.status(400).send("NOT FOUND");
              else{

                res.redirect(e.link);
              }

    }).catch(err =>{
          
        console.log(err);
        res.status(500).send("Database Error");

    } )




})
   

       
  



     

    