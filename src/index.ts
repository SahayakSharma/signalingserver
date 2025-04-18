import { Server } from "socket.io";

const io=new Server(3000,{
    cors:{
        origin:"*"
    }
}); 




const rooms:Record<string,string[]>={
}


const online:string[]=[

]

io.on("connection",(socket)=>{
    const userSocketId=socket.id;

    socket.on("join-room",(roomid)=>{
        socket.to(roomid).emit("user-joined",userSocketId);
        socket.join(roomid);
        console.log(userSocketId," joined the room ",roomid)
        if(!rooms[roomid]){
            rooms[roomid]=[];
        }
        rooms[roomid].push(userSocketId);


        const otherUsersInTheRoom=rooms[roomid].filter((userid:string)=>userid!=userSocketId);
        socket.emit("other-users",otherUsersInTheRoom);


        socket.on("offer",({target,sdp}:{target:string,sdp:RTCSessionDescriptionInit})=>{
            console.log(userSocketId," has created and offer and sending to ",target);
            socket.to(target).emit("offer",{sender:userSocketId,sdp:sdp});
        })

        socket.on("answer",({target,sdp}:{target:string,sdp:RTCSessionDescriptionInit})=>{
            console.log(userSocketId," has created an answer and sending to ",target);
            socket.to(target).emit("answer",{sender:userSocketId,sdp:sdp});
        })
        socket.on("ice-candidates",({target,candidate}:{target:string,candidate:RTCIceCandidateInit})=>{
            console.log(userSocketId, " sending ice candidate to ",target);
            socket.to(target).emit("ice-candidates",{sender:userSocketId,candidate:candidate});
        })

        socket.on("disconnect",()=>{
            for(const roomid in rooms){
                if(rooms[roomid].includes(userSocketId)){
                    rooms[roomid]=rooms[roomid].filter((userid)=>userid!=userSocketId);
                    socket.to(roomid).emit("user-left",userSocketId);
                }
            }
            console.log("user disconnected : ",userSocketId)
        })
        socket.on("hang-up",()=>{
            for(const roomid in rooms){
                if(rooms[roomid].includes(userSocketId)){
                    rooms[roomid]=rooms[roomid].filter((userid)=>userid!=userSocketId);
                    socket.to(roomid).emit("user-left",userSocketId);
                }
            }
            console.log("user left : ",userSocketId)
        })

        socket.on("getroommembers",()=>{
            console.log(rooms);
        })
    })

    socket.on("call",(target)=>{
        
    })
    socket.on("disconnect",()=>{
        
        console.log("user disconnected from socket : ",userSocketId)
    })
    console.log("user connected : ",userSocketId);
})


