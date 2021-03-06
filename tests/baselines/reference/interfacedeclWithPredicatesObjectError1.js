//// [interfacedeclWithPredicatesObjectError1.ts]

interface PrivateMessage{
    userid?: any;
    screenname?: any;
    text?: any;
} constrains {
    or(and(present(userid), not(present(screenname))),
    and(present(screenname), not(present(userid))));
present(text);
}

let object: PrivateMessage = {text: "text"};

//// [interfacedeclWithPredicatesObjectError1.js]
var object = { text: "text" };
