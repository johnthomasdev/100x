import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  return(
    <div style = {{
      display:"flex",
      flexDirection:"column",
      gap:"5px",
      width:"250px"
    }}>
      <input value = {name} type = "text" placeholder = "Enter your name" onChange = {(e) => setName(e.target.value)} ></input>
      <input value = {username} type = "text" placeholder = "Enter your username" onChange = {(e) => setUsername(e.target.value) } ></input>
      <input value = {password} type = "password" placeholder = "Enter password" onChange =  {(e) => setPassword(e.target.value) }></input>
      <button onClick = {alert( () => {
        `name = ${name} username = ${username} password = ${password}`
      })}></button>
    </div>
  )
}

export default App;
