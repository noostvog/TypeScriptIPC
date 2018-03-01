//// [interfacedeclWithPredicatesError2.ts]

interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text?: string;
} with {
    types(test) == string;
}

//// [interfacedeclWithPredicatesError2.js]
