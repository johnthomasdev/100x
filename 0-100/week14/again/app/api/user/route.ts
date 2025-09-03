import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET(req:NextRequest){
    return NextResponse.json({
        email:"hi@gmaill.com",
        name:"john"
    })
}

export async function POST(req:NextRequest){
    const body = await req.json();
    try{
        await client.user.create({
            data:{
                username:body.username,
                password:body.password
            }
        })
         // console.log(body);
        // console.log(req.headers.get('authorization'));
        // console.log(req.nextUrl.searchParams.get("name"));
        return NextResponse.json({
            // message: "You are signed up"
            message: "You signed up"
        })
 
    }
    catch(e){
        return NextResponse.json({
            message:"Error username already in use"
        },{
            status:411
        })
    }
   
}