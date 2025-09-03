function sum(a,b){
    return a + b;
}

let ans = sum(1,2);
console.log(ans)

function add(n){
    let res = 0;
    for(let i = 1; i <= n; i++){
        res += i;
    }
    return res;
}

console.log(add(3));

const fs = require('fs'); // loads the fs library

const contents = fs.readFileSync('a.txt','utf-8'); //utf-8 is like human readable text
console.log(contents); 

// Synchronous basically reads line by line waiting for the above line to finish asynchronous basically does multiple at same time like 
// try open multiple file and does the execution after first file opens 


console.log(fs.readFileSync('a.txt','utf-8') + ' ' + fs.readFileSync('b.txt','utf-8')); 

function read(err,data){
    console.log(data);
}

fs.readFile("a.txt","utf-8",function(err,data){ // Basically the function is executed after the file is read (Async function)
    console.log(data);
});

setTimeout(function(){
    console.log("ehahahhahah");
},1000); // Basically this calls the function() after 1000 = 1 second 

console.log("byebebebe")

class Rectangle{
    constructor(width,height,color){
        this.width = width;
        this.height = height;
        this.color = color;
    }
    area(){
        let area = this.width * this.height;
        return area;
    }
    paint(){
        let s = `Painting with ${this.color}`;
        return s;
    }
} 

const rect = new Rectangle(2,4,"red");
console.log(rect.area());
console.log(rect.paint());

let res = {
    width:1,
    height:2,
    area: function(){
        console.log(this.width*this.height);
    }
}
res.area();

console.log(new Date().toISOString());

const map = new Map(); //Different way of dictionary (objects)
map.set('name','John');
map.set('age',30);
console.log(map.get('name'));


// returns object of promise class
function setTimeoutPromisified(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

function callback(){
    console.log("3 seconds has passed");
}

setTimeoutPromisified(3000).then(callback);

function wait(resolve){
    setTimeout(resolve,3000);
}

function  main(){
    console.log("main");
}

wait(main);

setTimeout(function(){
    console.log("hi");
    setTimeout(function(){
        console.log("hello");
        setTimeout(function(){
            console.log("hello there");
        },5000);
    },3000);
},1000);

function bing(resolve){ // resolve is a function
    setTimeout(resolve,3000); // after the resolve gets done then display gets called
}

function setTimeoutPromisified(){
    return new Promise(bing); //after the resolve() is called then the .then is executed basically the function passed inside who's argument
                              //function is then called 
}

function display(){
    console.log("bang bong its over");
}

setTimeoutPromisified().then(display);

const fs = require('fs');

function rf(file){
    return new Promise(resolve => {
        fs.readFile(file,'utf-8',function(err,data){
            resolve(data);
        })
    });
}

function display(contents){
    console.log(contents);
}

rf('a.txt').then(display);

function setTimeoutPromisified(ms){
    return new Promise(resolve => {
        setTimeout(resolve,ms);
    })
}

async function solve(){
    await setTimeoutPromisified(1000); // syntaticaly looks better than that preivous call back hell
    console.log('hi');
    await setTimeoutPromisified(3000);
    console.log('hello');
    await setTimeoutPromisified(5000);  
    console.log('hi there');
    console.log(await rf('b.txt'));
}

solve();

let fs = require('fs');

function er(file){
    return new Promise(function (resolve,reject){
        fs.readFile(file,'utf-8',function(err,data){
            if (err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}

er('asdasd.txt').then(function(contents){
    console.log(contents);
}).catch(function(contents){
    console.log(contents);
})












