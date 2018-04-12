interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}

let pm: PrivateMessage = {text: "Hi!", userid: 42};

if (pm.userid) {
    pm.userid = 44; //OK
    pm.screenname = "Alice"; //NOK
    if (pm.screenname) {
        pm.userid = 47; //NOK
        pm.screenname = "Alice"; //NOK
    } else {
        pm.userid = 48; //OK
        pm.screenname = "Alice"; //NOK
    }
}

pm.userid = 46; //NOK
pm.screenname = "Alice"; //NOK