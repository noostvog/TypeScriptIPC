//// [assignmentCompatPredicates18.ts]

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} with {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}

let pm1: PrivateMessage = {text: "Hi!", userid: 42, screenname: undefined};
let pm2: {text: string, userid?: number} = pm1;

//// [assignmentCompatPredicates18.js]
var pm1 = { text: "Hi!", userid: 42, screenname: undefined };
var pm2 = pm1;
