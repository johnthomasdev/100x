let n = "john"; //can be changed
console.log(n);
const p = 10;
console.log(p);
let x = true;
console.log(x);
//p = 20; //const values cant be changed

let g = ["hey","man","whats up"];
console.log(g[0]);

let age = 18;    
let vote = age >= 18;
console.log(vote);

function greet(name){
    console.log("whats up " + name);
}
greet("john")

function adding(a,b){
    let s = a + b;
    return s;
}

console.log(adding(5,6));

function canVote(age){
    return age > 18;
}
console.log(canVote(6));

let u = 5;
if (u > 5){
    console.log("hey");
}
else{
    console.log("not hey")
}

let yy = ['hey','man','hows it','going'];

for(let i = 0; i < yy.length; i++){
    console.log(x[i]);
}

let y = {name: "john",age:21} // this is called object for some reason

console.log(y['age']) //x.name works too

function vote(x){
    return x.age >= 18;
}

let user = {name: "bing bong", age:18};
console.log(vote(user));

let z  = ['bing',2,true,{name:'yoink'}];
console.log(z[3]);

function vote(users){
    for(let i = 0; i < users.length; i++){
        if (users[i].age > 18 && users[i].gender == "m"){
            console.log(users[i].name);
        }
    }
}

let users = [{
        name: "john",
        age: 21,
        gender: "m"
    },
    {
        name: "boink",
        age:17,
        gender:"f"
    },
    {
        name: "lala",
        age:22,
        gender:"m"
    }
];

vote(users);



