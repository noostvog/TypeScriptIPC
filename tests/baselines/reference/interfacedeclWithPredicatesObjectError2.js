//// [interfacedeclWithPredicatesObjectError2.ts]

interface PrivateMessage{
    userid?: any;
    screenname?: any;
    text: any;
} with {
    or(and(present(userid), not(present(screenname))),
    and(present(screenname), not(present(userid))));
present(text);
}

let object: PrivateMessage = {userid: 25};

//// [interfacedeclWithPredicatesObjectError2.js]
var object = { userid: 25 };
