//// [paper.ts]
/* This file contains the code snippets from the paper. Error messages of TypeScriptIPC are shown for every error. */

// Section 2.1: Definition of interfaces with constraints
interface PrivateMessage {
  text?: string;
  userid?: number;
  screenname?: string;
} constrains {
  present(text);
  or(and(present(userid), not(present(screenname))),
     and(not(present(userid)), present(screenname)));
}

interface Picture {
  caption?: string;
  picture?: string;
  lat?: number;
  long?: number;
} constrains {
  present(caption);
  implic(present(lat), present(picture));
  implic(present(long), present(picture));
  iff(present(lat), present(long))
}

interface PrivateMessageStrict extends PrivateMessage {
  //inherit properties
} constrains {
  present(screenname);
}

// Section 2.2: Object creation
//IMPORTANT: no <cast>
let msg1: PrivateMessage = {text: "Hello", userid: 42}; //OK
let msg2: PrivateMessage = {text: "Hello"}; //ERROR
/*error TS2322: Type '{ text: string; }' is not assignable to type 'PrivateMessage'.
  Predicate or(and(present(userid),not(present(screenname))),and(not(present(userid)),present(screenname))) was not satisfied in type { text: string; }*/
let msg3: PrivateMessage = {text: "Hello", userid: 42, screenname: "Alice"}; //ERROR
/*error TS2322: Type '{ text: string; userid: number; screenname: string; }' is not assignable to type 'PrivateMessage'.
  Predicate or(and(present(userid),not(present(screenname))),and(not(present(userid)),present(screenname))) was not satisfied in type { text: string; userid: number; screenname: string; }*/
let msg4: PrivateMessageStrict = {text: "Hello", screenname: "Alice"}; //OK
let msg5: PrivateMessageStrict = {text: "Hello", userid: 42}; //ERROR
/*error TS2322: Type '{ text: string; userid: number; }' is not assignable to type 'PrivateMessageStrict'.
  Predicate present(screenname) was not satisfied in type { text: string; userid: number; }
    Property 'screenname' is missing in type '{ text: string; userid: number; }'.*/

// Section 2.3: Property access
function getUserId(msg: PrivateMessage): number {
  return msg.userid; //ERROR
  /*error TS95009: Cannot access userid from the object because its interface does not contain the predicate present(userid). Use a non-undefined type guard.*/
}

function getUser(msg: PrivateMessage) {
  if (msg.userid) {
    msg.userid;     //OK: number
    msg.screenname; //OK: undefined
  } else {
    msg.userid;     //OK: undefined
    msg.screenname; //OK: string
  }
}

function getLocation(picture: Picture) {
  if (picture.long) {
    picture.long;    //OK: number
    picture.lat;     //OK: number
    picture.picture; //OK: string
  }
}

// Section 2.4: Property update
function setMsg(msg: PrivateMessage, text: string, userid: number) {
  msg.text = text;      //OK
  msg.text = undefined; //ERROR
  /*error TS2322: Type 'undefined' is not assignable to type 'string'.*/
  msg.userid = userid;  //ERROR
  /*error TS95009: Cannot access userid from the object because its interface does not contain the predicate present(userid). Use a non-undefined type guard.*/
  if (msg.userid) {
    msg.userid = userid;        //OK
    msg.screenname = undefined; //OK
  }
}

let msg6: PrivateMessage = {text: "Hello", userid: 42};
let msg7: PrivateMessage = objupdate(msg6, {userid: undefined, screenname: "Alice"}); //OK
let msg8: PrivateMessage = objupdate(msg6, {userid: undefined}); //ERROR
/*
error TS2322: Type '{ userid: undefined; }' is not assignable to type 'PrivateMessage'.
  Predicate or(and(present(userid),not(present(screenname))),and(not(present(userid)),present(screenname))) was not satisfied in type { userid: undefined; }
error TS95021: All properties from the predicates in which the properties of the second argument are mentioned, must be a part of the second argument*/

// Section 3.4: Interface-interface compatibility
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

let msg9: PrivateMessage1 = {text: "Hello", userid: 42, screenname: "Alice"}; //OK
let msg10: PrivateMessage2 = msg9; //ERROR
/*error TS2322: Type 'PrivateMessage1' is not assignable to type 'PrivateMessage2'.
  Invalid assignment of type PrivateMessage1 tot type PrivateMessage2. Check if predicates are correct*/
let msg11: PrivateMessage = msg10; //OK

// Section 3.5: Updated objects have to satisfy constraints
interface PrivateMessage3 {
  text?: string;
  ruserid?: number;
  rscreenname?: string;
  suserid?: number;
  sscreenname?: string
} constrains {
  present(text);
  or(and(present(ruserid), not(present(rscreenname))),
     and(not(present(ruserid)), present(rscreenname)));
  or(and(present(suserid), not(present(sscreenname))),
     and(not(present(suserid)), present(sscreenname)));
}

let msg12: PrivateMessage3 = {text: "Hello", ruserid: 42, suserid: 43};   //OK
let msg13 = objupdate(msg12, {ruserid: undefined, rscreenname: "Alice"}); //OK

function changeIdToName(msg: PrivateMessage3): PrivateMessage3 {
  if (msg.ruserid) {
    objupdate(msg, {ruserid: undefined, rscreenname: "Alice"}); //NOK
    /*error TS2322: Type '{ ruserid: undefined; rscreenname: string; }' is not assignable to type 'PrivateMessage3'.
      Predicate present(ruserid) was not satisfied in type { ruserid: undefined; rscreenname: string; }
        Property 'ruserid' is missing in type '{ ruserid: undefined; rscreenname: string; }'.*/
        
    //The object msg contains an extra constraint inside this if statement
    //For the update to succeed, the first argument must be of the original type
    //So it is first casted back
    let msg2: PrivateMessage3 = msg
    return objupdate(msg2, {ruserid: undefined, rscreenname: "Alice"});
  }
  return msg;
}


//// [paper.js]
/* This file contains the code snippets from the paper. Error messages of TypeScriptIPC are shown for every error. */
// Section 2.2: Object creation
//IMPORTANT: no <cast>
var msg1 = { text: "Hello", userid: 42 }; //OK
var msg2 = { text: "Hello" }; //ERROR
/*error TS2322: Type '{ text: string; }' is not assignable to type 'PrivateMessage'.
  Predicate or(and(present(userid),not(present(screenname))),and(not(present(userid)),present(screenname))) was not satisfied in type { text: string; }*/
var msg3 = { text: "Hello", userid: 42, screenname: "Alice" }; //ERROR
/*error TS2322: Type '{ text: string; userid: number; screenname: string; }' is not assignable to type 'PrivateMessage'.
  Predicate or(and(present(userid),not(present(screenname))),and(not(present(userid)),present(screenname))) was not satisfied in type { text: string; userid: number; screenname: string; }*/
var msg4 = { text: "Hello", screenname: "Alice" }; //OK
var msg5 = { text: "Hello", userid: 42 }; //ERROR
/*error TS2322: Type '{ text: string; userid: number; }' is not assignable to type 'PrivateMessageStrict'.
  Predicate present(screenname) was not satisfied in type { text: string; userid: number; }
    Property 'screenname' is missing in type '{ text: string; userid: number; }'.*/
// Section 2.3: Property access
function getUserId(msg) {
    return msg.userid; //ERROR
    /*error TS95009: Cannot access userid from the object because its interface does not contain the predicate present(userid). Use a non-undefined type guard.*/
}
function getUser(msg) {
    if (msg.userid) {
        msg.userid; //OK: number
        msg.screenname; //OK: undefined
    }
    else {
        msg.userid; //OK: undefined
        msg.screenname; //OK: string
    }
}
function getLocation(picture) {
    if (picture.long) {
        picture.long; //OK: number
        picture.lat; //OK: number
        picture.picture; //OK: string
    }
}
// Section 2.4: Property update
function setMsg(msg, text, userid) {
    msg.text = text; //OK
    msg.text = undefined; //ERROR
    /*error TS2322: Type 'undefined' is not assignable to type 'string'.*/
    msg.userid = userid; //ERROR
    /*error TS95009: Cannot access userid from the object because its interface does not contain the predicate present(userid). Use a non-undefined type guard.*/
    if (msg.userid) {
        msg.userid = userid; //OK
        msg.screenname = undefined; //OK
    }
}
var msg6 = { text: "Hello", userid: 42 };
var msg7 = ({ ...msg6, ...{ userid: undefined, screenname: "Alice" }}); //OK
var msg8 = ({ ...msg6, ...{ userid: undefined }}); //ERROR
var msg9 = { text: "Hello", userid: 42, screenname: "Alice" }; //OK
var msg10 = msg9; //ERROR
/*error TS2322: Type 'PrivateMessage1' is not assignable to type 'PrivateMessage2'.
  Invalid assignment of type PrivateMessage1 tot type PrivateMessage2. Check if predicates are correct*/
var msg11 = msg10; //OK
var msg12 = { text: "Hello", ruserid: 42, suserid: 43 }; //OK
var msg13 = { ...msg12, ...{ ruserid: undefined, rscreenname: "Alice" }}; //OK
function changeIdToName(msg) {
    if (msg.ruserid) {
        { ...msg, ...{ ruserid: undefined, rscreenname: "Alice" }}; //NOK
        /*error TS2322: Type '{ ruserid: undefined; rscreenname: string; }' is not assignable to type 'PrivateMessage3'.
          Predicate present(ruserid) was not satisfied in type { ruserid: undefined; rscreenname: string; }
            Property 'ruserid' is missing in type '{ ruserid: undefined; rscreenname: string; }'.*/
        //The object msg contains an extra constraint inside this if statement
        //For the update to succeed, the first argument must be of the original type
        //So it is first casted back
        var msg2_1 = msg;
        return { ...msg2_1, ...{ ruserid: undefined, rscreenname: "Alice" }};
    }
    return msg;
}
