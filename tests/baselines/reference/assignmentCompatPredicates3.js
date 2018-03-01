//// [assignmentCompatPredicates3.ts]

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} with {
    present(text);
    not(present(userid));
    not(present(screenname));
}

let pm: PrivateMessage = { text: "Hi!"};
let obj: { text: string } = pm;

//// [assignmentCompatPredicates3.js]
var pm = { text: "Hi!" };
var obj = pm;
