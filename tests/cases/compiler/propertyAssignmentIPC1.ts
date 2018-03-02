// @strictNullChecks: true

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
    absent?: number;
} constrains {
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

