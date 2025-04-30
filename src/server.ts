import express from "express";
import http from "http"
import { Server } from "socket.io";
import { registerSocketEvent } from "./socket";

export function createServer(){
    const app=express();

    const server=http.createServer(app);
    const io=new Server(server,{
        cors:{
            origin:'*'
        }
    })

    registerSocketEvent(io);

    return server;
}