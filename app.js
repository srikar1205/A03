const path = require("path")
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser") // simplifies access to request body
const fs = require('fs')  // NEW - this is required
const app = express()  // make express app
const http = require('http').Server(app)  // inject app into the server
const port = process.env.PORT || 8081;

// ADD THESE COMMENTS AND IMPLEMENTATION HERE 
// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")) // path to views
app.set("view engine", "ejs") 
// 2 manage our entries
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 3 set up the logger
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));

// 4 handle valid GET requests
// 4 http GET default page at /
app.get("/", function (req, res) {
    //res.sendFile(path.join(__dirname + '/assets/index.html'))
    res.render("index.ejs")
   })
   app.get("/index", function (req, res) {
    //res.sendFile(path.join(__dirname + '/assets/index.html'))
    res.render("index.ejs")
   })
   
   // 4 http GET /tic-tac-toe
   app.get("/tic-tac-toe", function (req, res) {
    res.render("tic-tac-toe.ejs")
   })
   
   // 4 http GET /about
   app.get("/about", function (req, res) {
    res.render("about.ejs")
   })
   
   // 4 http GET /contact
   app.get("/contact", function (req, res) {
    res.render("contact.ejs")
   })
   
   app.get('/test', function(req,res){
     res.render('test.ejs')
   })
   
// 5 handle valid POST request (not required to fully work)
app.post("/contact", function (req, res) {
    const name = req.body.inputname;
    const email = req.body.inputemail;
    const company = req.body.inputcompany;
    const comment = req.body.inputcomment;
    const isError = true;
   
    // setup e-mail data with unicode symbols
    const mailOptions = {
      from: '"Denise Case" <denisecase@gmail.com>', // sender address
      to: 'dcase@nwmissouri.edu, denisecase@gmail.com', // list of receivers
      subject: 'Message from Website Contact page', // Subject line
      text: comment,
      err: isError
    }
   
    // logs to the terminal window (not the browser)
    console.log('\nCONTACT FORM DATA: ' + name + ' ' + email + ' ' + comment + '\n');
    //})
})
   
   
// 6 respond with 404 if a bad URI is requested
app.get(function (req, res) {
    res.render("404")
   })
   

// Listen for an application request on port 8081
http.listen(port, function () {
  console.log('app listening on http://127.0.0.1:8081/')
})
