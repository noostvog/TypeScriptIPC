/* This file contains the code snippets from the paper. */
// Section 2.2: Object creation
//IMPORTANT: no <cast>
var msg1 = { text: "Hello", userid: 42 }; //OK
var msg2 = { text: "Hello" }; //ERROR
var msg3 = { text: "Hello", userid: 42, screenname: "Alice" }; //ERROR
var msg4 = { text: "Hello", screenname: "Alice" }; //OK
var msg5 = { text: "Hello", userid: 42 }; //ERROR
// Section 2.3: Property access
function getUserId(msg) {
    return msg.userid; //ERROR
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
    msg.userid = userid; //ERROR
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
var msg11 = msg10; //OK
var msg12 = { text: "Hello", ruserid: 42, suserid: 43 }; //OK
var msg13 = { ...msg12, ...{ ruserid: undefined, rscreenname: "Alice" }}; //OK
