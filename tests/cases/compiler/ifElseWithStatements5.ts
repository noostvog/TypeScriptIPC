interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}

let pm: PrivateMessage = {text: "Hi!", userid: 42};

if (pm.text) {
    if (pm.userid) {
        pm.text = "Text"; //OK
        pm.userid = 43; //OK
        pm.screenname = "Alice"; //NOK
    } else {
        pm.text = "Text"; //OK
        pm.userid = 44; //NOK
        pm.screenname = "Alice"; //OK
    }
} else {
    pm.text = "Text:"; //NOK
}

pm.text = "Tekst"; //NOK
pm.userid = 46; //NOK
pm.screenname = "Alice"; //NOK