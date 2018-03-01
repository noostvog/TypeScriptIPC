//// [assignmentCompatPredicates16.ts]
interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} with {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}

let pm1: PrivateMessage = {text: "Hi!", userid: undefined, screenname: undefined};


//// [assignmentCompatPredicates16.js]
var pm1 = { text: "Hi!", userid: undefined, screenname: undefined };
