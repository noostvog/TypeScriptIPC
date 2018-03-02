//// [assignmentCompatPredicates14.ts]

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

let pm1: PrivateMessage = {text: "Hi!", userid: 42};
let pm2: {text: number} = pm1;


//// [assignmentCompatPredicates14.js]
var pm1 = { text: "Hi!", userid: 42 };
var pm2 = pm1;
