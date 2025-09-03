// function setTimeoutPromisified(timeout){
//     return new Promise((resolve) => {setTimeout(resolve,timeout);});
// }

// setTimeoutPromisified(5000).then(() => {console.log("hi there");});

const fs = require('fs');
// const {exec} = require('child_process');

// exec('echo "Hey there" > a.txt',() => {console.log("File created");});

// fs.readFile('a.txt','utf-8',(err,data) => {
//     console.log(data);
// });

// function readPromisfied(file){
//     return new Promise((resolve) => {
//         fs.readFile(file,'utf-8',(err,data) => {
//             console.log(data);
//             resolve();
//         } )
//     });
// }

// readPromisfied('a.txt').then(() => {
//     console.log('File read.')
// })

function clean(file){
    return new Promise((resolve) => {
        fs.readFile(file,'utf-8',(err,data) => {
            console.log("Data from file is: ",data);
            let s = ""
            for (let i = 0; i < data.length; i++){
                if (data[i] != " "){
                    s += data[i];
                }
            }
            fs.writeFile(file,s, () => {resolve();});
        })
    })
}

clean('a.txt').then(() => {console.log('File read and wrote')});