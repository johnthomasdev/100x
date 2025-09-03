function signup(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch('http://localhost:3000/signup',{
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'username':username,
            'password':password
        })
    }).then(data => data.json()).then(response => {
        document.getElementById('status').innerHTML = response.status;
        setTimeout(()=>{
            window.location.href = 'index.html'
        },1000);

    })
}

function login(){
    let username = document.getElementById('login_username').value;
    let password = document.getElementById('login_password').value;
    fetch('http://localhost:3000/signin',{
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'username':username,
            'password':password
        })
    }).then(data => data.json()).then(response => {
        document.getElementById('login_status').innerHTML = response.status;
        document.cookie = `auth=${response.token}; path=/`;
        console.log(document.cookie);
        if (response.status == 'You are logging in.'){
            setTimeout(()=>{
                window.location.href = 'todo.html'
            },1000);
        }
    })
}

function gosignup(){
    setTimeout(()=>{
        window.location.href = 'signup.html'
    },1000);
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
            window.location.href = 'index.html'
        },1000);
    })
}

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
        if (response.status == "success"){
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

window.onload = function(){
    let tok = getcookie();
    if(tok){
        fetchtodo();
    }
    else{
        window.location.href = 'login.html';
    }
}

function add(){
    let todo = document.getElementById('query').value
    let tok = getcookie();
    fetch('http://localhost:3000/add-todo',{
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'todo':todo,
            'cookie':tok
        })
    }).then(data => data.json()).then(response => {
        if (response.status == "Todo added"){
            let element = document.createElement('div');
            element.innerHTML = `<span id = "${response.index}">${todo} <button style = "color:red;margin-left:10px"onclick = 'del(${response.index})'> Delete </button></span>`
            document.getElementById('todo-list').appendChild(element);
        }
    })
}

function del(index){
    let d = document.getElementById(index);
    let tok = getcookie();
    fetch('http://localhost:3000/delete-todo',{
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'index':index,
            'cookie':tok
        })
    }).then(data => data.json()).then(response => {
        if (response.status == "deleted"){
            document.getElementById(index).remove();
        }
    })
}