// @strictNullChecks: true
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
    pm.text;
} else {
    pm.text; //ERROR
}

if (pm.userid) {
    if(pm.screenname) {
        pm.text; //ERROR
    }
} else {
    if (pm.screenname){
        pm.text;
    } else {
        pm.text; //ERROR
    }
}
