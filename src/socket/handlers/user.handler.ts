import { Server, Socket } from "socket.io";
import { UserEvents } from "../events/user.event";
import { activeUser } from "../../assets/activeUserData";


export function registerUserHandler({io,socket}:{io:Server,socket:Socket}){
    socket.on(UserEvents.TYPING,()=>{
        socket.broadcast.emit(UserEvents.TYPING,{socketid:socket.id});
    })

    socket.on(UserEvents.TYPING_STOPPED,()=>{
        socket.broadcast.emit(UserEvents.TYPING_STOPPED,{socketid:socket.id});
    })

    socket.on(UserEvents.GET_USER_STATUS,({socketid}:{socketid:string})=>{
        const user=activeUser[socketid];
        user ? socket.emit(UserEvents.USER_STATUS,({socketid:socketid,status:"online"})) : socket.emit(UserEvents.USER_STATUS,({socketid:socketid,status:"offline"})) 
    })
} 