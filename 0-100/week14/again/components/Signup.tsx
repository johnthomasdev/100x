"use client"

import axios from "axios";
import { useState } from "react"
import { signup } from "@/app/actions/user"

export default function SignupComponent(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("")

  return (
    <div className = "flex flex-col justify-center h-screen">
        <div className = "flex justify-center">
            <div className = 'border rounded p-10'>
                <input className = 'p-2 m-2' type = 'text' placeholder = 'Username' onChange = {(e) => setUsername(e.target.value)}/>
                <br/>

                <input  className = 'p-2 m-2' type = 'password' placeholder = 'Password' onChange = {(e) => setPassword(e.target.value)}/>
                <br/>
                <div className = 'flex justify-center mt-4'>
                    <button  className = 'cursor-pointer' onClick = {async() => {
                        // await axios.post("http://localhost:3000/api/user", {
                        //     username,
                        //     password
                        // })
                        signup(username,password);
                    }}> Sign Up </button>
                </div>
            </div>
        </div>
    </div>
  )
}