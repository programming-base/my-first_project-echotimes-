const app=require('./app');
const express=require('express')
const path=require('path');
let port=process.env.PORT||3000;
app.use(express.static(path.join(__dirname,'../frontend')));

app.listen(port,()=>
{
    console.log(`The server is on ${port}`)
})