interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} with {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}

let pm: PrivateMessage = {text: "Hi!", userid: 42};

pm.userid = 43; // NOK
pm.screenname = "Alice"; //NOK

if (pm.userid) {
    pm.userid = 44; //OK
    pm.screenname = "Alice"; //NOK
} else {
    pm.userid = 45; //NOK
    pm.screenname = "Alice"; //OK
}

pm.userid = 46; //NOK
pm.screenname = "Alice"; //NOK