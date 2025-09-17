const express=require('express');
const cors=require('cors');
// we are importing server class from socketio and enabling bidirectional communication
const {Server}=require("socket.io");
//we are creating a raw http server to enable real time communication
const {createServer}=require('node:http');
//combines multiple paths into a single one
const { join } = require('node:path');


require('dotenv').config();
const connectDB=require('./config/config');
const port=process.env.PORT||5000;
const app=express();
//we make the app to be a function handler for http server 
const server=createServer(app);
// importing io for using in-built methods
const io=new Server(server); //new server created for each user 

//this initializes the server when connection event is fired
io.on('connection',(socket)=>{
    console,log('user connected');
});
//socket.io allows to receive and send any event we like along with data related to it


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
    server.listen(port,()=>{
        console.log(`server is running on port : ${port}`);
    })
})
