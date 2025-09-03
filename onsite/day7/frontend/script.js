function signup(){
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch('http://localhost:4000/signup',{
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'name':name,
            'username':username,
            'password':password
        })
    }).then(data => data.json()).then(response => {
        document.getElementById('status').innerHTML = response.status;
        setTimeout(()=>{
            window.location.href = 'login.html'
        },1000);

    })
}

function login(){
    let username = document.getElementById('login_username').value;
    let password = document.getElementById('login_password').value;
    fetch('http://localhost:4000/signin',{
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'username':username,
            'password':password
        })
    }).then(data => data.json()).then(response => {
        if (response.status == "Your account doesnt exist or Your username/password is incorrect."){
            document.getElementById('login_status').innerHTML = response.status;
        }
        else{
            document.getElementById('login_status').innerHTML = response.status;
            document.cookie = `auth=${response.token}; path=/`;
            console.log(document.cookie);
            setTimeout(()=>{
                window.location.href = 'blog.html'
            },1000);
            
        }
        
    })
}

function getcookie(){
    let tok = document.cookie.split('auth=');
    tok = tok[tok.length-1];
    return tok;
}

function logout(){
    document.cookie = "auth=; max-age=0; path=/;";
    window.location.href = 'login.html'

}

function createblog(){
    let title = document.getElementById('blog-title').value
    let content = document.getElementById('blog-content').value
    let tok = getcookie();
    console.log(tok);
    fetch('http://localhost:4000/create-blog',{
        method: "POST",
        headers:{
            'Content-Type':'application/json',
            'token': tok
        },
        body:JSON.stringify({
            'title':title,
            'content':content
        })
    }).then(data => data.json()).then(response => {
        if (response.status == "blog added"){
             let element = document.createElement('div');
            element.innerHTML = `
            <span id = "${response.id}">
                <div class = 'title'> ${title} </div>
                <div class = 'content'>${content} </div>
                <button style = "color:orange;margin-left:10px;margin-top:10px"onclick = 'view(${response.id})'>
                    View
                </button>
                <button style = "color:red;margin-left:10px;margin-top:10px"onclick = 'del(${response.id})'>
                    Delete 
                </button>
             </span>
             `
            document.getElementById('blog-list').appendChild(element);
        }
    })
}

function del(id){
    let tok = getcookie();
    fetch('http://localhost:4000/delete-blog',{
        method: "POST",
        headers:{
            'Content-Type':'application/json',
            'token': tok
        },
        body:JSON.stringify({
            'id':id,
        })
    }).then(data => data.json()).then(response => {
        if (response.status == "deleted"){
            document.getElementById(id).remove();
        }
    })
}

function fetchtodo(){
    let tok = getcookie();
    fetch('http://localhost:4000/view-mine',{
        method: "POST",
        headers:{
            'Content-Type':'application/json',
            'token': tok
        },
        body:JSON.stringify({
        })
    }).then(data => data.json()).then(response => {
        if (response.status == "blogs yay"){
            let blog = document.getElementById('blog-list');
            blog.innerHTML = "";
            response.blogs.forEach(b => {
                let element = document.createElement('div');
                element.innerHTML = `
            <span id = "${b.id}">
                <div class = 'title'> ${b.title} </div>
                <div class = 'content'>${b.content} </div>
                <button style = "color:orange;margin-left:10px;margin-top:10px"onclick = 'view(${b.id})'>
                    View
                </button>
                <button style = "color:red;margin-left:10px;margin-top:10px"onclick = 'del(${b.id})'>
                    Delete 
                </button>
             </span>
             `
            document.getElementById('blog-list').appendChild(element);
            })
        }
    })
}

function fetchall(){
    let tok = getcookie();
    fetch('http://localhost:4000/view-all',{
        method: "POST",
        headers:{
            'Content-Type':'application/json',
            'token': tok
        },
        body:JSON.stringify({
        })
    }).then(data => data.json()).then(response => {
        if (response.status == "found all"){
            let blog = document.getElementById('blog-list');
            blog.innerHTML = "";
            response.blogs.forEach(b => {
                let element = document.createElement('div');
                element.innerHTML = `
            <span id = "${b.id}">
                <div class = 'title'> ${b.title} </div>
                <div class = 'content'>${b.content} </div>
                <button style = "color:orange;margin-left:10px;margin-top:10px"onclick = 'view(${b.id})'>
                    View
                </button>
             </span>
             `
            document.getElementById('blog-list').appendChild(element);
            })
        }
    })
}

function leave(){
    window.location.href = 'blog.html'
   
}

function view(id){
    let tok  = getcookie();
    window.location.href = `http://localhost:4000/view-one/${id}?token=${tok}`;
}


window.addEventListener('DOMContentLoaded', () => {
  let tok  = getcookie();
  let path = window.location.pathname;

  if (tok && path.endsWith('blog')) {
    fetchtodo();
  }
  else if (tok && path.endsWith('all-blogs')){
    fetchall();
  }
});

function viewallblogs(){
    window.location.href = 'all-blogs.html'
    
}

