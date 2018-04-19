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

let msg1: PrivateMessage = {text: "Hello", userid: 42}; //OK
let msg2: PrivateMessage = {text: "Hello"}; //ERROR
let msg3: PrivateMessage = {text: "Hello", userid: 42, screenname: "Alice"}; //ERROR
