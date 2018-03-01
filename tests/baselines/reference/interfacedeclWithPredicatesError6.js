//// [interfacedeclWithPredicatesError6.ts]

interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text?: string;
} with {
    type(user_id) == shtring;
}

//// [interfacedeclWithPredicatesError6.js]
