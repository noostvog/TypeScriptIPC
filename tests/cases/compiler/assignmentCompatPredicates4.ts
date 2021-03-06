// @strictNullChecks: true

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
    not(present(userid));
    not(present(screenname));
}

let pm: PrivateMessage = { text: "Hi!", userid: 42};
let obj: { text: string, x?: number } = pm;