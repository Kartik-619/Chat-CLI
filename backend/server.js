const express=require('express');
const cors=require('cors');
const connectDB=require('./config/config');

const app=express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/login',require('./routes/loginRoute'));
app.use('/register',require('./routes/registerRoute'));

app.get('/',(req,res)=>{
    res.send('backend is running');
});

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port : ${port}`);
    })
})
