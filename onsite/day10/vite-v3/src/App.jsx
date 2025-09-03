import { useState } from 'react'
import './App.css'

function App() {
  const [count,setCount] = useState(0);
  return (
    <>
      <div>Current count: {count}</div>
      <IncreaseCount count = {count} setCount = {setCount}></IncreaseCount>
      <DecreaseCount count = {count} setCount = {setCount}></DecreaseCount>
    </>
  )
}

function IncreaseCount(props){

  function increase(){
    props.setCount(props.count + 1)
  }

  return(
    <button onClick = {increase}>Increase</button>
  )
}

function DecreaseCount(props){

  function decrease(){
    props.setCount(props.count - 1)
  }

  return (
    <button onClick = {decrease}>Decrease</button>
  )
}

export default App
