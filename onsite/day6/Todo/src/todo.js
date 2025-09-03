import './todo.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

function Todo(){
    let navigate = useNavigate();
    const [query,setQuery] = useState('');
    const [todos,setTodos] = useState([]);

    function fetchtodo(){
        let tok = getcookie();
        fetch('http://localhost:3000/fetch',{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'cookie':tok
            })
        }).then(data => data.json()).then(response => {
            if (response.status === "success"){
                let todo = document.getElementById('todo-list');
                todo.innerHTML = "";
                response.todo.forEach((todo,index) => {
                    let element = document.createElement('div');
                    element.innerHTML = `<span id = "${index}">${todo} <button style = "color:red;margin-left:10px"onclick = 'del(${index})'> Delete </button></span>`
                    document.getElementById('todo-list').append(element);
                })
            }
        })
    }

    useEffect(() => {
        let tok = getcookie();
        if(tok){
            fetchtodo();
        }
        else{
            navigate('/');
        }
    },[]);
    // [] makes it run only once

    function add(){
        
    }
    

    function getcookie(){
        let tok = document.cookie.split('; auth=');
        tok = tok[tok.length-1];
        return tok;
    }

    function logout(){
        let tok = getcookie();
        fetch('http://localhost:3000/logout',{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'token':tok
            })
        }).then(data => data.json()).then(response => {
            document.cookie = "auth=; max-age=0; path=/;";
            setTimeout(()=>{
                navigate('/');
            },1000);
        })
    }

    return(
        <div className = 'todo'>
            <div id = 'todo'>
            <h1>Todos</h1>
            <button id = 'add' onClick = {add}>Add Todo</button>
            <input id = 'query' type = 'text' placeholder = 'Enter todo..' value = {query} onChange={(e) => setQuery(e.target.value)}/>
            <div id = 'todo-list'></div>
            </div>
            <button id = 'logout' onClick = {logout}>Logout</button>
        </div>
    )
}

export default Todo;