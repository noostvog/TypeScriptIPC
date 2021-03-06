//// [propertyAccessIPC1.ts]
interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
    or(and(present(userid), not(present(screenname))),
        and(not(present(userid)), present(screenname)));
}

let msg: PrivateMessage = {text: "Hi!", userid: 42};
msg.text; //OK
msg.userid; //NOT OK: fields that are not always required may only be accessed inside a non-undefined typeguard
msg.screenname; //NOT OK


//// [propertyAccessIPC1.js]
var msg = { text: "Hi!", userid: 42 };
msg.text; //OK
msg.userid; //NOT OK: fields that are not always required may only be accessed inside a non-undefined typeguard
msg.screenname; //NOT OK
