//// [ifElseWithStatements3Error.ts]
interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} constrains {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}

let pm: PrivateMessage = {text: "Hi!", userid: 42};

if (pm.text) {
    true;
} else {
    true;
    //ERROR
}

if (pm.userid) {
    if(pm.screenname) {
        true; //ERROR
    }
} else {
    if (pm.screenname){
        true;
    } else {
        true; //ERROR
    }
}


//// [ifElseWithStatements3Error.js]
var pm = { text: "Hi!", userid: 42 };
if (pm.text) {
    true;
}
else {
    true;
}
if (pm.userid) {
    if (pm.screenname) {
        true; //ERROR
    }
}
else {
    if (pm.screenname) {
        true;
    }
    else {
        true; //ERROR
    }
}
