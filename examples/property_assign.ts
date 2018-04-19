// @strictNullChecks: true
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
