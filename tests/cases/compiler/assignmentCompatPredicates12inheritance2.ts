// @strictNullChecks: true



interface PrivateMessage2 {
    text?: string;
    userid?: number;
    screenname?: string;
    smthg?: number;
} with {
    not(present(smthg));
}
interface PrivateMessage extends PrivateMessage2 {
    //...
} with {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}

let pm1: PrivateMessage = {text: "Hi!", userid: 42};
let pm2: PrivateMessage2 = pm1;