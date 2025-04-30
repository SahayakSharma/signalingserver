import { Server, Socket } from "socket.io";
import { MessageEvent } from "../events/message.event";
import { activeUser } from "../../assets/activeUserData";


export function registerMessageHandler({io,socket}:{io:Server,socket:Socket}){
    socket.on(MessageEvent.SEND_MESSAGE,({userid,text,roomid})=>{
        const receiverSocketId=activeUser[userid];
        
        // add message to database

        receiverSocketId && socket.to(receiverSocketId).emit(MessageEvent.MESSAGE_RECEIVED,{
            sender:activeUser[socket.id],
            text:text,
            roomid:roomid
        })
    })
}