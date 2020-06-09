const express= require('express');
const cors=require('cors');
//var path=require('path');

const app=express();

const mongoose=require('mongoose');

const authenicationRouter=require('./routes/authenicationRoutes')

const slamRouter=require('./routes/slamRoutes')

const linkRouter=require('./routes/linkRoutes')

const loginRouter=require('./routes/loginRoutes')

 
app.use(express.json())

require('dotenv').config()


const databaseUrl= process.env.DataBaseConnection;

mongoose.connect("mongodb://localhost:27017/SlamRecords1", 
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

    
var p=function(req, res, next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');

}



app.use(p)
app.use(cors())

app.get('/hi',(req,res)=>{console.log("gfhsf");res.send("hiii");})
app.use('/authenication',authenicationRouter)
app.use('/slam',slamRouter)
app.use('/link',linkRouter)
app.use('/register/',authenicationRouter)
app.use('/slam/:userId',loginRouter.auth,slamRouter)
app.use('/login/',loginRouter.router)

app.listen(3000,()=>{
 console.log('server started');
});

