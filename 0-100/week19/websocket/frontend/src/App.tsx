import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [socket,setSocket] = useState<WebSocket | null>(null) //It  can either be websocket or null
  const [message,setMessage] = useState<string[]>([]);
  const [curr,setCurr] = useState("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => { //.onopen is basically a property/attribute of socket
      console.log("Connected");
      console.log("Socket value is : ",socket)
      setSocket(socket); // we do this to check if socket opened else show loading screen
    }
    socket.onmessage = (event) => { //basically what do i do when the server sends message to me
      console.log("Recieved message: ",event.data);
      setMessage((m) => [...m,event.data])
    }
    return () => { // This works only when the component is being unmounte (removed from the website)
      console.log("Shutting down socket");
      socket.close();
    }
  },[])

  if (!socket){
    return <div>
      Loading...
    </div>
  }

  return (
    <>
      All Messages:
<div style = {{display: "flex", flexDirection: "column"}}> {message.map((m,index) => {
          return <div key = {index}>{m}</div>
        })
      }</div>

      <input type = 'text' placeholder = 'enter message' value = {curr} onChange = {(e) => setCurr(e.target.value)}></input>
      <button onClick = {() => {
        socket.send(curr);
        setCurr("");
      }}>Send</button>
    </>
  )
}

export default App
