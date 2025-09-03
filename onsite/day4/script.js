function max(){
    const num1 = document.getElementById('one').value;
    const num2 = document.getElementById('two').value;
    const num3 = document.getElementById('three').value;
    const num4 = document.getElementById('four').value;
    fetch(`http://localhost:3000/large/${num3}/?one=${num1}`,{
        method: "PUT",
        headers:{
            "Content-Type":"application/json",
            "d":num4
        },
        body:JSON.stringify({
            "num":num2
        })
    }).then(res => res.text()).then(response =>{
        document.getElementById('result').innerHTML = response;
    })
}