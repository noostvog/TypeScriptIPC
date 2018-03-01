// @strictNullChecks: true

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} with {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
present(screenname);
}

let pm1: PrivateMessage = {text: "Hi!", userid: 42, screenname: undefined};
let pm2: {text: string, userid: undefined} = pm1;