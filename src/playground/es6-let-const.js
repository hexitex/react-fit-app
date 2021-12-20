var namevar='andrew';
namevar='mike';
console.log('namevar',namevar);
let namelet='jen';
 namelet='julie';
console.log('namelet',namelet);
const nameconst='frank';
console.log('nameconst',nameconst)

//lock scoping
var fullName='Rob McGlade';
if (fullName){
    var firstName=fullName.split(' ')[0]
    console.log('firstname',firstName);
}
