//// [assignmentCompatPredicates6.ts]

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
interface PrivateMessage1 {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
present(screenname);
present(userid);
}

interface PrivateMessage2 {
    text?: string;
    userid?: number;
} constrains {
    present(text);
present(userid);
}

let pm1: PrivateMessage1 = {text: "Hi!", screenname: "Alice", userid: 42};
let pm2: PrivateMessage2 = pm1;
let pm3: PrivateMessage = pm2;

//// [assignmentCompatPredicates6.js]
var pm1 = { text: "Hi!", screenname: "Alice", userid: 42 };
var pm2 = pm1;
var pm3 = pm2;
