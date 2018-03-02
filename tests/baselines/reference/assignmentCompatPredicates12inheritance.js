//// [assignmentCompatPredicates12inheritance.ts]



interface PrivateMessage2 {
    text?: string;
    userid?: number;
    screenname?: string;
    smthg?: number;
} constrains {
    not(present(smthg));
}
interface PrivateMessage extends PrivateMessage2 {
    //...
} constrains {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}

let pm1: PrivateMessage = {text: "Hi!", userid: 42};
let pm2: PrivateMessage2 = pm1;

//// [assignmentCompatPredicates12inheritance.js]
var pm1 = { text: "Hi!", userid: 42 };
var pm2 = pm1;
