// @strictNullChecks: true

interface PrivateMessage{
    userid?: any;
    screenname?: any;
    text?: any;
} constrains {
    or(and(present(userid), not(present(screenname))),
    and(present(screenname), not(present(userid))));
present(text);
}

let object: PrivateMessage = {userid: 25, text: "text", screenname: "Alice"};