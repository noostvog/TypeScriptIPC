//// [definitions.ts]
interface PrivateMessage {
  text?: string;
  userid?: number;
  screenname?: string;
} constrains {
  present(text);
  or(and(present(userid), not(present(screenname))),
     and(not(present(userid)), present(screenname)));
}


//// [definitions.js]
