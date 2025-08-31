const express=require('express');
const cors=require('cors');
require('dotenv').config();
const connectDB=require('./config/config');
const port=process.env.PORT||5000;
const app=express();



//middlewares
app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL ||'http://localhost:4500',
    credentials:true
}));

//routes
app.use('/api',require('./routes/loginRoute'));
app.use('/api',require('./routes/registerRoute'));
app.use('/api',require('./routes/profileRoute'));

app.get('/',(req,res)=>{
    res.send('backend is running');
});

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port : ${port}`);
    })
})
