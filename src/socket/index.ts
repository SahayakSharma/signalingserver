import { Server, Socket } from "socket.io";
import { registerMeetingHandler } from "./handlers/meeting.handler";
import { registerUserHandler } from "./handlers/user.handler";
import { activeUser } from "../assets/activeUserData";


export function registerSocketEvent(io:Server){
    io.on("connection",(socket:Socket)=>{
        const userSocketId=socket.id;
        socket.on("identity",userid=>{
            activeUser[userid]=userSocketId;
        })
        
        registerMeetingHandler({io,socket});
        registerUserHandler({io,socket});
        
        socket.on("disconnect",()=>{
            console.log("user disconnected : ",userSocketId)
        })
    })
}