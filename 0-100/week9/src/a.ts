// let x:number = 1;
// x = 'hi';
// console.log(x);

// function greet(firstname: string,age?: number){
    // console.log("hello" + firstname + age);
// }
// 
// greet("john");

// function sum(a:number,b:number): number{
    // return a + b;
// }
// 
// const value = sum(5,6);
// console.log(value);

// function legal(age:number):boolean{
    // return age > 18
// }
// 
// console.log(legal(11))

// function calling(fn: () => void){
    // setTimeout(fn,1000);
// }
// 
// calling(() => {
    // console.log("hi");
// })
// 
// interface User{
    // firstName: string,
    // age:number
// }
// 
// function legal(user: User){
    // return user.age > 18
// }
// 
// console.log(legal({
    // firstName:"john",
    // age:0
// }))

// interface Person{ //can use type instead but we do type Person = {}
    // name: string,
    // age:number,
    // greet(quote:string):void 
// }
// class Employee implements Person{
    // name:string;
    // age:number;
// 
    // constructor(n:string, a:number){
        // this.name = n;
        // this.age = a;
    // }
    // greet(quote:string){
        // console.log(`${quote} ${this.name}`);
    // }
// 
// }
// 
// const e = new Employee("john",22);
// e.greet('hi');
// console.log(e.name,e.age);
// 

// type typearg = number | string;
// 
// function greet(id:typearg){ //type is useful when it comes to doing like || , & (for joining two types or interfaces or either one  )
// function greet(id:(number|string)){
    // console.log("Hi this is a " , typeof(id));
// }
// 
// greet(5);
// greet('5');

// type Keyinput = "up"|"down"|"left"|"right"
 
// enum Direction{
//     Up,
//     Down,
//     Left,
//     Right
// }
// // 
// // function dosomething(keypressed:Keyinput){
// function dosomething(keypressed: Direction){
//     //boing
//     if (keypressed == Direction.Up){

//     }
// }

// // dosomething("up")
// dosomething(Direction.Up);

function identity <T>(arg:T){ //Generic function you pass in the type when calling it
    return arg;
}
console.log(identity<string>('hi').toUpperCase());
console.log(identity<number>(8));
