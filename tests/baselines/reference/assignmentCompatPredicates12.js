//// [assignmentCompatPredicates12.ts]

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

interface PrivateMessage2 {
    text?: string;
    userid?: number;
    screenname?: string;
    smthg?: number;
}

let pm1: PrivateMessage = {text: "Hi!", userid: 42};
let pm2: PrivateMessage2 = pm1;

//// [assignmentCompatPredicates12.js]
var pm1 = { text: "Hi!", userid: 42 };
var pm2 = pm1;
