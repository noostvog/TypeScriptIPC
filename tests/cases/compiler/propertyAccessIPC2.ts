interface PrivateMessage {
    text?: any;
    user_id?: any;
    screen_name?: any;
} with {
    type(user_id) == number;
    type(text) == string;
    type(screen_name) == string;
    present(text);
    or(and(present(user_id), not(present(screen_name))),
        and(not(present(user_id)), present(screen_name)));
}

let msg: PrivateMessage = {text: "Hello", user_id: 123};
msg.text; //OK

