function res(exp){
    let one = document.querySelector('#one').value;
    let two = document.querySelector('#second').value;
    let sum = eval(one + exp +  two);
    let d = document.querySelector('#result');
    d.innerHTML = sum;
}
