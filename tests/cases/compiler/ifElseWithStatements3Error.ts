interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: string;
} with {
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
