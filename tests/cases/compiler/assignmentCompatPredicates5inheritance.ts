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
interface PrivateMessage1 {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
present(screenname);
present(userid);
}

interface PrivateMessage2 extends PrivateMessage{
    // inherit properties
} constrains {
    present(userid);
}

let pm1: PrivateMessage1 = {text: "Hi!", screenname: "Alice", userid: 42};
let pm2: PrivateMessage2 = pm1;
let pm3: PrivateMessage = pm2;