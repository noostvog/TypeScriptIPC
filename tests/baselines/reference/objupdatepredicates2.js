//// [objupdatepredicates2.ts]

interface PrivateMessage {
    text?: string;
    userid?: number;
    screenname?: number;
} constrains {
    present(text);
or(and(present(userid), not(present(screenname))),
    and(not(present(userid)), present(screenname)));
}


let a: PrivateMessage = {text: "Hi!", userid: 5};

if (a.userid) {
    let b = objupdate(a, {text: "Hello"}); //OK
    let c = objupdate(a, {userid: 5}); //NOK
    let d = objupdate(a, {userid: 5, screenname: undefined}); //OK
    let e = objupdate(a, {userid: 5, screenname: 6}); //NOK
}


//// [objupdatepredicates2.js]
var a = { text: "Hi!", userid: 5 };
if (a.userid) {
    var b = { ...a, ...{ text: "Hello" }}; //OK
    var c = { ...a, ...{ userid: 5 }}; //NOK
    var d = { ...a, ...{ userid: 5, screenname: undefined }}; //OK
    var e = { ...a, ...{ userid: 5, screenname: 6 }}; //NOK
}
