interface PrivateMessage {
    text?: number;
    userid?: number;
    screenname?: string;
    smthg?: number;
} with {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
not(present(smthg));
}

let obj: {text: "Hi!", userid: 42}
let pm1: PrivateMessage1 = obj;
