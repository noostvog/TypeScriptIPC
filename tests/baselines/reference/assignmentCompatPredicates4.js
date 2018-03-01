//// [assignmentCompatPredicates4.ts]

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} with {
    present(text);
    not(present(userid));
    not(present(screenname));
}

let pm: PrivateMessage = { text: "Hi!", userid: 42};
let obj: { text: string, x?: number } = pm;

//// [assignmentCompatPredicates4.js]
var pm = { text: "Hi!", userid: 42 };
var obj = pm;
