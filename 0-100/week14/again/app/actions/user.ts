"use server"

// This is a server action 

// Basically to remove the axios request to the server you can just straight get it from there


import client from "@/db"
import { NextResponse } from "next/server";

export async function signup(username:string, password:string){
    try{
        await client.user.create({
            data:{
                username:username,
                password:password
            }
        });
        return true
    } catch(e){
        return false
    }
}