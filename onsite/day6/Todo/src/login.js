import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [status,setStatus] = useState('');
  function login(){
    fetch('http://localhost:5000/signin',{
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
        document.cookie = `auth=${response.token}; path=/`;
        if (response.status === 'You are logging in.'){
            setTimeout(()=>{
                navigate('/todo');
            },1000);
        }
    })
  }

  function gosignup(){
    setTimeout(() => {
      navigate('/signup');
    },1000)
    
  } 

  return (
   <div className= 'login'> {/*use className instead of class*/}
      <h1>Login Details</h1>
      <div>Enter Username</div>
      <div><input id = 'login_username' type = 'text' placeholder = '...' value = {username} onChange = {(e) => setUsername(e.target.value)}/></div>
      <div>Enter Password</div>
      <div><input id = 'login_password' type = 'password' placeholder = '...' value = {password} onChange = {(e) => setPassword(e.target.value)}/></div>
      <button className = 'btn' type = 'button' onClick = {login}>Login</button> {/*onclick should be onClick*/}
      <button className = 'btn' type = 'button' onClick = {gosignup}>Signup</button>
      <div id = 'login_status'>{status}</div>
   </div> 
  );
}

export default Login;
