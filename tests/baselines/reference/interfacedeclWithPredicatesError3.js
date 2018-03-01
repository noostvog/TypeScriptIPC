//// [interfacedeclWithPredicatesError3.ts]

interface UsersShow{
    user_id?: number;
    screen_name?: string;
    text?: string;
} with {
    type(5) == string;
}

//// [interfacedeclWithPredicatesError3.js]
