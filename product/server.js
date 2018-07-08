var express = require('express'),
app = express(),
cors = require('cors'),
mongoose = require('mongoose'),
body_parse = require('body-parser'),
jwt =  require('jsonwebtoken');


//It is middle war to get request from different server such as http://localhost:4200 localhost:3000
app.use(cors({
    origin:"http://localhost:4200"
}));

app.use(body_parse.urlencoded({extended:false}));
app.use(body_parse.json());


// mongoose.Promise = require('r').Promise;
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/product_management');

db.on('error', function(err){
    console.error("connection error;", err);
});

db.on('open',function(){
    console.log('connection db');
});
var registration_schema = mongoose.Schema({
    firstname: String,
    lastname : String,
    email: String,
    password: String,
    phonenumber: String,
});

var product_schema = mongoose.Schema({
    productId: Number,
    productName: String,
    productCode: String,
    releaseDate: String,
    description: String,
    price: Number,
    starRating: String,
    imageUrl: String
});

var registration_model = mongoose.model('userdata',registration_schema);
var product_model = mongoose.model('products',product_schema);

app.post('/registration',function(req,res){
    // console.log(req.body);
    registration_model.find({"email":req.body.email},function(err,doc){
         if(doc.length != 0)
         {
                res.send(false);
         }
         else{
            // console.log(req.body);
            var registration_doc = registration_model(req.body);
            registration_doc.save(function(err){
                    if(!err)
                    {
                        res.send(true);
                    }
                });     
         }
    });
    // 
});
app.post('/login',function(req,res){
    // console.log(req.body); 
    var token = jwt.sign({"email":req.body.email}, 'my-secret-Key', {
        expiresIn : '1h'
    });
    registration_model.find({"email":req.body.email, "password": req.body.password },function(err,doc){
        if(!err && doc.length == 1)
        {
            res.send({
                isloggedIn : true,
                token : token
               });      
        } 
        else
        {
            res.send({
                isloggedIn : false
               });  
        }
      
    });
});

app.post('/createProduct',function(req,res){
     req.body["starRating"] = 4.2;
    //  console.log(req.body);
    product_model.find({"productId":req.body.productId},function(err,doc){
        // console.log(doc);
         if(doc.length != 0 || err == true)
         {
                // console.log(doc);
                res.send(false);
         }
         else{
            var product_doc = product_model(req.body);
             product_doc.save(function(err){
                    if(!err)
                    {
                        res.send(true);
                    }
                });     
         }
    }); 
});


app.post('/productDetail', function(req, res){
    // console.log(req.body);
    product_model.find({"productCode" : req.body.productCode},function(err,data){
             res.send(data[0]);
            // console.log(data);
    }); 
});

app.use(function(req, res, next){
    // console.log(req.headers['authtoken']);
    var token = req.body.authtoken || req.query.authtoken || req.headers['authtoken'];
    jwt.verify(token, 'my-secret-Key', function(err, decoded){
            if(err)
            {   
                // console.log("hellow");
                    res.send({
                            err : true,
                            msg : 'invalide request'
                    })
            }
            else
            {
                // console.log("hellow1");
                  req.decoded = decoded; // if you want to know which user login this method can be use
                  next();
            }
    });     
});
app.get('/getProduct', function(req, res){
        // console.log(req.decoded);
            product_model.find({},function(err,data){
                    res.send(data);
                    // console.log(data);
            }); 
    // res.send();
});

// create server 
app.listen(3000, function(){
    console.log("server is @ localhost:3000");
});



// [
//     {
//         "productId": 1,
//         "productName": "Leaf Rake",
//         "productCode": "GDN-0011",
//         "releaseDate": "March 19, 2016",
//         "description": "Leaf rake with 48-inch wooden handle.",
//         "price": 19.95,
//         "starRating": 3.2,
//         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
//     },
//     {
//         "productId": 2,
//         "productName": "Garden Cart",
//         "productCode": "GDN-0023",
//         "releaseDate": "March 18, 2016",
//         "description": "15 gallon capacity rolling garden cart",
//         "price": 32.99,
//         "starRating": 4.2,
//         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
//     },
//     {
//         "productId": 5,
//         "productName": "Hammer",
//         "productCode": "TBX-0048",
//         "releaseDate": "May 21, 2016",
//         "description": "Curved claw steel hammer",
//         "price": 8.9,
//         "starRating": 4.8,
//         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
//     },
//     {
//         "productId": 8,
//         "productName": "Saw",
//         "productCode": "TBX-0022",
//         "releaseDate": "May 15, 2016",
//         "description": "15-inch steel blade hand saw",
//         "price": 11.55,
//         "starRating": 3.7,
//         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
//     },
//     {
//         "productId": 10,
//         "productName": "Video Game Controller",
//         "productCode": "GMG-0042",
//         "releaseDate": "October 15, 2015",
//         "description": "Standard two-button video game controller",
//         "price": 35.95,
//         "": 4.6,
//         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
//     }
// ]