// es6 classes

//person

class Person {
    constructor(name='Anonymous',age=0) {
        this.name=name;
        this.age=age;
    }
    getGreeting(){
        return `Hi I am ${this.name}`
    }   
    getDescription(){
        return `${this.name} is ${this.age} years old`
    }  
}

class Student extends Person {

    constructor (name,age,field){
        super(name,age);
        this.field=field;
    }

    hasField(){
        return !!this.field
    }  

    getDescription(){
        let description =super.getDescription()
        if (this.hasField())
        {
            description+=' and is studying '+this.field;   
        }
        return description;
    }   
}

class Traveller extends Person{
    constructor(name,age,location){
        super(name,age);
        this.location=location;

    }
    hasLocation(){
        return !!this.location
    }
    getGreeting(){
        let greeting=super.getGreeting();
        if (this.hasLocation)
        {
            greeting+=` and I come from ${this.location}`
        }
        return greeting;

    }
}

const me = new Traveller('Robert McGlade',49,'Hampton');
const metoo = new Student('Robert McGlade',49);

console.log(metoo.getDescription(),me.getGreeting());