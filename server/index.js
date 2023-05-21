const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const socket = require('socket.io');
require("dotenv").config();
const userRoutes =  require('./routes/userRoutes.js');
const messageRoutes =  require('./routes/messagesRoute.js');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth' , userRoutes)
app.use('/api/messages' , messageRoutes)

// database connection
mongoose.connect(process.env.MONGO_URL ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(process.env.MONGO_URL)
    console.log("Data Base connection successfull")
}).catch((err)=>{
    console.log(err.message);
})


const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server started at port ${process.env.PORT}`);
})

const io = socket(server,{
    cors:{
        origin :process.env.ORIGIN,
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user" , (userId)=>{
        console.log(`User added to Socket ${socket.id}`);
        onlineUsers.set(userId , socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve" , data.msg);
        }
    })
})
