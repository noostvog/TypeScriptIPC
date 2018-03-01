//// [assignmentCompatPredicates1inheritance.ts]

interface PrivateMessage1 {
    text?: string;
    userid?: number;
    screenname?: string;
} with {
    present(text);
}

interface PrivateMessage extends PrivateMessage1{
    //everything
} with {
    or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}
let pm: PrivateMessage = { text: "Hi!", userid: 42 };
let obj: { text: string, userid: number } = pm;

//// [assignmentCompatPredicates1inheritance.js]
var pm = { text: "Hi!", userid: 42 };
var obj = pm;
