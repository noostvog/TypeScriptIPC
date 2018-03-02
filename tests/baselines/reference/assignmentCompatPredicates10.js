//// [assignmentCompatPredicates10.ts]

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

let obj2: {text: string} = pm1;


//// [assignmentCompatPredicates10.js]
var pm1 = { text: "Hi!", userid: 42 };
var obj2 = pm1;
