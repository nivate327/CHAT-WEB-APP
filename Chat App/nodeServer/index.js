//Node Server
const express=require("express");
const app=express();
const path=require("path");
const PORT=process.env.PORT || 3000;
const http=require("http").createServer(app);
const users={}

const static=path.join(__dirname,"./public");
app.use(express.static(static));

http.listen(PORT, ()=>
{
    console.log(`server is running on ${PORT}`);
});


app.get("/", (req,res)=>
{
    res.sendFile(__dirname+"/home.html")
})

const io=require("socket.io")(http);
io.on("connection", socket=>
{

    console.log("connected");
    
    socket.on("new-user-joined", name=>
    {
        console.log("New User", name)
        users[socket.id]=name;
        socket.broadcast.emit("user-joined", name);

    })

    socket.on("send", message=>
    {
        socket.broadcast.emit("receive", {message:message, name:users[socket.id]});
    })

    socket.on("disconnect", message=>
    {
        socket.broadcast.emit("left", users[socket.id]);
        delete users[socket.id];
    })

})