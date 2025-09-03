const ax = require('axios'); //Promise based http client install using `npm install axios`
const fs = require('fs');
ax.get("https://raw.githubusercontent.com/dominictarr/random-name/refs/heads/master/first-names.json")
.then((res) => { // returns res like a dictionary which contains :data 
    let list = res.data;
        for (let i of list){
            let message = i + "\n";
            let s = i[0].toLowerCase() + '.txt';
            fs.appendFile(s,message,() => {});
        }});