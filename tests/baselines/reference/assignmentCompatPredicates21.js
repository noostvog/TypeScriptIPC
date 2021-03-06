//// [assignmentCompatPredicates21.ts]

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
present(screenname);
}

let pm1: PrivateMessage = {text: "Hi!", userid: undefined, screenname: "Alice"};
let pm2: {text: string, userid: undefined} = pm1;

//// [assignmentCompatPredicates21.js]
var pm1 = { text: "Hi!", userid: undefined, screenname: "Alice" };
var pm2 = pm1;
