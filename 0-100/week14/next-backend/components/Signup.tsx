"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

export default function SignupComponent(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); //This is basically the navigation here
    return (
        <div className = "flex flex-col justify-center h-screen">
            <div className = 'flex justify-center'>
                <div className = 'border p-8 rounded'>
                    <Labelledinput onChange={(e) => {
                            setUsername(e.target.value);
                        }} label="Username" placeholder="harkirat@gmail.com" />
                    <Labelledinput onChange={(e) => {
                        setPassword(e.target.value)
                    }} label="Password" type={"password"} placeholder="123456" />
                    <div className="flex justify-center pt-5">
                        <button className="rounded hover:border cursor-pointer p-5" onClick = {async () => {
                            const response = await axios.post('http://localhost:3000/api/user',{
                                username,
                                password
                            });
                            router.push('/')
                        }} type = 'button'>
                            Signup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType{
    label:string;
    placeholder:string;
    type?:string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

function Labelledinput({label,placeholder,type,onChange}: LabelledInputType){
    return  <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}