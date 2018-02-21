interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
    smthg?: number;
} with {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
not(present(smthg));
}
interface PrivateMessage1 {
    text?: string;
    userid?: number;
    screenname?: string;
} with {
    present(text);
present(screenname);
present(userid);
}

interface PrivateMessage2 {
    text?: string;
    userid?: number;
} with {
    present(text);
present(userid);
}

let pm1: PrivateMessage1 = {text: "Hi!", screenname: "Alice", userid: 42};
let pm2: PrivateMessage2 = pm1;
let pm3: PrivateMessage = pm2;