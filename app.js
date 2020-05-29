const express= require('express');

const app=express();

const mongoose=require('mongoose');


 
 
// parse various different custom JSON types as JSON

const authenicationRouter=require('./routes/authenicationRoutes')

const slamRouter=require('./routes/slamRoutes')


 
app.use(express.json())

require('dotenv').config()


const databaseUrl= process.env.DataBaseConnection;

mongoose.connect(databaseUrl, 
    {useNewUrlParser: true ,
    useUnifiedTopology: true},
    (err)=>{
        if(err) {
            console.log('Some problem with the connection ' +err);
        } else {
            console.log('The Mongoose connection is ready');
        }
    })

const con = mongoose.connection

con.on('open', () => {
        console.log('connected...')
    })    

app.use('/authenication',authenicationRouter)
app.use('/slam',slamRouter)

app.listen(8081,()=>{
 console.log('server started');
});

