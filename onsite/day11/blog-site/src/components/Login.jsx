import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [stat,setStat] = useState('');
    let navigate = useNavigate();

    function login(){
        axios.post('http://localhost:4000/signin',{
            "username":username,
            "password":password
        }).then(res => {
            setStat(res.data.status);
            if (res.data.status != 'Error Occurred'){
                document.cookie = `auth=${res.data.token}; path=/`;
                setTimeout(() => {
                    navigate('/blogs')
                },1000)
            }
        })
    }

    function signup(){
        setTimeout(() => {
            navigate('/signup')
        },1000)
    }    

    return(
        <>  
            <h1>LOGIN DETAILS</h1>
            <input type = 'text' placeholder = 'Enter Username' value = {username} onChange = {(e) => setUsername(e.target.value)}></input>
            <input type = 'text' placeholder = 'Enter Password' value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
            <button onClick = {login}>Login</button>
            <button onClick = {signup}>Signup</button>
            <div>{stat}</div>
        </>
    )
}

export default Login;