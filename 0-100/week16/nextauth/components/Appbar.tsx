"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"

export const Appbar = () => {
    // const router = useRouter();
    const session = useSession();
    return <div className = 'flex justify-center items-center min-h-screen gap-4'>
        THE MAIN PAGE
        <button onClick = {() => {
            // router.push("/api/auth/signin");
            signIn();
        }}> Signin </button>
        <button onClick = {() => {
            signOut();
        }}> Logout </button>
        {JSON.stringify(session)}
        
    </div>
}