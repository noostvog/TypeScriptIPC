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

interface PrivateMessage2 {
    text?: number;
    userid?: number;
    screenname?: string;
    smthg?: number;
}

let pm1: PrivateMessage = {text: "Hi!", userid: 42};
let pm2: PrivateMessage = pm2;