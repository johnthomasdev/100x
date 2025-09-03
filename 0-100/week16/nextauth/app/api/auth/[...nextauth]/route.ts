// import { NextRequest, NextResponse } from "next/server";


// // Catch all routes starting with api/auth 
// export function GET(req: NextRequest, {params: {authRoutes}}: {params: {authRoutes: string[]}}){ //used to catch all things starting from /api/auth.. can be anything like /api/auth/aaasdfasfd stuff like that even /api/auth/a/b
//     console.log(authRoutes);
//     return NextResponse.json({
//         message:"Hiii"
//     })
// }

// export function POST(){
//     return NextResponse.json({
//         message: "Bye"
//     })
// }

import { NEXT_AUTH } from "@/app/lib/auth";
import NextAuth from "next-auth";

// we get email and password from user

const handler = NextAuth(NEXT_AUTH);

export const GET = handler;
export const POST = handler;