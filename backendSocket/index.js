const express= require('express')
const app= express()
const http= require("http")
const connectDB=require('./config/db')
const {Server}= require('socket.io')
const cors= require("cors")
const apiForumRoute=require('./routes/api/forum')
// const apiNotifyRoute=require('./routes/api/notification')

connectDB()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const server= http.createServer(app)


const io =new Server(server,{
    cors:{
        origin:"*"
    }
})
app.set('socketio', io);

io.on("connection", (socket)=>{
    console.log('someone has connected')
    console.log(socket.id)

    socket.on("join_room", (loggedInUser)=>{
        socket.join(loggedInUser)
        // onlineUsers.push(socket.id)
        console.log(`User with ID: ${socket.id} joined room ${loggedInUser}`)
    })
    
    //emit to persons in that room
    socket.on("send_message", msgdata=>{
        console.log({msgdata})
        // io.in(msgdata.forumId).emit("recieve_message", msgdata)
        socket.to(msgdata.recipient).emit("recieve_message", msgdata)
    })


})

app.use('/api/forum', apiForumRoute)
// app.use('/api/notification', apiNotifyRoute)

server.listen(3001, ()=>{
    console.log('server is running')
})