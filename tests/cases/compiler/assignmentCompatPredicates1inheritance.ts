// @strictNullChecks: true

interface PrivateMessage1 {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
}

interface PrivateMessage extends PrivateMessage1{
    //everything
} constrains {
    or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}
let pm: PrivateMessage = { text: "Hi!", userid: 42 };
let obj: { text: string, userid: number } = pm;