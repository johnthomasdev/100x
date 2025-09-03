// const input = document.querySelector('input'); // Finds the first input tag do querySelectorAll to get every thing and do [0]
// console.log(input.value);

// const h = document.querySelector('h1');
// console.log(h.innerHTML); // Get value of first h1 tag 

// function addTodo(){
//     console.log(document.querySelector('input').value);
// }

// console.log(document.getElementById('btn')); // you can use querySelector but use # before the name

// let s = document.querySelectorAll('.list')[0].innerHTML;
// let number = Number(s.split(")")[0]);
// let text = s.slice(s.indexOf(')') + 2);
// let i = number;

// function stopwatch(){
//     document.querySelectorAll('.list')[0].innerHTML = i + ') ' + text;
//     i += 1;
// }

//setInterval(stopwatch,1000); // Calls update every 1 second infinite times
  
// function del(index){
//     const element = document.querySelector('#list'+index);
//     element.parentNode.removeChild(element); // to remove something you need to call reomvechild from the parent class
// }

// let n = document.createElement('h3'); //creating the child
// n.innerHTML = 'yo testing';
// document.querySelector('#list1').appendChild(n); //appending the child to parent
let i = 0
function add(){
    let s = document.querySelector('#bar').value;
    let d = document.createElement('div');
    d.setAttribute('id',"todo"+i);
    d.innerHTML = s + "<button onclick = del("+i+") class = 'delbtn'> Delete </button>";
    document.querySelector('#list').appendChild(d);
    i += 1
}

function del(index){
    const element = document.getElementById("todo"+index);
    element.parentNode.removeChild(element);
}

