import { useState,memo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <button onClick = {() => setCount(Math.random())}>Update stuff</button>
      <Header title = {count}/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Header title = "heyyyy"/>
      <Header title = "heyyyy"/>
      <Header title = "heyyyy"/>
      <Header title = "heyyyy"/>
      <Header title = "heyyyy"/> */}

    </>
  )
}

// const Header = memo(({title}) => {
//   return <div>
    
//     {title}s
//   </div>
// })

// function Header({title}){ //curly brackets immediately extracts it from props
//   const [number,setNumber] = useState(title)
//   return <div>
//     <button onClick = {() => setNumber(Math.random())}>Click to change to random number</button>
//     {number}
//   </div>
// }

export default App
 