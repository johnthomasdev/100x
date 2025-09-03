// import { useState } from 'react'
// import './App.css'

// function App() {
//   const [todo,setTodo] = useState([]);
//   const [newtodo, setnewTodo] = useState('');

//   return (
//     <>
//       <h1> Your Todos </h1>

//       <input type = "text" placeholder = "Enter your todo" value = {newtodo} onChange = {(e) => setnewTodo(e.target.value)}></input>

//       <button onClick = {() => {setTodo([...todo,newtodo])}}>Add Todo</button>

//       <div id = 'todo-list'>{todo.map((value,index) => <div key = {index}>{value} <button onClick = {() => {
//         setTodo(todo.filter((v,i) => i != index))
//       }}>Delete</button></div>)}</div>

//     </>
//   )
// }

// export default App
