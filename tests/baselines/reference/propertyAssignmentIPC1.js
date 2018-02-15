//// [propertyAssignmentIPC1.ts]
interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
    absent?: number;
} with {
    present(text);
    or(and(present(userid), not(present(screenname))),
        and(not(present(userid)), present(screenname)));
    not(present(absent));
}


let msg: PrivateMessage = {text: "Hello", userid: 123};
msg.text = "Hi!"; //OK
msg.text = undefined; //NOK
msg.userid = 22; //NOK
msg.userid = undefined; //NOK
msg.absent = undefined; //OK
msg.absent = 55; //NOK



//// [propertyAssignmentIPC1.js]
var msg = { text: "Hello", userid: 123 };
msg.text = "Hi!"; //OK
msg.text = undefined; //NOK
msg.userid = 22; //NOK
msg.userid = undefined; //NOK
msg.absent = undefined; //OK
msg.absent = 55; //NOK
