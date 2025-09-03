function sum(){
    const num1 = document.getElementById('one').value;
    const num2 = document.getElementById('two').value;
    fetch("http://localhost:3000/sum",{
        method: "POST",
        headers: { //tells its json format
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ //converts to json string
            "num1": num1,
            "num2": num2
        })
    }).then(res => res.text()).then((response) => { // res is response object , res.text() returns a promise 
    // to return as plain text after that response is the plain text
        let d = document.getElementById('result');
        d.innerHTML = response;
    })
}

function diff(){ //using axios
    const num1 = document.getElementById('one').value;
    const num2 = document.getElementById('two').value;
    axios.post("http://localhost:3000/diff",{
        "num1":num1,
        "num2":num2
    }).then( (response) => {
        document.getElementById("result").innerHTML = response.data;
    })
}

function mul(){ //path parameters
    const num1 = document.getElementById('one').value;
    const num2 = document.getElementById('two').value;
    axios.post("http://localhost:3000/mul/" + num1 + "/" +  num2,{
        "num1":num1,
        "num2":num2
    }).then( (response) => {
        document.getElementById("result").innerHTML = response.data.ans;
    })
}

function div(){ //query params
    const num1 = document.getElementById('one').value;
    const num2 = document.getElementById('two').value;
    axios.post(`http://localhost:3000/div?num1=${num1}&num2=${num2}`,{
        "num1":num1,
        "num2":num2
    }).then( (response) => {
        document.getElementById("result").innerHTML = response.data;
    })
}