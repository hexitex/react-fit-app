// const square=
// function(x){return x*x; 

// }

// // const sArrow=(x)=>
// // {
// // return x*x;
// // }
// const sArrow=(x)=>x*x;
// console.log('sArrow',sArrow(9));


// const getFirstName=(fullname)=>fullname.split(' ')[0];

// console.log('firstname',getFirstName('rob mcglade'))

// agarguments object are no longer bound with the arrow functions

// const add= (a,b)=>
// {
// //console.log(arguments);
//     return a+b;
// }
// console.log('a+b',add(1,2))
// this is no longer bound with arrow functions
// const user={
//     name:'rob',
//     citys:['peckham','hampton','surbiton'],
//     printPlacesLived(){
//        // const cityMessages= this.citys.map((city)=>{
//         return this.citys.map((city)=> this.name+' has lived in '+city);
//         }
//                 // this.citys.forEach((city)=>{
//         //     console.log(this.name+' has lived in '+city);
//         // })
//     }

const multiply={
    numbers:[1,2,3,4,5,6],
    multiplyBy:3,
    multiply(){return this.numbers.map((num)=> num*this.multiplyBy)}
        
}

//console.log(user.printPlacesLived());
console.log(multiply.multiply());
//user.printPlacesLived();
