const express = require('express');
const port = 8000
const path = require('path');
const { report } = require('process');
const app = express();

// adding database
const db = require('./config/mongoose')
const Contact = require('./models/contact')

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name : "arpan",
        phone : "9846239954"
    } ,
    {
        name : "adi" ,
        phone : "9846243244"
    } ,
    {
        name : "anshu",
        phone : "9841212154"
    }
]

// display the contacts

app.get('/', (req , res)=>{

    //    return res.render('home' , {
    //        title : "contact List" ,
    //        contact_List : contactList
    //    });


    // using database


    Contact.find({}, (err , contacts)=>{
        if(err){
            console.log('error in fetching database');
            return;
        }
        return res.render('home' , {
            title : "contact List" ,
            contact_List : contacts
        });


    })

});

app.get('/practise', (req , res)=>{

    return res.render('practise' , {
        title : "play with EJS"
    });
 });

app.post('/create-contact' , (req , res)=>{
    // console.log(req);
    // return res.redirect('/practise');


    // contactList.push({
    //     name : req.body.name ,
    //     phone : req.body.phone
    // });

    // contactList.push(req.body);
    // return res.redirect('back');

    // using database

    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },(err , newContact)=>{
        if(err){
            console.log('error found in creating contact : ' , err);
            return;
        }

        console.log('**********' , newContact);
        return res.redirect('back')
    })



})

app.get('/delete-contact', (req, res)=>{
    // let phone = req.query.phone;
    // // console.log(req.query);
    // let contactIndex = contactList.findIndex( contact =>  contact.phone == phone )
    
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex , 1);
    // }

    // return res.redirect('back');


    


    // using database

    // get id from query in the url
    let id = req.query.id; 

    // find the contact and delete id
    Contact.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log("error in deleting the contact in the database");
            return;
        }

        return res.redirect('back');

    });

})


app.listen(port , (err)=>{

    if(err){
        console.log("error in running the server" , err);

    }
    console.log("server is running on port:" , port)
});


