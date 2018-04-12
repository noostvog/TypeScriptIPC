//// [ifElseWithStatements6.ts]
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

//// [ifElseWithStatements6.js]
var pm = { text: "Hi!", userid: 42 };
if (pm.userid) {
    var pm_1 = { text: "Hi!", userid: 42 };
    pm_1.userid = 44; //NOK
    pm_1.screenname = "Alice"; //NOK
}
else {
    var pm_2 = { text: "Hi!", userid: 42 };
    pm_2.userid = 44; //NOK
    pm_2.screenname = "Alice"; //NOK
}
pm.userid = 46; //NOK
pm.screenname = "Alice"; //NOK
