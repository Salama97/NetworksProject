var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

var session = require('express-session');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.render('login');
});

app.get('/registration', function (req, res) {
  res.render('registration');
});
app.get('/login', function (req, res) {
  res.render('login');
});
app.get('/register', function(req, res){
 res.redirect('home');
});
app.get('/home', function (req, res) {
  res.render('home');
});
app.get('/phones', function (req, res) {
  res.render('phones');
});
app.get('/books', function (req, res) {
  res.render('books');
});
app.get('/boxing', function (req, res) {
  res.render('boxing');
});
app.get('/cart', function (req, res) {
  cartPage(res);
});
app.get('/galaxy', function (req, res) {
  res.render('galaxy');
});
app.get('/iphone', function (req, res) {
  res.render('iphone');
});
app.get('/leaves', function (req, res) {
  res.render('leaves');
});
app.get('/phones', function (req, res) {
  res.render('phones');
});
app.get('/searchresults', function (req, res) {
  res.render('searchresults');
});
app.get('/sports', function (req, res) {
  res.render('sports');
});
app.get('/sun', function (req, res) {
  res.render('sun');
});
app.get('/tennis', function (req, res) {
  res.render('tennis');
});

//mongo connection
async function main() {
  var { MongoClient } = require('mongodb');
  var uri = "mongodb+srv://admin:admin@cluster0.fdkdj.mongodb.net/CsProject?retryWrites=true&w=majority"
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  // await client.db('CsProject').createCollection("secondcollection");
  //var user1={Username:"Ahmed", Password:"A111"};
  //await client.db('CsProject').collection('DPCollection').insertOne(user1);
  //var user2={Username:"Salma", Password:"S111"};
  //await client.db('CsProject').collection('DPCollection').insertOne(user2);
  //var user3={Username:"Malek", Password:"M111"};
  //await client.db('CsProject').collection('DPCollection').insertOne(user3);
  var output = await client.db('CsProject').collection('DPCollection').find().toArray();
  //console.log(output);
  return output;
  client.close();
}
main().catch(console.error);

app.post('/', async function (req, res) {
  //const output = await main();
  var x = req.body.username;
  var y = req.body.password;
  session.username=x;
  session.password=y;
  //console.log(x + " " + y);
  //mongo connection
async function main() {
  var { MongoClient } = require('mongodb');
  var uri = "mongodb+srv://admin:admin@cluster0.fdkdj.mongodb.net/CsProject?retryWrites=true&w=majority"
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  // await client.db('CsProject').createCollection("secondcollection");
  //var user1={Username:"Ahmed", Password:"A111"};
  //await client.db('CsProject').collection('DPCollection').insertOne(user1);
  //var user2={Username:"Salma", Password:"S111"};
  //await client.db('CsProject').collection('DPCollection').insertOne(user2);
  //var user3={Username:"Malek", Password:"M111"};
  //await client.db('CsProject').collection('DPCollection').insertOne(user3);
  var output = await client.db('CsProject').collection('DPCollection').find().toArray();
  //console.log(output);
  //return output;
var i =0;
var flag= false;
  while(i < output.length) {
    if (x == output[i].Username && y == output[i].Password){
      flag=true;
      res.redirect('home');}
    else {
    i++;
    } }
  if(!flag){
   res.render('login');
   let alert=require('alert');
   alert("Invalid username or password");
    
  }

 client.close();
}
main().catch(console.error);

});

app.post('/search', (req, res)=>{
  var search = req.body.Search;
  var arrSearch = [];
  arrSearch.push(product='boxing');
  arrSearch.push(product='galaxy');
  arrSearch.push(product='iphone');
  arrSearch.push(product='leaves');
  arrSearch.push(product='sun');
  arrSearch.push(product='tennis');
  var index = arrSearch[0];
  var arrayResult = [];
  for(var i = 0; i<arrSearch.length;i++){
        if(arrSearch[i].includes(search))
          arrayResult.push(arrSearch[i]);
          //index = arraySearch[i+1];
      }
  if(arrayResult.length === 0){
        let alert=require('alert');
         alert("Item Not Found" );
    }
  else res.render("searchresults", {searchRes: arrayResult});
    }
  
);
app.post('/register', async function (req, res) {
  var a = req.body.username;
  var b = req.body.password;
  var c = []
  var regitereduser = { Username: a, Password: b, Cart: c};
  async function main() {
    var { MongoClient } = require('mongodb');
    var uri = "mongodb+srv://admin:admin@cluster0.fdkdj.mongodb.net/CsProject?retryWrites=true&w=majority"
    var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    // await client.db('CsProject').createCollection("secondcollection");
    //var user1={Username:"Ahmed", Password:"A111"};
    //await client.db('CsProject').collection('DPCollection').insertOne(user1);
    //var user2={Username:"Salma", Password:"S111"};
    //await client.db('CsProject').collection('DPCollection').insertOne(user2);
    //var user3={Username:"Malek", Password:"M111"};
    //await client.db('CsProject').collection('DPCollection').insertOne(user3);
    var output = await client.db('CsProject').collection('DPCollection').find().toArray();
    //console.log(output);
    //await client.db('CsProject').collection('DPCollection').insertOne(user);
     
    var flag1=false;
    var flag2=false;
    
    if(a=='' || b==''){
       flag2=true;
       let alert=require('alert');
       alert("Please enter your username and password" );
       res.render('registration',{error:"Registration"});
    }
    else{
    var i=0
    while(i < output.length) {
      if (a == output[i].Username ){
        flag1=true;
        let alert=require('alert');
        alert("Taken username");
        res.render('registration',{error:"Registration"});
        break;
      }
      else {
      i++;
      } 
    } 
  }
    if(!flag1 && !flag2){
      await client.db('CsProject').collection('DPCollection').insertOne(regitereduser);
      res.redirect('home');
    }
    
    client.close();
  }
    main().catch(console.error);
  
  
});


//Cart
async function cartPage(res){
  var { MongoClient } = require('mongodb');
  var uri = "mongodb+srv://admin:admin@cluster0.fdkdj.mongodb.net/CsProject?retryWrites=true&w=majority"
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  var output = await client.db('CsProject').collection('DPCollection').find({Username: session.username}).toArray();
  var cartCheck = output[0].Cart;
  res.render('cart',{cartList: cartCheck});
}

app.post('/boxingCart',(req, res)=>{
   addCart('Boxing Bag');
})
app.post('/galaxyCart',(req, res)=>{
  addCart('Galaxy S21 Ultra');
})
app.post('/iphoneCart',(req, res)=>{
  addCart('iPhone 13 Pro');
})
app.post('/leavesCart',(req, res)=>{
  addCart('Leaves Of Grass');
})
app.post('/sunCart',(req, res)=>{
  addCart('Sun And Her Flowers');
})
app.post('/tennisCart',(req, res)=>{
  addCart('Tennis Racket');
}
)

async function addCart(page){
  var { MongoClient } = require('mongodb');
  var uri = "mongodb+srv://admin:admin@cluster0.fdkdj.mongodb.net/CsProject?retryWrites=true&w=majority"
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  var output = await client.db('CsProject').collection('DPCollection').find({Username: session.username}).toArray();
  var cartCheck = output[0].Cart;
  var Check = false;
  for(var i = 0; i<cartCheck.length;i++){
    if(page==cartCheck[i]){
      await client.close;
      let alert=require('alert');
      alert("Product Already Added to Cart Before");
      Check = true;
    }
  }
  if (Check==false){
    await client.close;
    await client.db('CsProject').collection('DPCollection').updateOne({Username: session.username},{$push:{Cart:page}});
    let alert=require('alert');
      alert("Product Added To Cart");
  }
}

app.post

app.listen(3000);
