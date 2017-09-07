//// [interfacedeclWithPredicatesObjectError2.ts]
interface UsersShow{
    user_id?: any;
    screen_name?: any;
    text: any;
} with {
    or(and(present(user_id), not(present(screen_name))),
    and(present(screen_name), not(present(user_id))));
    type(user_id) == number;
    type(screen_name) == string;
    type(text) == string;
    present(text);
}

let object: UsersShow = {user_id: 25}

//// [interfacedeclWithPredicatesObjectError2.js]
var object = { user_id: 25 };
