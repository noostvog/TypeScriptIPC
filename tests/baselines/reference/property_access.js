//// [property_access.ts]
interface PrivateMessage {
  text?: string;
  userid?: number;
  screenname?: string;
} constrains {
  present(text);
  or(and(present(userid), not(present(screenname))),
     and(not(present(userid)), present(screenname)));
}

let msg: PrivateMessage = {text: "Hello", userid: 42}; //OK

function getUser(msg3: PrivateMessage) {
  msg3.text; //OK
  msg3.userid; //ERROR
  if (msg3.userid) {
    msg3.userid;     //OK: number
    msg3.screenname; //OK: undefined
  } else {
    msg3.userid;     //OK: undefined
    msg3.screenname; //OK: string
  }
}

let msg1: PrivateMessage = {text: "Hello", userid: 42}; //OK
getUser(msg1); //OK
getUser({text: "Hello", userid: 42, screenname: "Alice"}); //ERROR


//// [property_access.js]
var msg = { text: "Hello", userid: 42 }; //OK
function getUser(msg3) {
    msg3.text; //OK
    msg3.userid; //ERROR
    if (msg3.userid) {
        msg3.userid; //OK: number
        msg3.screenname; //OK: undefined
    }
    else {
        msg3.userid; //OK: undefined
        msg3.screenname; //OK: string
    }
}
var msg1 = { text: "Hello", userid: 42 }; //OK
getUser(msg1); //OK
getUser({ text: "Hello", userid: 42, screenname: "Alice" }); //ERROR
