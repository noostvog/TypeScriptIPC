//@strictNullChecks: true

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: number;
} with {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}


let a: PrivateMessage = {text: "Hi!", userid: 5};

let b = objupdate(a, {text: "Hello"}); //OK
let c = objupdate(a, {userid: 5}); //NOK
let d = objupdate(a, {userid: 5, screenname: undefined}); //OK
let e = objupdate(a, {userid: 5, screenname: 6}); //NOK