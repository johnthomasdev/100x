import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [stat,setStat] = useState('');
    let navigate = useNavigate();  

    function signup(){
        axios.post('http://localhost:4000/signup',{
            "username":username,
            "password":password
        }).then(res => {
            setStat(res.data.status);
            if (res.data.status != "Error occurred"){
                setTimeout(() => {
                    navigate('/')
                },1000)
            }
        })
    }

    return(
        <>  
            <h1>SIGNUP DETAILS</h1>
            <input type = 'text' placeholder = 'Enter Username' value = {username} onChange = {(e) => setUsername(e.target.value)}></input>
            <input type = 'text' placeholder = 'Enter Password' value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
            <button onClick = {signup}>Signup</button>
            <div>{stat}</div>
        </>
    )
}
export default Signup;