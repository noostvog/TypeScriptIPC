//// [assignmentCompatPredicates1.ts]

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} with {
    present(text);
    or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}

let pm: PrivateMessage = { text: "Hi!", userid: 42 };
let obj: { text: string, userid: number } = pm;

//// [assignmentCompatPredicates1.js]
var pm = { text: "Hi!", userid: 42 };
var obj = pm;
