function add(){
    let s = document.getElementById('thing').value;
    console.log(s);
    fetch('http://localhost:3000/add',{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "todo":s
        })
    }).then(data => data.text()).then(response => {
        console.log(response);
        let d = document.createElement('div');
        d.innerHTML = `<span id = "${response}"> ${s} </span> <button id = 'd${response}' onclick = 'del(${response})'>Delete </button>`;
        document.getElementById('todo-list').appendChild(d);
    })
}

function del(res){
    fetch('http://localhost:3000/del',{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "todo":res
        })
    }).then(data => data.text()).then(response => {
        let d = document.getElementById(res);
        let e = document.getElementById('d'+res);
        d.remove();
        e.remove();
    })
}

function show(){
    fetch('http://localhost:3000/show',{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "todo":"send"
        })
    }).then(data => data.json()).then(response => {
        let k = 0;
        let todo = document.getElementById('todo-list');
        todo.innerHTML = "";
        for (let i of response){
            let d = document.createElement('div');
            d.innerHTML = `<span id = "${k}"> ${i} </span> <button id = 'd${k}' onclick = 'del(${k})'>Delete </button>`;
            document.getElementById('todo-list').appendChild(d);
            k += 1;
        }
    })
}