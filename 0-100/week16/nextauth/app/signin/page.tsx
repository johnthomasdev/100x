"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";


export default function(){
    const router = useRouter();
    return (
        <div className = 'flex justify-center items-center h-screen flex-col'>
            Signin Page
            <div>
                Enter Email
                <input type = "text" placeholder="123@gmail.com"></input>
            </div>
            <div>
                Enter Password
                <input type = 'password' placeholder = '***'></input>
            </div>
            <button onClick = {async () => {
                const res = await signIn('credentials',{
                    username:"",
                    password:"",
                    redirect: false
                });
                console.log(res);
                router.push("/");
            }}>
                Signing with Email
            </button>
            <button onClick = {async () => {
                const res = await signIn('google',{
                    callbackUrl: '/'
                });
            }}> Login With Google
            </button>
        </div>
    )
}