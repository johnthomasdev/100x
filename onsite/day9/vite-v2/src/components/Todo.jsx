import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Todo(){
    const [todo,setTodo] = useState([]);
    const [newtodo, setnewTodo] = useState('');
    const [status,setStatus] = useState('');
    let navigate = useNavigate();

     function getcookie(){
        let tok = document.cookie.split('; auth=');
        tok = tok[tok.length-1];
        return tok;
    }

    useEffect(() =>{
        axios.post('http://localhost:4000/view-mine',{
        },{
            headers: {
                'Content-Type':"application/json",
                "token":getcookie()
            }
        }).then(res => { //Get back status and id to put as div
            if (res.data.status  == "todos yay"){
                setTodo(res.data.todos);
            }
        })
    },[])

    function addTodo(){
        axios.post('http://localhost:4000/create-todo',{
            "content":newtodo
        },{
            headers: {
                'Content-Type':"application/json",
                "token":getcookie()
            }
        }).then(res => { //Get back status and id to put as div
            setStatus(res.data.status);
            setTodo([...todo,{id:res.data.id,content:newtodo}]);
            setnewTodo('');
        })
    }

    function deleteTodo(id){
        axios.post('http://localhost:4000/delete-todo',{
            "id":id
        },{
             headers: {
                'Content-Type':"application/json",
                "token":getcookie()
            }
        }).then(res => {
            if (res.data.status === "deleted") {
                setTodo(todo.filter((item) => item.id != id))
            }
        })
    }

    function logout(){
        document.cookie = "auth=; max-age=0; path=/;";
        setTimeout(() => {
                navigate('/')
        },1000)
    }

    return(
        <div id = 'todo-page'>
            <h1>YOUR TODOS</h1>
            <input type = "text" placeholder = "Enter your todo" value = {newtodo} onChange = {(e) => setnewTodo(e.target.value)}></input>
            <button onClick = {addTodo}>Add Todo</button>

            <div id = 'todo-list'>{todo.map((item) => <div key = {item.id}>{item.content} <button onClick = {() => deleteTodo(item.id)}>Delete</button></div>)}</div>
        
            <button onClick = {logout}>Logout</button>
        </div>
    )
}
export default Todo;