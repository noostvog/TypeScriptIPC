//// [correct.ts]
interface PrivateMessage {
  text?: string;
  userid?: number;
  screenname?: string;
} constrains {
  present(text);
  or(and(present(userid), not(present(screenname))),
     and(not(present(userid)), present(screenname)));
}

let msg1: PrivateMessage = {text: "Hello", userid: 42};

function getUser(msg: PrivateMessage): number | string {
  if (msg.userid) {
    return msg.userid;
  } else {
    return msg.screenname;
  }
}

getUser(msg1); 
getUser({text: "Hello", screenname: "Alice"});

function changeIdToName(msg: PrivateMessage, name: string): PrivateMessage {
  if (msg.userid) {
    let msg2: PrivateMessage = msg;
    return objupdate(msg2, {userid: undefined, screenname: name});
  }
  return msg;
}

changeIdToName(msg1, "Alice");


//// [correct.js]
var msg1 = { text: "Hello", userid: 42 };
function getUser(msg) {
    if (msg.userid) {
        return msg.userid;
    }
    else {
        return msg.screenname;
    }
}
getUser(msg1);
getUser({ text: "Hello", screenname: "Alice" });
function changeIdToName(msg, name) {
    if (msg.userid) {
        var msg2 = msg;
        return { ...msg2, ...{ userid: undefined, screenname: name }};
    }
    return msg;
}
changeIdToName(msg1, "Alice");
