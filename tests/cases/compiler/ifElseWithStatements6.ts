// @strictNullChecks: true
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
    let pm: PrivateMessage = {text: "Hi!", userid: 42};
    pm.userid = 44; //NOK
    pm.screenname = "Alice"; //NOK
} else {
    let pm: PrivateMessage = {text: "Hi!", userid: 42};
    pm.userid = 44; //NOK
    pm.screenname = "Alice"; //NOK
}

pm.userid = 46; //NOK
pm.screenname = "Alice"; //NOK