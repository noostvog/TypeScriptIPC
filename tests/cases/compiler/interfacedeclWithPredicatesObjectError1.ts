interface PrivateMessage{
    userid?: any;
    screenname?: any;
    text: any;
} with {
    or(and(present(userid), not(present(screenname))),
    and(present(screenname), not(present(userid))));
present(text);
}

let object: PrivateMessage = {text: "text"};