import './signup.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Signup(){
    let navigate = useNavigate();
    /*username is the value being updated and setUsername is the function that updates it*/
    const [username,setUsername] = useState('');
    // username = '' because of useState()
    const [password,setPassword] = useState('');
    const [status,setStatus] = useState('');
    
    function signup(){
        fetch('http://localhost:5000/signup',{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'username':username,
                'password':password
            })
        }).then(data => data.json()).then(response => {
            setStatus(response.status);
            setTimeout(()=>{
                navigate('/');
            },1000);

        })
    }

    return(
        <div className= 'signup'> 
            <h1>Sign Up Details</h1>
            <div>Enter Username</div>
            <div><input id = 'username' type = 'text' placeholder = '...' value = {username} onChange = {(e) => setUsername(e.target.value)}/></div>
                                            {/*e is the event e.target refers to the tag and .value refers to value inside */}
            <div>Enter Password</div>
            <div><input id = 'password' type = 'password' placeholder = '...' value = {password} onChange = {(e) => setPassword(e.target.value)} /></div>
            <button id = 'btn' type = 'button' onClick = {signup}>Signup</button>
            <div id = 'status'>{status}</div>
        </div>
    );
}


export default Signup;