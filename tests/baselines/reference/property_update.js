//// [property_update.ts]

interface PrivateMessage {
  text?: string;
  userid?: number;
  screenname?: string;
} constrains {
  present(text);
  or(and(present(userid), not(present(screenname))),
     and(not(present(userid)), present(screenname)));
}

function setMsg(msg: PrivateMessage, text: string, userid: number) {
  msg.text = text;      //OK
  msg.text = undefined; //ERROR
  msg.userid = userid;  //ERROR

  if (msg.userid) {
    msg.userid = userid;        //OK
    msg.screenname = undefined; //OK
  }
}
let msg: PrivateMessage = {text: "Hello", userid: 42};
let msg1: PrivateMessage = objupdate(msg, {userid: undefined, screenname: "Alice"});

function changeIdToName(msg: PrivateMessage): PrivateMessage {
  if (msg.ruserid) {
    objupdate(msg, {userid: undefined, screenname: "Alice"}); //ERROR
    //The object msg contains an extra constraint inside this if statement
    //For the update to succeed, the first argument must be of the original type
    //So it is first casted back
    let msg2: PrivateMessage = msg
    return objupdate(msg2, {userid: undefined, screenname: "Alice"});
  }
  return msg;
}


//// [property_update.js]
function setMsg(msg, text, userid) {
    msg.text = text; //OK
    msg.text = undefined; //ERROR
    msg.userid = userid; //ERROR
    if (msg.userid) {
        msg.userid = userid; //OK
        msg.screenname = undefined; //OK
    }
}
var msg = { text: "Hello", userid: 42 };
var msg1 = ({ ...msg, ...{ userid: undefined, screenname: "Alice" }});
function changeIdToName(msg) {
    if (msg.ruserid) {
        { ...msg, ...{ userid: undefined, screenname: "Alice" }}; //ERROR
        //The object msg contains an extra constraint inside this if statement
        //For the update to succeed, the first argument must be of the original type
        //So it is first casted back
        var msg2 = msg;
        return { ...msg2, ...{ userid: undefined, screenname: "Alice" }};
    }
    return msg;
}
