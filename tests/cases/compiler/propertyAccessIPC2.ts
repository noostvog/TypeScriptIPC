interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
    or(and(present(userid), not(present(screenname))),
        and(not(present(userid)), present(screenname)));
}


let msg: PrivateMessage = {text: "Hello", userid: 123};
msg.text; //OK

