const express = require('express')
const app = express();
const path = require('path')
const port = 80;
//bodyparser is used to send data in database by parsing the data
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

//MONGOOSE SCHEMA FOR DATABASE 
mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true});
//moongoose.schema used for schema making
const contactschema = new mongoose.Schema({
   name: String,
   address: String,
   number: String,
   Email: String,
   age: String,
});
//used to implement schema in Contacts named model
const Contact = mongoose.model('Contacts', contactschema);


// EXPRESS STUFF
app.use("/static1/", express.static('./static1'));
app.use(express.urlencoded())


//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//ENPOINTS
app.get('/', (req, res) => {

   res.render('./home.pug')
})
app.get('/contact', (req, res) => {

   res.render('./contact.pug')
})
app.post("/contact", (req, res) => {
   //we have to create  a 'new variable object' in which we store the input values and 'save data' and also have to set a 'promise' and alse use 'catch' in case of error
   var mydata = new Contact(req.body)
    mydata.save().then(() => {
      res.render('./contact_submit.pug')
   }).catch(()=>{
      res.send("Your data could not be stored due to Internal error")
   })

})

//START THE SERVER
app.listen(port, (req, res) => {
   console.log(`the wesite is listening on port ${port}`)
})