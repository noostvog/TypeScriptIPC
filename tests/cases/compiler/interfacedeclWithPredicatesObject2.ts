// @strictNullChecks: true

interface PrivateMessage{
    userid?: any;
    screenname?: any;
    text?: any;
} with {
    or(and(present(userid), not(present(screenname))),
    and(present(screenname), not(present(userid))));
present(text);
}

let object: PrivateMessage = {screenname: "Alice", text: "text"};