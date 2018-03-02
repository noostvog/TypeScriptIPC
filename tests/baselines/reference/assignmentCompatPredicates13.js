//// [assignmentCompatPredicates13.ts]

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
    smthg?: number;
} constrains {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
not(present(smthg));
}

let pm1: PrivateMessage = {text: 5, userid: 42};


//// [assignmentCompatPredicates13.js]
var pm1 = { text: 5, userid: 42 };
