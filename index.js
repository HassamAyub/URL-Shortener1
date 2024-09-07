const express=require('express');
const dbConnection=require('./connnection.js')
const routes=require('./Routes/url.js')
const staticRouter=require('./Routes/staticRouter.js')
const path=require('path');

const app=express();
const port=8000;

dbConnection('mongodb://127.0.0.1:27017/url_shortener')
.then(()=>console.log('DB Connected'))

// set default view engine
app.set('view engine','ejs');
app.set('views',path.resolve('./Views'))

//add middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use('/url',routes)
app.use('/',staticRouter);


app.listen(port,()=>{console.log('server started');
})