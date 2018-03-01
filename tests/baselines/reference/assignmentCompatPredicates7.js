//// [assignmentCompatPredicates7.ts]

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
    smthg?: number;
} with {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
not(present(smthg));
}

let pm1: PrivateMessage = {text: "Hi!", screenname: "Alice"};


//// [assignmentCompatPredicates7.js]
var pm1 = { text: "Hi!", screenname: "Alice" };
