//// [interfacedeclWithPredicatesObject2.ts]

interface PrivateMessage{
    userid?: any;
    screenname?: any;
    text?: any;
} constrains {
    or(and(present(userid), not(present(screenname))),
    and(present(screenname), not(present(userid))));
present(text);
}

let object: PrivateMessage = {screenname: "Alice", text: "text"};

//// [interfacedeclWithPredicatesObject2.js]
var object = { screenname: "Alice", text: "text" };
