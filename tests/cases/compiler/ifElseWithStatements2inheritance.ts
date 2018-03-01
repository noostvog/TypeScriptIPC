interface PrivateMessage2 {
    text?: string;
    userid?: number;
} with {
    present(text);

}

interface PrivateMessage extends PrivateMessage2 {
    // inherit properties
    screenname?: string;
} with {
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