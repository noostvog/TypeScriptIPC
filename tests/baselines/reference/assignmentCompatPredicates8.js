//// [assignmentCompatPredicates8.ts]
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

let obj: {text: "Hi!", userid: 42}
let pm1: PrivateMessage = obj;


//// [assignmentCompatPredicates8.js]
var obj;
var pm1 = obj;
