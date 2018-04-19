//// [property_assign.ts]
interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
    or(and(present(userid), not(present(screenname))),
        and(not(present(userid)), present(screenname)));
}

//Interface to Interface Assignment
interface PrivateMessage1 {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
    present(screenname);
    present(userid);
}

interface PrivateMessage2 {
    text?: string;
    userid?: number;
} constrains {
    present(text);
    present(userid);
}

interface PrivateMessage3 {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
}

let msg9: PrivateMessage1 = {text: "Hello", userid: 42, screenname: "Alice"}; //OK
let msg10: PrivateMessage2 = msg9; //ERROR
let msg11: PrivateMessage = msg10; //OK

let pm0: PrivateMessage = {text: "Hello", screenname: "Alice"}; //OK
let pm1: PrivateMessage1 = {text: "Hello", userid: 42, screenname: "Alice"}; //OK
let pm2: PrivateMessage2 = {text: "Hello", userid: 42}; //OK
let pm3: PrivateMessage3 = {text: "Hello"}; //OK

let pm4: PrivateMessage = pm0; //OK
let pm5: PrivateMessage = pm1; //ERROR
let pm6: PrivateMessage = pm2; //OK
let pm7: PrivateMessage = pm3; //ERROR

let pm8: PrivateMessage1 = pm0; //ERROR
let pm9: PrivateMessage1 = pm1; //OK
let pm10: PrivateMessage1 = pm2; //ERROR
let pm11: PrivateMessage1 = pm3; //ERROR

let pm12: PrivateMessage2 = pm0; //ERROR
let pm13: PrivateMessage2 = pm1; //ERROR
let pm14: PrivateMessage2 = pm2; //OK
let pm15: PrivateMessage2 = pm3; //ERROR

let pm16: PrivateMessage3 = pm0; //OK
let pm17: PrivateMessage3 = pm1; //OK
let pm18: PrivateMessage3 = pm2; //OK
let pm19: PrivateMessage3 = pm3; //OK

if (pm3.userid) {
    let pm20: PrivateMessage = pm3; //ERROR
    let pm21: PrivateMessage1 = pm3; //ERROR
    let pm22: PrivateMessage2 = pm3; //ERROR
    if (pm3.screenname) {
        let pm23: PrivateMessage = pm3; //ERROR
        let pm24: PrivateMessage1 = pm3; //OK
        let pm25: PrivateMessage2 = pm3; //ERROR
    } else {
        let pm26: PrivateMessage = pm3; //OK
        let pm27: PrivateMessage1 = pm3; //ERROR
        let pm28: PrivateMessage2 = pm3; //OK
    }
}

if (pm0.userid) {
    let pm29: PrivateMessage2 = pm0; //OK
}

let pm30: PrivateMessage = pm1; //ERROR
let pm31: PrivateMessage = pm2; //OK
let pm32: PrivateMessage = pm3; //ERROR

//Interface to Object Assignment
let pm: PrivateMessage = {text: "Hallo", screenname: "Alice"}; //OK
let obj1: {text: string, screenname: string} = pm; //ERROR
let obj2: {text: string, screenname?: string} = pm; //OK
let obj3: {text: string, screenname: undefined, userid: number} = pm; //ERROR
let obj4: {text: string, screenname?: string, userid?: number} = pm; //OK
let obj5: {text: string, screenname?: boolean, userid?: boolean} = pm; //ERROR
let obj6: {text: string, unknownProperty?: number} = pm; //ERROR
let obj7: {text: string, unknownProperty: number} = pm; //ERROR
let obj8: {text:string, screenname: string, userid: undefined} = pm; //ERROR

if (pm.screenname) {
    let obj9: {screenname: string} = pm; //OK
    let obj15: {userid: number} = pm; //ERROR
    let obj10: {text: string, screenname: string} = pm; //OK
    let obj11: {text: string, screenname: number} = pm; //ERROR
    let obj12: {text: string, screenname?: string} = pm //OK
    let obj13: {text:string, screenname: string, userid: undefined} = pm; //OK
    let obj14: {text:string, screenname: undefined, userid: number} = pm; //ERROR
} else {
    let obj16: {screenname: string} = pm; //ERROR
    let obj17: {userid: number} = pm; //OK
    let obj18: {text: string, screenname: string} = pm; //ERROR
    let obj19: {text: string, userid: number} = pm; //OK
    let obj21: {text:string, screenname: string, userid: undefined} = pm; //ERROR
    let obj22: {text:string, screenname: undefined, userid: number} = pm; //OK
}

let obj25: {text: string, screenname: string} = pm; //ERROR
let obj27: {text: string, userid: number} = pm; //ERROR
let obj23: {text:string, screenname: string, userid: undefined} = pm; //ERROR
let obj24: {text:string, screenname: undefined, userid: number} = pm; //ERROR
let obj26: {text:string} = pm; //OK


//// [property_assign.js]
var msg9 = { text: "Hello", userid: 42, screenname: "Alice" }; //OK
var msg10 = msg9; //ERROR
var msg11 = msg10; //OK
var pm0 = { text: "Hello", screenname: "Alice" }; //OK
var pm1 = { text: "Hello", userid: 42, screenname: "Alice" }; //OK
var pm2 = { text: "Hello", userid: 42 }; //OK
var pm3 = { text: "Hello" }; //OK
var pm4 = pm0; //OK
var pm5 = pm1; //ERROR
var pm6 = pm2; //OK
var pm7 = pm3; //ERROR
var pm8 = pm0; //ERROR
var pm9 = pm1; //OK
var pm10 = pm2; //ERROR
var pm11 = pm3; //ERROR
var pm12 = pm0; //ERROR
var pm13 = pm1; //ERROR
var pm14 = pm2; //OK
var pm15 = pm3; //ERROR
var pm16 = pm0; //OK
var pm17 = pm1; //OK
var pm18 = pm2; //OK
var pm19 = pm3; //OK
if (pm3.userid) {
    var pm20 = pm3; //ERROR
    var pm21 = pm3; //ERROR
    var pm22 = pm3; //ERROR
    if (pm3.screenname) {
        var pm23 = pm3; //ERROR
        var pm24 = pm3; //OK
        var pm25 = pm3; //ERROR
    }
    else {
        var pm26 = pm3; //OK
        var pm27 = pm3; //ERROR
        var pm28 = pm3; //OK
    }
}
if (pm0.userid) {
    var pm29 = pm0; //OK
}
var pm30 = pm1; //ERROR
var pm31 = pm2; //OK
var pm32 = pm3; //ERROR
//Interface to Object Assignment
var pm = { text: "Hallo", screenname: "Alice" }; //OK
var obj1 = pm; //ERROR
var obj2 = pm; //OK
var obj3 = pm; //ERROR
var obj4 = pm; //OK
var obj5 = pm; //ERROR
var obj6 = pm; //ERROR
var obj7 = pm; //ERROR
var obj8 = pm; //ERROR
if (pm.screenname) {
    var obj9 = pm; //OK
    var obj15 = pm; //ERROR
    var obj10 = pm; //OK
    var obj11 = pm; //ERROR
    var obj12 = pm; //OK
    var obj13 = pm; //OK
    var obj14 = pm; //ERROR
}
else {
    var obj16 = pm; //ERROR
    var obj17 = pm; //OK
    var obj18 = pm; //ERROR
    var obj19 = pm; //OK
    var obj21 = pm; //ERROR
    var obj22 = pm; //OK
}
var obj25 = pm; //ERROR
var obj27 = pm; //ERROR
var obj23 = pm; //ERROR
var obj24 = pm; //ERROR
var obj26 = pm; //OK
