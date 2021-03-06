// @strictNullChecks: true

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

let obj1: {text: "Hi!", userid: 42}
let pm1: PrivateMessage = obj1;
let obj2: {text: string, userid: number} = pm1;
